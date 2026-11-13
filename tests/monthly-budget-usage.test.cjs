const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {loadModel}=require('../scripts/finance-review.cjs');
const {monthlyBudgetUsage}=loadModel('monthly-budget-usage');
const {initialAnnualBudgetPlan}=loadModel('annual-budget-model');

test('monthly outflow reserves investment and emergency once, with screenshot totals',()=>{
  const plan=structuredClone(initialAnnualBudgetPlan),before=structuredClone(plan);
  const actual=monthlyBudgetUsage(13000,7750,plan);
  assert.deepEqual(actual,{consumption:7750,investment:2750,emergency:500,reserved:3250,budget:13000,spending:11000,surplus:2000,remaining:2000});
  assert.deepEqual(monthlyBudgetUsage(13000,7750,plan),actual);
  assert.deepEqual(plan,before);
});
test('reserve changes, zero, cents, refunds and trip mode use the same allocation source',()=>{
  const plan=structuredClone(initialAnnualBudgetPlan);
  plan.rows=plan.rows.map(row=>row.kind==='investment'?{...row,normal:0,trip:123.45}:row.kind==='emergency'?{...row,normal:0,trip:67.89}:row);
  assert.equal(monthlyBudgetUsage(13000,7750,plan).spending,7750);
  plan.mode='trip';
  const usage=monthlyBudgetUsage(100,-10.01,plan);
  assert.equal(usage.reserved,191.34);
  assert.equal(usage.spending,181.33);
  assert.equal(usage.surplus,-81.33);
  assert.deepEqual(monthlyBudgetUsage(100,-10.01,JSON.parse(JSON.stringify(plan))),usage);
});
test('overview, expenditure and reports share computed usage without changing account totals',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../app/page.tsx'),'utf8');
  assert.match(source,/const monthlySurplus = budgetUsage.surplus/);
  assert.match(source,/spending=\{totals.budgetUsage.spending\}/);
  assert.match(source,/aria-label="月度支出与基金预留"/);
  assert.match(source,/allocation: totals.budgetUsage.reserved/);
  assert.match(source,/netWorth: totalAssets - totalDebt/);
  assert.doesNotMatch(source,/actualIncome - spendingActual - assetOutflow/);
});

test('monthly actual-spending card uses net consumption, not outflow including budget reserves',()=>{
  const {projectPayments}=loadModel('project-payments');
  const payments=projectPayments([{current:5577.78,actualDate:'2026-11-13'},
    {current:300,actualDate:'2026-11-12',includedInLedger:true},{current:200,dueDate:'2026-11-01'}],'2026-11-01','2026-11-30');
  const usage=monthlyBudgetUsage(13000,Math.round((7860.84+payments.total)*100)/100,initialAnnualBudgetPlan);
  assert.equal(usage.consumption,13438.62);
  assert.equal(usage.spending,16688.62);
  const source=fs.readFileSync(path.join(__dirname,'../app/page.tsx'),'utf8');
  const card=source.split('id: "monthly-overview-living"')[1].split('tone:')[0];
  assert.match(card,/value: reviewMoney\(totals\.spendingActual\)/);
  assert.doesNotMatch(card,/budgetUsage|预留/);
});
