const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const m=loadModel('finance-review-model');
const d=loadModel('review-dashboard-sync');
const save=loadModel('finance-save-model');
function state(){return {
  monthlyRecords:[{id:'2026-10',salary:0,otherIncome:0,stockIncome:0,budgets:[]}],datedEntries:[],financeReviews:[],
  accounts:[{id:'a',name:'Bank',type:'bank',purpose:'daily',balance:1000,liquid:true},{id:'b',name:'Shared',type:'bank',purpose:'other',balance:600,liquid:false}],
  holdings:[{id:'i1',name:'Broker One',market:'A股',currency:'CNY',cost:100,value:120},{id:'i2',name:'Broker Two',market:'A股',currency:'CNY',cost:200,value:250},{id:'i3',name:'US',market:'美股',currency:'USD',cost:10,value:20}],fxUsd:7.25,fxHkd:0.93,
  balanceAssets:[{id:'asset',name:'Asset',amount:100,note:'keep'}],liabilities:[{id:'debt',name:'Debt',amount:300}],
  reminders:[{id:'bill',name:'Bill',amount:50,date:'2026-10-30',kind:'subscription'}],
  fundBuckets:[{id:'project',name:'Trip',target:1000,current:100,dueDate:'2026-12-01',kind:'旅行',locked:true,fundingAccountId:'a'}],
  goals:[{id:'goal',name:'Goal',current:100,monthly:500,target:3000}],annualBudgetPlan:{salary:13000},emergencyMonthlyNeed:4750,
};}
function record(s=state(),end='2026-10-28'){
  const investments={holdings:s.holdings.map((row,index)=>({...row,value:row.value+10*(index+1)})),fxUsd:7,fxHkd:0.9};
  const accounts=s.accounts.map(row=>({...row,balance:row.id==='a'?800:600,included:row.id==='a',note:''}));
  const focus={...m.newReviewFocus({projects:s.fundBuckets,bills:s.reminders,assets:s.balanceAssets,debts:s.liabilities,holdings:m.reviewInvestmentTotal(investments)}),checks:{projects:true,bills:true,balance:true}};
  focus.debts=focus.debts.map(row=>({...row,amount:0}));focus.bills=focus.bills.map(row=>({...row,amount:75}));focus.projects=focus.projects.map(row=>({...row,current:200}));
  return m.parseFinanceReview({...m.newReviewDraft('week',end),income:0,amounts:{rent:0,parents:0,learning:0,travel:0,partner:0,small:0,daily:100,investment:2750,emergency:500},notes:{},accounts,investments,focus,goals:[{id:'goal',name:'Goal',current:150}],balances:{cash:800,investments:m.reviewInvestmentTotal(investments),otherAssets:100,debt:0},savedAt:'2026-10-29T01:00:00Z'});
}
const commit=(s,r,publish=true)=>d.commitReviewUpdate(s,m.upsertFinanceReview(s.financeReviews??[],r),{record:r,publish,sourceSignature:d.dashboardSourceSignature(s)},'2026-10-29T01:00:00Z','2026-10-29');

