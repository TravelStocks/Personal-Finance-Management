import type {AnnualBudgetPlan} from "./annual-budget-model";
import type {FinanceReview} from "./finance-review-model";
import type {ReviewUpdate} from "./review-dashboard-sync";
import {reviewActivityPeriods} from "./review-activity-model";
import {getSpendingGroup, type SpendingBudget} from "./spending-detail-model";

export function budgetCompletion(plan: AnnualBudgetPlan, budgets: SpendingBudget[], month: string,
  records: FinanceReview[] = [], updates: ReviewUpdate[] = []) {
  // Transfers have no payment dates; do not guess their month across a month boundary.
  const periods = reviewActivityPeriods(records, updates).filter(row => row.start.startsWith(month + "-") && row.end.startsWith(month + "-"));
  return Object.fromEntries(plan.rows.map(row => {
    const amounts = row.kind === "consumption"
      ? budgets.filter(item => getSpendingGroup(item) === row.id).map(item => item.actual)
      : periods.map(period => period.amounts[row.kind] ?? 0);
    const actual = amounts.reduce((total, value) => total + Math.round(value * 100), 0) / 100;
    return [row.id, {actual, completed: actual > 0}];
  }));
}
