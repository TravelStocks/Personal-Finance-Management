import type {DatedEntry, LedgerMonth} from "./dated-ledger-model";
import {projectPayments} from "./project-payments";

export const planYearStart = "2026-11-10";
export const planYearEnd = "2027-11-09";
export const planYearLabel = `${planYearStart} 至 ${planYearEnd}`;

export function planYearProgress(today: string, months: LedgerMonth[], entries: DatedEntry[], projects:Parameters<typeof projectPayments>[0] = []) {
  const cutoff = today < planYearEnd ? today : planYearEnd;
  if (today < planYearStart) return {status: "尚未开始", spending: 0, undated: false};
  const [year, month, day] = today.split("-").map(Number);
  const period = (year - 2026) * 12 + month - 11 + (day >= 10 ? 1 : 0);
  const status = today > planYearEnd ? "12 个账期已结束" : `第 ${period} / 12 账期`;
  let cents = Math.round(projectPayments(projects,planYearStart,cutoff).total*100), undated = false;
  const assigned = new Map<string, number>();
  for (const row of entries.filter(row => row.flow === "expense")) {
    const amount = Math.round(row.amount * 100);
    if (row.date >= planYearStart && row.date <= cutoff) cents += amount;
    const key = `${row.date.slice(0, 7)}:${row.categoryId}`;
    assigned.set(key, (assigned.get(key) ?? 0) + amount);
  }
  for (const month of months) {
    if (month.id < planYearStart.slice(0, 7) || month.id > cutoff.slice(0, 7)) continue;
    const [y, m] = month.id.split("-").map(Number);
    const lastDay = new Date(Date.UTC(y, m, 0)).toISOString().slice(0, 10);
    for (const row of month.budgets) {
      // Dated payments already count above. Only add residuals whose entire week or month is in range.
      const residual = Math.round(row.actual * 100) - (assigned.get(`${month.id}:${row.id}`) ?? 0);
      if (!residual) continue;
      const start = row.reviewPeriod?.start ?? `${month.id}-01`;
      const end = row.reviewPeriod?.end ?? lastDay;
      if (end < planYearStart || start > cutoff) continue;
      if (start >= planYearStart && end <= cutoff) cents += residual;
      else undated = true;
    }
  }
  return {status, spending: cents / 100, undated};
}
