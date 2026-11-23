const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadModel}=require('../scripts/finance-review.cjs');
const {billCalendarEvents}=loadModel('bill-calendar-model');
const bill={id:'subscription',name:'Subscription',amount:108,date:'2026-11-18',kind:'订阅'};

test('calendar shows saved payment status and exact date without booking another expense',()=>{
  const paid={...bill,payments:{'2026-11':'2026-11-20'}};
  const before=structuredClone(paid);
  const [event]=billCalendarEvents([paid],'2026-11');
  assert.equal(event.paid,true);assert.equal(event.paidDate,'2026-11-20');
  assert.equal(event.date,'2026-11-18');assert.equal(event.kind,'提醒，非新增记账');
  assert.equal(event.outflow,108);assert.deepEqual(paid,before);
  assert.equal(billCalendarEvents([bill],'2026-11')[0].paid,false);
});
test('rolled reminders retain historical payment marks but do not mark the next month paid',()=>{
  const rolled={...bill,date:'2026-12-18',payments:{'2026-11':'2026-11-20'}};
  assert.equal(billCalendarEvents([rolled],'2026-11')[0].date,'2026-11-20');
  assert.equal(billCalendarEvents([rolled],'2026-11')[0].paid,true);
  assert.equal(billCalendarEvents([rolled],'2026-12')[0].paid,false);
  assert.deepEqual(billCalendarEvents([rolled],'2026-10'),[]);
});
test('unknown paid dates stay unknown, unchecking removes marks, and deposits are not bills',()=>{
  const paid={...bill,date:'2026-12-18',payments:{'2026-11':''}};
  const [event]=billCalendarEvents([paid],'2026-11');
  assert.equal(event.paid,true);assert.equal(event.paidDate,'');assert.equal(event.date,'2026-11');
  assert.deepEqual(billCalendarEvents([{...paid,payments:{}}],'2026-11'),[]);
  assert.equal(billCalendarEvents([{...bill,kind:'定存'}],'2026-11')[0].paid,undefined);
});
