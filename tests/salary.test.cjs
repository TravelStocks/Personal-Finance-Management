const assert = require('node:assert/strict');
const {test} = require('node:test');
const {loadModel} = require('../scripts/finance-review.cjs');
const m = loadModel('salary-model');

test('salary upgrade changes current and future income, keeps past actuals and other records', () => {
  const records = [{id:'2026-06',salary:14400,otherIncome:50}, {id:'2026-09',salary:15000}, {id:'2026-10',salary:15000}, {id:'2026-11',salary:15000}];
  const before = structuredClone(records);
  const updated = m.migrateSalarySettings(records,15000);
  assert.equal(updated.salary,13000);
  assert.deepEqual(updated.records.map(row=>row.salary),[14400,15000,13000,13000]);
  assert.deepEqual(records,before);
  assert.equal(updated.records[0].otherIncome,50);
  const later = m.migrateSalarySettings(updated.records,13500,1);
  assert.equal(later.salary,13500);
  assert.deepEqual(later.records,updated.records);
});

test('future salary planning changes only from the effective month and preserves zero', () => {
  const records = [{id:'2026-10',salary:13000},{id:'2026-11',salary:13000},{id:'2027-01',salary:13000}];
  assert.deepEqual(m.applySalaryFromMonth(records,14000,'2026-11').map(row=>row.salary),[13000,14000,14000]);
  assert.equal(m.migrateSalarySettings(records,0,1).salary,0);
});
