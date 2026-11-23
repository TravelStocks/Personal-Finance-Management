import {billPaid, type ReviewBill} from "./finance-review-model";

export function billCalendarEvents(bills: ReviewBill[], month: string) {
  return bills.filter(bill => bill.date.startsWith(month + "-") || billPaid(bill, month)).map(bill => {
    const paid = billPaid(bill, month);
    const paidDate = bill.payments?.[month] ?? "";
    return {
      date: bill.date.startsWith(month + "-") ? bill.date : paidDate || month,
      item: bill.name,
      inflow: bill.kind === "定存" ? bill.amount : 0,
      outflow: bill.kind === "定存" ? 0 : bill.amount,
      kind: "提醒，非新增记账",
      paid: bill.kind === "定存" ? undefined : paid,
      paidDate,
    };
  });
}
