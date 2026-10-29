const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const d=loadModel('review-dashboard-sync');
const x=loadModel('review-module-sync');
function state(){return {accounts:[{id:'a',name:'Bank',type:'bank',purpose:'daily',balance:100,liquid:true}],
  holdings:[{id:'h',name:'Broker',market:'A股',currency:'CNY',cost:100,value:150}],fxUsd:7,fxHkd:1,
  fundBuckets:[{id:'p',name:'Project',target:500,current:100,dueDate:'2026-11-01',fundingAccountId:'a'}],
  reminders:[{id:'r',name:'Bill',date:'2026-11-01',amount:100,kind:'bill'}],
  balanceAssets:[{id:'asset',name:'Asset',amount:200}],liabilities:[{id:'debt',name:'Debt',amount:300}],
  goals:[{id:'g',name:'Goal',current:50,monthly:100}],monthlyRecords:[{id:'2026-10',salary:0,otherIncome:0,stockIncome:0,budgets:[]}],datedEntries:[],financeReviews:[]};}
function draft(s=state()) {return {...m.withReviewAccounts(m.newReviewDraft('week','2026-10-29'),s.accounts),
  investments:{holdings:structuredClone(s.holdings),fxUsd:s.fxUsd,fxHkd:s.fxHkd},goals:structuredClone(s.goals),
  focus:m.newReviewFocus({projects:s.fundBuckets,bills:s.reminders,assets:s.balanceAssets,debts:s.liabilities,holdings:150})};}
const commit=(s,r,module)=>x.commitReviewModule(s,r,module,x.reviewModuleSignature(s,module),'2026-10-29T02:00:00Z','2026-10-29');

test('each module updates only its own fields, ignoring unrelated missing or invalid input',()=>{
  for(const module of ['accounts','investments','projects','bills','balance','goals']) {
    const s=state(),r=draft(s),before=structuredClone(s);
    r.accounts[0].balance=500;r.investments.holdings[0].value=700;r.goals[0].current=400;
    r.focus.projects[0].current=300;r.focus.bills[0].amount=120;r.focus.assets[0].amount=250;r.focus.debts[0].amount=0;
    r.income=null;r.amounts.daily=null;
    const {data,patch}=commit(s,r,module);
    const changed={accounts:['accounts'],investments:['holdings','fxUsd','fxHkd'],projects:['fundBuckets'],bills:['reminders'],balance:['balanceAssets','liabilities'],goals:['goals']}[module];
    for(const key of Object.keys(s).filter(key=>!changed.includes(key)))assert.deepEqual(data[key],s[key],`${module} changed ${key}`);
    assert.equal(data.financeReviews.length,0);
    assert.equal(data.reviewUpdates.length,1);assert.equal(data.reviewUpdates[0].module,module);
    assert.deepEqual(data.reviewUpdates[0].before,before);assert.deepEqual(s,before);
    assert.deepEqual(data.reviewUpdates[0].moduleDraft,patch);
    assert.deepEqual(d.parseReviewUpdates(JSON.parse(JSON.stringify(data.reviewUpdates))),data.reviewUpdates);
  }
});

test('partial account data survives reload and other saved modules do not overwrite an unsaved draft',()=>{
  let s=state(),r=draft(s);r.accounts[0].balance=500;r.accounts[0].note='checked';
  const first=commit(s,r,'accounts');s=first.data;
  r=x.mergeReviewModule(r,first.patch);r.amounts.daily=123;
  const second=commit(s,r,'goals');s=second.data;
  assert.equal(x.mergeReviewModule(r,second.patch).amounts.daily,123);
  const signatures=Object.fromEntries(Object.keys(x.reviewModuleLabels).map(key=>[key,x.reviewModuleSignature(s,key)]));
  const restored=x.restoreReviewModules(draft(s),s.reviewUpdates,signatures);
  assert.equal(restored.accounts[0].balance,500);assert.equal(restored.accounts[0].note,'checked');
  assert.equal(restored.balances.cash,500);assert.equal(restored.amounts.daily,null);
  s.accounts[0].balance=600;signatures.accounts=x.reviewModuleSignature(s,'accounts');
  assert.equal(x.restoreReviewModules(draft(s),s.reviewUpdates,signatures).accounts[0].balance,600);
});

test('spending can save before income is completed; repeated module and total saves do not double count',()=>{
  let s=state(),r=draft(s);r.amounts=Object.fromEntries(m.reviewCategories.map(row=>[row.id,row.id==='daily'?50:0]));
  s=commit(s,r,'spending').data;
  s=commit(s,r,'spending').data;
  assert.equal(s.monthlyRecords[0].budgets.reduce((sum,row)=>sum+row.actual,0),50);
  r={...r,income:0,balances:{cash:100,investments:150,otherAssets:200,debt:300},focus:{...r.focus,checks:{projects:true,bills:true,balance:true}}};
  const record=m.parseFinanceReview(r);
  const full=d.commitReviewUpdate(s,[record],{record,publish:true,sourceSignature:d.dashboardSourceSignature(s)},'2026-10-29T03:00:00Z','2026-10-29');
  assert.equal(full.monthlyRecords[0].budgets.reduce((sum,row)=>sum+row.actual,0),50);
  assert.equal(full.reviewUpdates.length,3);assert.equal(full.financeReviews.length,1);
});

test('income requires real dated entries and cannot invent an amount or duplicate ledger income',()=>{
  const s=state(),r=draft(s);r.income=1000;
  assert.throws(()=>commit(s,r,'income'),/到账明细/);
  s.datedEntries=[{id:'i',date:'2026-10-29',flow:'income',categoryId:'salary',amount:1000,note:''}];s.monthlyRecords[0].salary=1000;
  const once=commit(s,r,'income').data,twice=commit(once,r,'income').data;
  assert.deepEqual(twice.monthlyRecords,s.monthlyRecords);assert.deepEqual(twice.datedEntries,s.datedEntries);
});

test('invalid, stale, older, and future module updates fail without mutating state',()=>{
  const s=state(),r=draft(s),before=structuredClone(s);
  r.accounts[0].balance=null;assert.throws(()=>commit(s,r,'accounts'),/期末余额/);
  r.accounts[0].balance=0;
  assert.throws(()=>x.commitReviewModule(s,r,'accounts','stale',undefined,'2026-10-29'),/其他位置/);
  const saved=commit(s,r,'accounts').data;
  const old={...r,...m.reviewPeriod('week','2026-10-25')};
  assert.throws(()=>commit(saved,old,'accounts'),/最新周/);
  const future={...r,...m.reviewPeriod('week','2026-11-01')};
  assert.throws(()=>commit(saved,future,'accounts'),/最新周/);
  assert.deepEqual(s,before);
  const invalid=structuredClone(saved.reviewUpdates);invalid[0].moduleDraft.accounts[0].balance=-1;
  assert.throws(()=>d.parseReviewUpdates(invalid),/期末余额/);
});
