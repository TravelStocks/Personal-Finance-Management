const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {financeChartData,waterfallSteps,financeHealth}=loadModel('finance-chart-model');
const {initialAnnualBudgetPlan,calculateAnnualBudgetPlan}=loadModel('annual-budget-model');
const row=(group,actual)=>({id:group,name:group,group,actual,plan:0,required:false,fixed:false});
const budgets=[row('rent',2750),row('parents',2000),row('learning',1000),row('travel',1000),row('partner',1000)];
const sum=rows=>Math.round(rows.reduce((total,row)=>total+row.value,0)*100)/100;

test('monthly charts reconcile screenshot consumption plus each reserve exactly once',()=>{
  const result=financeChartData(13000,budgets,initialAnnualBudgetPlan);
  assert.equal(sum(result.monthly),11000);
  assert.equal(result.usage.surplus,2000);
  assert.equal(result.monthly.length,9);
  for(const id of ['small','daily']) assert.equal(result.monthly.find(row=>row.id===id).value,0);
  assert.equal(result.monthly.find(row=>row.id==='investment').value,2750);
  assert.equal(result.monthly.find(row=>row.id==='emergency').value,500);
  assert.equal(waterfallSteps(result.waterfall).at(-1).after,2000);
});
test('annual slices match allocation total and never include speculative income or surplus',()=>{
  const plan=structuredClone(initialAnnualBudgetPlan);
  const before=financeChartData(13000,budgets,plan).annual;
  assert.equal(sum(before),155100);
  plan.salary=18000; plan.allowanceUsd=999; plan.bonusAfterTax=60000;
  assert.deepEqual(financeChartData(13000,budgets,plan).annual,before);
  plan.rows.find(row=>row.id==='daily').normal=1250;
  const after=financeChartData(13000,budgets,plan);
  assert.equal(sum(after.annual),157350);
  assert.equal(sum(after.annual),calculateAnnualBudgetPlan(plan).annualOutflow);
});
test('new ledger amounts, category edits, reserve changes and restored plans immediately recalculate',()=>{
  const plan=structuredClone(initialAnnualBudgetPlan);
  plan.rows.find(row=>row.id==='emergency').normal=700;
  const changed=[...budgets,row('small',123.45),row('daily',456.78),row('unassigned',90.12)];
  const result=financeChartData(14000,changed,plan);
  assert.equal(sum(result.monthly),result.usage.spending);
  assert.equal(result.usage.spending,11870.35);
  assert.equal(result.usage.surplus,2129.65);
  assert.equal(result.monthly.find(row=>row.id==='unassigned').value,90.12);
  assert.deepEqual(financeChartData(14000,changed,JSON.parse(JSON.stringify(plan))),result);
  plan.mode='trip';
  assert.equal(financeChartData(14000,changed,plan).usage.emergency,500);
});
test('refunds, overspending, zero and decimal movements preserve waterfall reconciliation',()=>{
  for(const [income,amount] of [[0,0],[100,200],[0,-10.01],[0.3,0.1]]) {
    const result=financeChartData(income,[row('daily',amount)],initialAnnualBudgetPlan);
    assert.equal(sum(result.monthly),result.usage.spending);
    const bars=waterfallSteps(result.waterfall);
    assert.equal(bars.at(-1).after,result.usage.surplus);
    assert.equal(bars.at(-1).before,0);
  }
  const bars=waterfallSteps([{label:'start',kind:'start',value:1},
    {label:'in',kind:'positive',value:0.1},{label:'out',kind:'negative',value:-0.2},
    {label:'end',kind:'end',value:999}]);
  assert.equal(bars.at(-1).value,0.9);
});
test('health total is the weighted sum of displayed dimensions and reacts to current data',()=>{
  const result=financeHealth(13000,2000,3250,2000/4750,6,0,10000,10000);
  assert.equal(result.score,Math.round(result.dimensions.reduce((total,row)=>total+row.value*row.weight/100,0)));
  assert.ok(financeHealth(13000,-100,3250,2000/4750,6,0,10000,10000).score<result.score);
  assert.ok(financeHealth(13000,2000,3250,6,6,0,10000,10000).score>result.score);
});
