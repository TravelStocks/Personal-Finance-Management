const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const g=loadModel('goal-sync-model'),m=loadModel('finance-review-model'),d=loadModel('review-dashboard-sync'),x=loadModel('review-module-sync');
const goals=()=>[{id:'travel',name:'旅游基金',current:999},{id:'learn',name:'学习成长',current:999},{id:'reserve',name:'应急储备',current:999},{id:'parents',name:'父母储蓄',current:500},{id:'partner',name:'伴侣基金',current:80}];
const accounts=()=>[{id:'t',name:'Trip',type:'bank',purpose:'旅游基金',balance:0},{id:'l',name:'Learn',type:'bank',purpose:'学习基金',balance:30.12},{id:'e',name:'Emergency',type:'bank',purpose:'应急基金',balance:2000},{id:'i',name:'Broker',type:'bank',purpose:'美股投资',balance:3000}];
function state(){return {accounts:accounts(),goals:goals(),holdings:[],fxUsd:7,fxHkd:1,balanceAssets:[],liabilities:[],reminders:[],fundBuckets:[],financeReviews:[],datedEntries:[],monthlyRecords:[{id:'2026-10',salary:0,stockIncome:0,otherIncome:0,budgets:[]}]};}
function draft(s,end='2026-10-29',parents=200){return {...m.withReviewAccounts(m.newReviewDraft('week',end),s.accounts),income:0,amounts:Object.fromEntries(m.reviewCategories.map(row=>[row.id,row.id==='parents'?parents:0])),goals:s.goals.map(({id,name,current})=>({id,name,current})),investments:{holdings:[],fxUsd:7,fxHkd:1},focus:{...m.newReviewFocus({projects:[],bills:[],assets:[],debts:[],holdings:0}),checks:{projects:true,bills:true,balance:true}},balances:{cash:5030.12,investments:0,otherAssets:0,debt:0}};}
const commit=(s,r,scope)=>x.commitReviewModule(s,r,scope,x.reviewModuleSignature(s,scope),'2026-10-29T03:00:00Z','2026-10-29').data;

test('linked goals use owned account balances including zero and cents; partner stays manual',()=>{
  const input=goals(),a=accounts();a.push({...a[1],id:'l2',balance:20.03});a.push({...a[1],id:'other',balance:500,includedInPersonal:false});
  const synced=g.syncAccountGoals(input,a);
  assert.equal(synced[0].current,0);assert.equal(synced[1].current,50.15);assert.equal(synced[2].current,2000);
  assert.equal(synced[3].current,500);assert.equal(synced[4].current,80);assert.equal(input[0].current,999);
  const duplicate=[...input,{id:'travel2',name:'旅行计划二',current:123}];
  assert.equal(g.syncAccountGoals(duplicate,a).at(-1).current,123);
  assert.equal(g.syncAccountGoals(input,[])[0].current,999);
});

test('support accumulates by stable week ID; revisions replace only the difference and refunds are netted',()=>{
  const first=g.addParentSupport(goals(),'week:2026-10-19',200);
  assert.equal(first[3].current,700);
  assert.equal(g.addParentSupport(first,'week:2026-10-19',200)[3].current,700);
  const revised=g.addParentSupport(first,'week:2026-10-19',150);
  assert.equal(revised[3].current,650);
  const second=g.addParentSupport(revised,'week:2026-10-26',100);
  assert.equal(second[3].current,750);
  assert.equal(g.addParentSupport(second,'week:2026-10-26',-50)[3].current,600);
  assert.deepEqual(g.parseParentReviewAmounts(JSON.parse(JSON.stringify(second[3].parentReviewAmounts))),second[3].parentReviewAmounts);
  assert.throws(()=>g.parseParentReviewAmounts({'week:2026-10-19':'bad'}),/无效/);
});

test('saving accounts syncs goals; goal saves ignore stale automatic balances but accept partner input',()=>{
  let s=state(),r=draft(s);r.accounts[2].balance=2100;
  s=commit(s,r,'accounts');assert.equal(s.goals[2].current,2100);
  r=draft(s);r.goals[0].current=777;r.goals[3].current=0;r.goals[4].current=250;
  s=commit(s,r,'goals');assert.equal(s.goals[0].current,0);assert.equal(s.goals[3].current,500);assert.equal(s.goals[4].current,250);
});

test('spending then full save books parents once and report goals match current state',()=>{
  const original=state();let s=commit(original,draft(original),'spending');
  assert.equal(s.goals[3].current,700);
  const r=m.parseFinanceReview(draft(s));r.goals[3].current=0;r.goals[2].current=999;
  const next=d.commitReviewUpdate(s,[r],{record:r,publish:true,sourceSignature:d.dashboardSourceSignature(s)},'2026-10-29T04:00:00Z','2026-10-29');
  assert.equal(next.goals[3].current,700);assert.equal(next.financeReviews[0].goals[3].current,700);
  assert.equal(next.financeReviews[0].goals[2].current,2000);
  assert.equal(original.goals[3].current,500);
  const restored=JSON.parse(JSON.stringify(next));
  s=commit(restored,draft(restored,'2026-10-29',250),'spending');
  assert.equal(s.goals[3].current,750);
  assert.equal(s.reviewUpdates[0].before.goals[3].current,500);
  assert.equal(d.dashboardSnapshotTotals(s).cash,5030.12);
  assert.equal(d.dashboardSnapshotTotals(s).netWorth,5030.12);
});
