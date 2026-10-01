const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = path.resolve(__dirname, '../app/annual-budget-model.ts');
const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
const exported = {};
new Function('exports', compiled)(exported);
const {initialAnnualBudgetPlan: baseline, calculateAnnualBudgetPlan: calculate, calculateAnnualAccumulation: accumulate, normalizeAnnualBudgetPlan: normalize} = exported;
const result = calculate(baseline);

assert.equal(result.normalMonths, 9);
assert.equal(result.netUsd, 50);
assert.equal(result.dailyNetCny, 335);
assert.equal(result.annualSalary, 156000);
assert.equal(result.annualTripNet, 30150, 'Use net subsidy after overseas spending, never gross subsidy');
assert.equal(result.annualIncome, 186150);
assert.equal(result.annualConsumption, 145350);
assert.equal(result.annualInvestment, 33000);
assert.equal(result.annualEmergency, 6000);
assert.equal(result.annualSaving, 39000, 'Travel, partner, parent and learning payments are not included in investment/emergency savings');
assert.equal(result.annualOutflow, 184350);
assert.equal(result.annualSurplus, 1800);
assert.equal(result.annualRetained, 40800);
assert.equal(result.averageIncome, 15512.5);
assert.equal(result.averageSurplus, 150);
assert.equal(result.normal.consumption, 13000);
assert.equal(result.trip.consumption, 9450);
assert.equal(result.normal.totalOutflow, 16250);
assert.equal(result.trip.totalOutflow, 12700);
assert.equal(result.normal.surplus, -3250);
assert.equal(result.trip.income, 23050);
assert.equal(result.trip.surplus, 10350);
assert.equal(result.annualNormalSurplus, -29250);
assert.equal(result.annualTripSurplus, 31050);
assert.equal(result.annualNormalSurplus + result.annualTripSurplus, result.annualSurplus);
assert.equal(result.normal.surplus * 9 + result.trip.surplus * 3, result.annualSurplus);
assert.equal(result.buffer, 9750, 'The timing reserve is not an additional annual expense');
assert.equal(result.basicNeed, 6550);
assert.equal(result.emergencyTarget, 39300);
assert.equal(result.emergencyYearEnd, 8000);
assert.equal(result.emergencyGap, 31300);
assert.equal(result.requiredTripDays, 85);
assert.equal(result.assumptionsConflict, false);
for (const row of result.rows) {
  assert.equal(row.annual, row.normal * 9 + row.trip * 3);
  if (!['food', 'transport'].includes(row.id)) assert.equal(row.normal, row.trip, `${row.id} must retain all 12 months of budget`);
}
assert.equal(result.rows.find(row => row.id === 'learning').annual, 12000, 'No extra learning fund of 500 per month');
assert.equal(result.rows.find(row => row.id === 'partner').annual, 12000, 'Partner and travel spending is paid from the existing reservation');
const suppliedAllocationTable = [
  ['rent',2750,2750,33000],['parents',2000,2000,24000],['food',2880,0,25920],['transport',670,0,6030],
  ['learning',1000,1000,12000],['sports',400,400,4800],['clothes',300,300,3600],['digital',300,300,3600],
  ['medical',300,300,3600],['gifts',100,100,1200],['dates',300,300,3600],['partner',1000,1000,12000],
  ['travel',1000,1000,12000],['emergency',500,500,6000],['investment',2750,2750,33000]
];
assert.deepEqual(result.rows.map(row=>[row.id,row.normal,row.trip,row.annual]),suppliedAllocationTable,'Every row must match the complete table supplied by the user');
const fractionalTrip = calculate({...baseline, budgetFx:6.71, paidDays:89});
assert.equal(fractionalTrip.annualNormalSurplus + fractionalTrip.annualTripSurplus, fractionalTrip.annualSurplus,'Annual comparison uses exact totals instead of multiplying rounded monthly averages');

