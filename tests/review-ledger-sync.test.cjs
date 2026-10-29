const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {syncWeeklyReview}=loadModel('review-ledger-sync');
const m=loadModel('finance-review-model');
const months=()=>[{id:'2026-10',salary:13000,otherIncome:0,budgets:[{id:'food',name:'Food',group:'daily',actual:20,plan:0,required:false,fixed:false}]}];
const record=()=>m.parseFinanceReview({...m.newReviewDraft('week','2026-10-29'),income:0,amounts:{rent:0,parents:0,learning:0,travel:0,partner:0,small:0,daily:100,investment:2750,emergency:500},balances:{cash:0,investments:0,otherAssets:0,debt:0}});
const entries=[{id:'e',date:'2026-10-28',flow:'expense',categoryId:'food',amount:20,note:''}];
test('weekly saving posts only residual consumption, is idempotent and does not mutate source',()=>{
 const input=months(),before=structuredClone(input),r=record();
 const first=syncWeeklyReview(input,entries,r);
 assert.equal(first[0].budgets.reduce((s,b)=>s+b.actual,0),100);
 assert.equal(first[0].budgets[1].actual,80);
 assert.deepEqual(syncWeeklyReview(first,entries,r),first);
 assert.deepEqual(input,before);
 const changed=syncWeeklyReview(first,entries,{...r,amounts:{...r.amounts,daily:40}});
 assert.equal(changed[0].budgets.reduce((s,b)=>s+b.actual,0),40);
 assert.equal(changed[0].budgets.some(b=>b.group==='investment'),false);
});
test('cross-month undated expense and unknown income cannot be assigned fictitious dates',()=>{
 const r=record();assert.throws(()=>syncWeeklyReview(months(),entries,{...r,income:10}),/收入合计/);
 const cross={...r,start:'2026-10-26',end:'2026-11-01'};
 assert.throws(()=>syncWeeklyReview(months(),entries,cross),/跨自然月/);
 assert.throws(()=>syncWeeklyReview(months(),entries,{...r,type:'month'}),/仅周复盘/);
});
test('dated conversion removes the prior weekly residual without adding twice',()=>{
 const first=syncWeeklyReview(months(),entries,record());
 const next=syncWeeklyReview(first,[{...entries[0],amount:100}],record());
 assert.equal(next[0].budgets.filter(b=>b.reviewPeriod).length,0);
});
