const {test} = require('node:test');
const assert = require('node:assert/strict');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('annual-budget-model');
const save = loadModel('finance-save-model');

test('direct allocation edits update only the selected month type and recalculate annual totals', () => {
  const plan = m.normalizeAnnualBudgetPlan(undefined), before = structuredClone(plan);
  const next = m.updateAnnualBudgetAmount(plan,'rent','normal',2800.25);
  const totals = m.calculateAnnualBudgetPlan(next);
  assert.equal(next.rows.find(row=>row.id==='rent').trip,2750);
  assert.equal(totals.normal.totalOutflow,13050.25);
  assert.equal(totals.normal.surplus,-50.25);
  assert.equal(totals.annualOutflow,155552.25);
  assert.deepEqual(plan,before);
  assert.equal(next.salary,plan.salary);
});

test('emergency and learning remain separate editable amounts with a reconciled combined display', () => {
  let plan = m.normalizeAnnualBudgetPlan(undefined);
  plan = m.updateAnnualBudgetAmount(plan,'emergency','normal',700);
  plan = m.updateAnnualBudgetAmount(plan,'learning','normal',800);
  plan = m.updateAnnualBudgetAmount(plan,'small','trip',0);
  const totals = m.calculateAnnualBudgetPlan(plan);
  const combined = totals.allocationRows.find(row=>row.id==='emergencyLearning');
  assert.equal(combined.normal,1500);
  assert.equal(combined.trip,1500);
  assert.equal(combined.annual,18000);
  assert.equal(totals.annualEmergency,7800);
  assert.equal(totals.annualOutflow,155100);
  assert.equal(totals.annualSaving,40800);
});

test('invalid edits do not reset customized amounts; zero, cents and saved edits survive reload', () => {
  let plan = m.updateAnnualBudgetAmount(m.normalizeAnnualBudgetPlan(undefined),'investment','trip',1234.56);
  for (const amount of [-1,NaN,Infinity,100000001]) assert.equal(m.updateAnnualBudgetAmount(plan,'investment','trip',amount),plan);
  assert.equal(m.updateAnnualBudgetAmount(plan,'unknown','normal',20),plan);
  plan = m.updateAnnualBudgetAmount(plan,'travel','normal',0);
  plan = m.updateAnnualBudgetAmount(plan,'learning','trip',10.125);
  let raw = null;
  const storage = {getItem:()=>raw,setItem:(_key,value)=>{raw=value;}};
  save.writeLocalFinanceData(storage,'test',{annualBudgetPlan:plan});
  const restored = m.normalizeAnnualBudgetPlan(JSON.parse(raw).annualBudgetPlan);
  assert.deepEqual(restored,plan);
  assert.equal(restored.rows.find(row=>row.id==='investment').trip,1234.56);
  assert.equal(restored.rows.find(row=>row.id==='travel').normal,0);
  assert.equal(restored.rows.find(row=>row.id==='learning').trip,10.13);
});
