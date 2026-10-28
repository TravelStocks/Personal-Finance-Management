const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const budget = loadModel('annual-budget-model');
const {calculateLiquidity} = loadModel('liquidity-model');
const plan = () => budget.normalizeAnnualBudgetPlan(undefined);
const account = (id, balance, reserve = null, liquid = true) => ({id, name:id, balance, reserve, liquid});
const project = (id, current, fundingAccountId = '', locked = true) => ({id, name:id, current, fundingAccountId, locked});

test('all current forecasts use the annual allocation, not old spending and market plans', () => {
  const p = plan();
  const cash = budget.calculateCashflowScenario(p);
  assert.deepEqual(cash, {inflow:13000,outflow:13000,change:0,consumption:9750,saving:3250,extraInflow:0,extraOutflow:0});
  assert.equal(cash.outflow, budget.calculateAnnualBudgetPlan(p).normal.totalOutflow);
  const trip = budget.calculateCashflowScenario({...p,mode:'trip'});
  assert.equal(trip.outflow,12700);
  assert.equal(trip.inflow,13000,'Unconfirmed subsidy must not become current cash');
  assert.equal(trip.change,300);
  const withExtras = budget.calculateCashflowScenario(p,[{direction:'inflow',amount:100},{direction:'outflow',amount:250}]);
  assert.equal(withExtras.change,-150);
});

test('confirmed emergency parameters migrate once without changing balances or other allocations', () => {
  const old = {...plan(),allocationVersion:2,emergencyMonthlyNeed:4500,emergencyCurrent:21,
    rows:plan().rows.map(row=>row.id==='emergency'?{...row,normal:1000,trip:1000}:row)};
  const copy = structuredClone(old);
  const migrated = budget.normalizeAnnualBudgetPlan(old);
  assert.equal(migrated.emergencyMonthlyNeed,4750);
  assert.equal(budget.calculateAnnualBudgetPlan(migrated).emergencyTarget,28500);
  assert.equal(migrated.emergencyCurrent,21);
  assert.equal(migrated.rows.find(row=>row.id==='emergency').normal,500);
  assert.deepEqual(migrated.rows.filter(row=>row.id!=='emergency'),old.rows.filter(row=>row.id!=='emergency'));
  assert.deepEqual(old,copy,'Backup objects must not be mutated');
  const edited = {...migrated,emergencyMonthlyNeed:4800,rows:migrated.rows.map(row=>row.id==='emergency'?{...row,normal:600}:row)};
  assert.deepEqual(budget.normalizeAnnualBudgetPlan(edited),edited,'Later deliberate edits survive reload');
});

test('liquid cash excludes dedicated balances once, including zero and non-liquid reserves', () => {
  const accounts = [account('main',1000),account('investment',3000,'investment'),account('travel',500,'travel'),account('emergency',21,'emergency'),account('learning',0,'learning'),account('locked',900,'investment',false)];
  const result = calculateLiquidity(accounts,[]);
  assert.equal(result.liquidCash,4521);
  assert.equal(result.accountReserved,3521);
  assert.equal(result.available,1000);
  assert.equal(calculateLiquidity(accounts.map(a=>a.id==='emergency'?{...a,balance:0}:a),[]).available,1000);
});

test('explicitly linked projects deduplicate by account, not by similar names or amounts', () => {
  const accounts = [account('main',1000),account('travel',800,'travel')];
  const linked = [project('trip1',300,'travel'),project('trip2',400,'travel')];
  assert.equal(calculateLiquidity(accounts,linked).available,1000);
  const extra = calculateLiquidity(accounts,[...linked,project('trip3',400,'travel')]);
  assert.equal(extra.available,700);
  assert.equal(extra.overallocated,300);
  const unknown = calculateLiquidity(accounts,[project('trip1',300)]);
  assert.equal(unknown.available,700);
  assert.equal(unknown.unlinkedCount,1);
  assert.equal(calculateLiquidity(accounts,[project('general',200,'main')]).available,800);
  assert.equal(calculateLiquidity(accounts,[project('unlocked',800,'',false)]).available,1000);
});

test('non-liquid links, deleted accounts, and overcommitment never inflate spendable cash', () => {
  const accounts = [account('main',100),account('locked',900,'investment',false)];
  assert.equal(calculateLiquidity(accounts,[project('invest',800,'locked')]).available,100);
  assert.equal(calculateLiquidity(accounts,[project('invest',1000,'locked')]).available,0);
  assert.equal(calculateLiquidity(accounts,[project('missing',200,'deleted')]).available,-100);
  assert.equal(calculateLiquidity([account('main',-20),account('reserve',200,'emergency')],[]).available,-20);
});
