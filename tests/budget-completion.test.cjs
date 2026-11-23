const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {budgetCompletion}=loadModel('budget-completion-model');
const {initialAnnualBudgetPlan:plan}=loadModel('annual-budget-model');
const review=(start,end,investment,emergency,savedAt='2026-11-20')=>({type:'week',start,end,savedAt,amounts:{investment,emergency},notes:{}});
test('budget completion uses actual category spending, never the planned amount',()=>{
 const rows=[{group:'rent',actual:1},{group:'daily',actual:0},{group:'travel',actual:100},{group:'travel',actual:-100},{group:'small',actual:-10},{group:'unassigned',actual:500}];
 const result=budgetCompletion(plan,rows,'2026-11');
 assert.equal(result.rent.completed,true);
 for(const key of ['daily','travel','small','investment','emergency','learning'])assert.equal(result[key].completed,false);
 assert.equal(result.travel.actual,0);
});
test('actual transfers use only selected month and latest weekly revisions',()=>{
 const records=[review('2026-11-02','2026-11-08',2750,500,'2026-11-08'),review('2026-11-02','2026-11-08',0,500,'2026-11-09'),review('2026-10-05','2026-10-11',9999,9999),review('2026-10-26','2026-11-01',999,999)];
 const result=budgetCompletion(plan,[],'2026-11',records);
 assert.equal(result.investment.completed,false);assert.equal(result.emergency.actual,500);
 const updates=[{published:true,module:'spending',reviewId:'week:2026-11-02',asOf:'2026-11-08',savedAt:'2026-11-21',moduleDraft:{amounts:{investment:100,emergency:0}},after:{monthlyRecords:[],datedEntries:[]}}];
 const revised=budgetCompletion(plan,[],'2026-11',records,updates);
 assert.equal(revised.investment.completed,true);assert.equal(revised.emergency.completed,false);
 assert.equal(budgetCompletion(plan,[],'2026-12',records,updates).investment.completed,false);
});
