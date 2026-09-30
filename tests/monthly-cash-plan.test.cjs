const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');
const ts = require('typescript');

const source = path.resolve(__dirname, '../app/monthly-cash-plan.tsx');
const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX},
}).outputText;
const requireSource = createRequire(source);
const exported = {};
new Function('exports', 'require', compiled)(exported, name => name.endsWith('.css') ? {} : requireSource(name));
const {initialMonthlyCashPlan: latest, originalMonthlyCashPlan: original, calculateMonthlyCashPlan: calculate, monthlyCashPreset: preset, normalizeMonthlyCashPlan: normalize} = exported;

const updated = calculate(latest);
assert.equal(latest.income, 13000);
assert.equal(latest.living, 3500);
assert.equal(latest.investment, 2750);
assert.equal(latest.travel, 1000);
assert.equal(latest.emergency, 500);
assert.equal(updated.totalOutflow, 14000);
assert.equal(updated.surplus, -1000);
assert.equal(updated.originalAllocations, 12500, 'Updating the current plan must preserve the original comparison');
assert.equal(latest.debt, 20000, 'Being able to repay does not confirm that repayment has occurred');

const current = calculate(original);
assert.equal(current.originalAllocations, 12500, 'The user\'s seven original allocations consume exactly the salary');
assert.equal(current.totalOutflow, 15000);
assert.equal(current.surplus, -2500);
assert.equal(current.months, null);
assert.equal(current.projection[5].debt, 20000, 'An uncovered cash deficit must not become a new loan automatically');
assert.equal(current.projection[5].cumulative, -15000);

const balancedPlan = preset(original, 'balanced');
const balanced = calculate(balancedPlan);
assert.equal(balanced.totalOutflow, 11750);
assert.equal(balanced.surplus, 750);
assert.equal(balanced.months, 10);
assert.equal(balanced.projection[5].debt, 8000);
assert.equal(balanced.projection[5].cumulative, 4500);

const faster = calculate(preset(original, 'repay'));
assert.equal(faster.totalOutflow, 12250);
assert.equal(faster.surplus, 250);
assert.equal(faster.months, 6);
assert.equal(faster.projection[5].repayment, 2500, 'Final repayment is capped at remaining principal');
assert.equal(faster.projection[5].debt, 0);
assert.equal(faster.projection[5].surplus, 1250);
assert.equal(faster.projection[5].cumulative, 2500);

const smallLoan = calculate({...balancedPlan, debt: 500});
assert.equal(smallLoan.actualRepayment, 500);
assert.equal(smallLoan.totalOutflow, 10250);
assert.equal(smallLoan.projection[1].repayment, 0);
assert.equal(smallLoan.projection[1].surplus, 2750);
assert.equal(calculate({...balancedPlan, debt: 0}).months, 0);
assert.equal(calculate({...balancedPlan, living: 3500}).months, null, 'An unaffordable repayment must not display a payoff promise');
assert.equal(calculate({...balancedPlan, repayment: 0}).months, null);
assert.equal(calculate({...balancedPlan, income: 0}).affordableRepayment, 0);
assert.deepEqual(normalize(undefined), latest, 'Old backups receive the latest plan without losing existing records');
assert.equal(normalize({living: -1}).living, 3500);
assert.equal(normalize({living: Infinity}).living, 3500);
assert.equal(normalize({living: 2500.555}).living, 2500.56);
assert.equal(normalize({deadlineMonths: 3.8}).deadlineMonths, 3);

for (const scenario of [latest, original, balancedPlan, preset(original, 'repay'), {...balancedPlan, debt: 500}]) {
  const result = calculate(scenario);
  for (const month of result.projection) {
    assert.equal(Math.round((result.regularOutflow + month.repayment + month.surplus) * 100), Math.round(scenario.income * 100));
    assert.ok(month.debt >= 0);
  }
}
console.log('Monthly plan: source reconciliation, both draft budgets, debt caps, deficits and legacy defaults passed.');
