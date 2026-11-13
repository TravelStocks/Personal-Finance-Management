const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {projectPayments}=loadModel('project-payments');
const {financeChartData}=loadModel('finance-chart-model');
const {initialAnnualBudgetPlan}=loadModel('annual-budget-model');
const {calculateLiquidity}=loadModel('liquidity-model');
const {planYearProgress}=loadModel('plan-year');
const project={id:'p',name:'测试项目',target:1000,current:1234.56,locked:true,dueDate:'2026-10-30'};
const month=(p,id)=>projectPayments([p],id+'-01',id+'-31').total;

test('only actual date assigns a payment; edit, clear, ledger inclusion and restoration reconcile',()=>{
  assert.equal(month(project,'2026-10'),0);
  const paid={...project,actualDate:'2026-11-13'};
  assert.equal(month(paid,'2026-10'),0);assert.equal(month(paid,'2026-11'),1234.56);
  const moved={...paid,actualDate:'2026-12-01',current:432.10};
  assert.equal(month(moved,'2026-11'),0);assert.equal(month(moved,'2026-12'),432.10);
  assert.equal(month({...paid,actualDate:''},'2026-11'),0);
  assert.equal(month({...paid,includedInLedger:true},'2026-11'),0);
  assert.equal(month(JSON.parse(JSON.stringify(paid)),'2026-11'),1234.56);
  const model=financeChartData(13000,[{group:'daily',actual:100}],initialAnnualBudgetPlan,month(paid,'2026-11'));
  assert.equal(model.usage.spending,4584.56);assert.equal(model.usage.surplus,8415.44);
  assert.equal(model.monthly.find(row=>row.id==='project-payments').value,1234.56);
  assert.equal(model.waterfall.at(-1).value,8415.44);
});
test('paid projects stop reserving cash; plan year respects payment date and duplicate flag',()=>{
  const paid={...project,actualDate:'2026-11-13'};
  assert.equal(calculateLiquidity([], [project]).projectReserved,1234.56);
  assert.equal(calculateLiquidity([], [paid]).projectReserved,0);
  assert.equal(planYearProgress('2026-11-12',[],[],[paid]).spending,0);
  assert.equal(planYearProgress('2026-11-13',[],[],[paid,{...paid,includedInLedger:true}]).spending,1234.56);
});