assert.equal(calculate({...baseline, paidDays: 84}).annualSurplus, -210);
assert.equal(calculate({...baseline, paidDays: 85}).annualSurplus, 125);
assert.equal(calculate({...baseline, budgetFx: 6.3}).annualSurplus, 0);
assert.equal(calculate({...baseline, dailySpendUsd: 120}).annualTripNet, -6030, 'Overseas overspending is a deficit, not a clamped saving');
assert.equal(calculate({...baseline, dailySpendUsd: 110}).requiredTripDays, null);
assert.equal(calculate({...baseline, paidDays: 0, awayMonths: 0}).annualOutflow, 195000);
assert.equal(calculate({...baseline, awayMonths: 0}).assumptionsConflict, true);
assert.equal(calculate({...baseline, awayMonths: 2}).assumptionsConflict, true);
assert.equal(calculate({...baseline, mode: 'trip'}).annualIncome, result.annualIncome, 'Changing the displayed month type does not alter annual totals');
const edited = normalize({...baseline, rows: baseline.rows.map(row => row.id === 'travel' ? {...row, normal: 1500, trip: 1500} : row)});
assert.equal(calculate(edited).annualOutflow, 190350);
assert.equal(calculate(edited).annualSurplus, -4200);
assert.equal(calculate(edited).annualSaving, 39000, 'Changing a future consumption bucket must not increase genuine savings');
assert.deepEqual(normalize(undefined), baseline, 'Existing backups without the new model use the source-confirmed annual plan');
assert.equal(normalize({salary: -1, awayMonths: 20, paidDays: 900, budgetFx: Infinity}).salary, 13000);
assert.equal(normalize({awayMonths: 20}).awayMonths, 12);
assert.equal(normalize({paidDays: 900}).paidDays, 366);
assert.equal(normalize({rows: [{id: 'food', normal: 2880.555, trip: 0}]}).rows.find(row => row.id === 'food').normal, 2880.56);
assert.equal(normalize({rows: [{id: 'learning', normal: 0, trip: 0}]}).rows.find(row => row.id === 'learning').normal, 0);
const firstCopy = normalize(undefined);
firstCopy.rows[0].normal = 0;
assert.equal(normalize(undefined).rows[0].normal, 2750, 'Normalization must not mutate the default or other saved plans');
assert.equal(normalize({salary:13000}).bonusAfterTax, null, 'Old backups keep the bonus unknown');
assert.equal(normalize({bonusAfterTax:0}).bonusAfterTax, 0, 'Explicit zero differs from an unknown bonus');
assert.equal(normalize({bonusAfterTax:-1}).bonusAfterTax, null);
assert.equal(normalize({bonusAfterTax:Infinity}).bonusAfterTax, null);
assert.equal(normalize({bonusAfterTax:20000.555}).bonusAfterTax, 20000.56);
for (const [bonus,cash,total,rate] of [[10000,17800,50800,'25.9'],[20000,27800,60800,'29.5'],[30000,37800,70800,'32.8']]) {
  const scenario=accumulate(baseline,bonus);
  assert.equal(scenario.projectedCash,cash);
  assert.equal(scenario.projectedAccumulation,total);
  assert.equal(scenario.fixedTarget,39000+bonus);
  assert.equal(scenario.incomeWithBonus,186150+bonus,'The accumulation percentage includes this scenario bonus in the denominator');
  assert.equal((scenario.accumulationRate*100).toFixed(1),rate);
  assert.equal(scenario.projectedCash+result.annualInvestment,scenario.projectedAccumulation,'Emergency and surplus cash must not be counted twice');
}
const bonusPlan=normalize({...baseline,bonusAfterTax:20000});
assert.equal(accumulate(bonusPlan).projectedAccumulation,60800);
assert.equal(calculate(bonusPlan).annualIncome,186150,'Scenario bonus is not treated as an actual base-budget income');
const increasedInvestment=normalize({...bonusPlan,rows:bonusPlan.rows.map(row=>row.id==='investment'?{...row,normal:3000,trip:3000}:row)});
assert.equal(accumulate(increasedInvestment).projectedAccumulation,60800,'Moving cash to investment changes the composition, never the total accumulation');
assert.equal(accumulate(increasedInvestment).projectedCash,24800);
assert.equal(accumulate({...baseline,paidDays:0},10000).projectedCash,-12350,'A funding deficit is shown instead of falsely promising cash savings');
console.log('Annual budget: screenshot totals, month modes, no duplicate expenses, timing reserve, emergency lower bound, sensitivity and backup defaults passed.');