test('latest completed week updates every actual module, preserves plans, and keeps before/after snapshots',()=>{
  const s=state(),before=structuredClone(s),r=record(s),next=commit(s,r);
  assert.deepEqual(s,before);
  assert.equal(next.dashboardAsOf,'2026-10-28'); // Yesterday is allowed.
  assert.equal(next.accounts[0].balance,800);assert.equal(next.accounts[0].liquid,true);assert.equal(next.accounts[1].includedInPersonal,false);
  assert.equal(next.holdings[0].value,130);assert.equal(next.holdings[1].value,270);assert.equal(next.fxUsd,7);
  assert.equal(next.liabilities[0].amount,0);assert.equal(next.reminders[0].amount,75);assert.equal(next.fundBuckets[0].current,200);
  assert.equal(next.fundBuckets[0].fundingAccountId,'a');assert.equal(next.goals[0].current,150);assert.equal(next.goals[0].monthly,500);
  assert.deepEqual(next.annualBudgetPlan,s.annualBudgetPlan);assert.equal(next.emergencyMonthlyNeed,4750);
  assert.equal(next.monthlyRecords[0].budgets.reduce((sum,row)=>sum+row.actual,0),100);
  assert.deepEqual(next.reviewUpdates[0].before,before);
  assert.equal(next.reviewUpdates[0].after.accounts[0].balance,800);
  assert.equal('reviewUpdates' in next.reviewUpdates[0].after,false);
  assert.equal(d.dashboardSnapshotTotals(next).netWorth,m.reviewTotals(r).netWorth);
});
test('same-week revision replaces amounts, retains the original report and does not double deduct balances',()=>{
  const s=state(),r=record(s),first=commit(s,r),updated={...r,amounts:{...r.amounts,daily:200}};
  const second=commit(first,updated);
  assert.equal(second.monthlyRecords[0].budgets.reduce((sum,row)=>sum+row.actual,0),200);
  assert.equal(second.accounts[0].balance,800);assert.equal(second.financeReviews.length,1);assert.equal(second.reviewUpdates.length,2);
  assert.equal(second.reviewUpdates[1].before.financeReviews[0].amounts.daily,100);
  assert.equal(second.reviewUpdates[0].after.financeReviews[0].amounts.daily,100);
});
test('historical edits and imports retain history without rolling back newer dashboard data',()=>{
  const current=commit(state(),record()),old=record(state(),'2026-10-18');
  assert.throws(()=>commit(current,old),/较早/);
  const history=commit(current,old,false);
  assert.deepEqual(history.accounts,current.accounts);assert.deepEqual(history.monthlyRecords,current.monthlyRecords);assert.equal(history.dashboardAsOf,current.dashboardAsOf);
  assert.equal(history.financeReviews.length,2);assert.equal(history.reviewUpdates.length,2);
  const imported=d.commitReviewUpdate(history,[],{publish:false});
  assert.equal(imported.reviewUpdates.length,3);assert.equal(imported.reviewUpdates[2].before.financeReviews.length,2);
});
test('partial, stale, inconsistent or undated cross-month updates fail before any mutation',()=>{
  const s=state(),r=record(s),before=structuredClone(s);
  assert.throws(()=>commit(s,{...r,investments:undefined}),/补齐/);
  assert.throws(()=>commit(s,{...r,accounts:[],balances:{...r.balances,cash:0}}),/清单/);
  assert.throws(()=>commit(s,{...r,focus:{...r.focus,checks:{...r.focus.checks,bills:false}}}),/核对/);
  assert.throws(()=>commit(s,{...r,balances:{...r.balances,debt:10}}),/不一致/);
  assert.throws(()=>d.commitReviewUpdate(s,[r],{record:r,publish:true,sourceSignature:'stale'},undefined,'2026-10-29'),/已变化/);
  const cross=record(s,'2026-11-01');
  assert.throws(()=>d.commitReviewUpdate(s,[cross],{record:cross,publish:true,sourceSignature:d.dashboardSourceSignature(s)},undefined,'2026-11-02'),/跨自然月/);
  assert.deepEqual(s,before);
});
test('investment snapshots validate IDs, zero values and conversion; report and comparisons remain per-account',()=>{
  const s=state(),r=record(s),prior=record(s,'2026-10-18');
  prior.investments.holdings[0].value=120;prior.balances.investments=m.reviewInvestmentTotal(prior.investments);
  const compare=m.compareReviewInvestments(r,prior);
  assert.equal(compare[0].delta,10);assert.equal(compare[1].delta,0);assert.equal(compare[2].current,350);
  assert.match(m.financeReviewReport(r,[prior]),/Broker One/);
  assert.throws(()=>m.parseFinanceReview({...r,investments:{...r.investments,holdings:[r.investments.holdings[0],r.investments.holdings[0]]}}),/不重复/);
  assert.throws(()=>m.parseFinanceReview({...r,investments:{...r.investments,fxUsd:0}}),/汇率/);
  assert.throws(()=>m.parseFinanceReview({...r,balances:{...r.balances,investments:1}}),/折人民币/);
  const zero={...r,investments:{...r.investments,holdings:r.investments.holdings.map(row=>({...row,value:0}))},balances:{...r.balances,investments:0}};
  assert.equal(m.parseFinanceReview(zero).balances.investments,0);
});
test('complete history survives one storage payload and quota/conflict failures cannot overwrite the previous data',()=>{
  const s=state(),next=commit(s,record(s));let raw=JSON.stringify(s);
  const store={getItem:()=>raw,setItem:(_key,value)=>{raw=value;}};
  save.writeLocalFinanceData(store,'test',next,false,undefined,JSON.stringify(s));
  const restored=save.financeDataOnly(JSON.parse(raw));assert.deepEqual(restored.reviewUpdates,next.reviewUpdates);
  const before=raw;assert.throws(()=>save.writeLocalFinanceData({...store,setItem:()=>{throw new Error('Quota');}},'test',s),/Quota/);assert.equal(raw,before);
  assert.throws(()=>save.writeLocalFinanceData(store,'test',s,false,undefined,'stale'),/其他页面/);assert.equal(raw,before);
  assert.deepEqual(d.parseReviewUpdates(restored.reviewUpdates),next.reviewUpdates);
  assert.throws(()=>d.parseReviewUpdates([{...next.reviewUpdates[0],before:{}}]),/快照不完整/);
});
test('automatic update history is not trimmed to the manual twenty-snapshot limit',()=>{
  let s=state();const r=record(s);
  for(let i=0;i<22;i++) s=commit(s,{...r,amounts:{...r.amounts,daily:i}});
  assert.equal(s.reviewUpdates.length,22);assert.equal(s.reviewUpdates[0].before.accounts[0].balance,1000);
  assert.equal(s.reviewUpdates[0].after.financeReviews[0].amounts.daily,0);
  assert.equal(s.reviewUpdates[21].after.financeReviews[0].amounts.daily,21);
  assert.equal(s.reviewUpdates.some(update=>'reviewUpdates' in update.before || 'reviewUpdates' in update.after),false);
});
