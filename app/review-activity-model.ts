import {reviewCategories, type FinanceReview, type ReviewDraft, type ReviewLedgerRow} from "./finance-review-model";
import {datedReviewSource, type DatedEntry, type LedgerMonth} from "./dated-ledger-model";
import type {ReviewUpdate} from "./review-dashboard-sync";

type ActivityPeriod = Pick<FinanceReview, "start" | "end" | "savedAt" | "notes"> & {
  amounts: ReviewDraft["amounts"]; ledger: ReviewLedgerRow[]; source: string;
};
export function reviewActivityPeriods(records: FinanceReview[], updates: ReviewUpdate[] = []) {
  const periods: ActivityPeriod[] = records.filter(row => row.type === "week").map(row => ({
    start: row.start, end: row.end, savedAt: row.savedAt, amounts: row.amounts,
    notes: row.notes, ledger: row.ledger ?? [], source: "已保存周复盘",
  }));
  for (const update of updates) {
    if (!update.published || update.module !== "spending" || !update.reviewId.startsWith("week:") || !update.moduleDraft?.amounts) continue;
    const start = update.reviewId.slice(5);
    const ledger = datedReviewSource((update.after.monthlyRecords ?? []) as LedgerMonth[],
      (update.after.datedEntries ?? []) as DatedEntry[], start, update.asOf).rows;
    periods.push({start, end: update.asOf, savedAt: update.savedAt, amounts: update.moduleDraft.amounts,
      notes: update.moduleDraft.notes ?? {}, ledger, source: "支出模块已保存并更新"});
  }
  // Revisions replace the displayed week, rather than becoming another payment.
  const latest = new Map<string, ActivityPeriod>();
  for (const period of periods.sort((a, b) => a.savedAt.localeCompare(b.savedAt))) latest.set(period.start, period);
  return [...latest.values()].sort((a, b) => b.start.localeCompare(a.start));
}

export function reviewActivityItems(period: ActivityPeriod) {
  return reviewCategories.map(category => {
    const amount = period.amounts[category.id];
    const entries = period.ledger.filter(row => row.flow === "expense" && row.group === category.id);
    const dated = entries.reduce((total, row) => total + Math.round(row.amount * 100), 0) / 100;
    const undated = amount === null ? null : Math.round((amount - dated) * 100) / 100;
    const dates = [...new Set(entries.map(row => row.date))].sort();
    return {...category, amount, entries, dates, undated, note: period.notes[category.id] ?? ""};
  });
}
