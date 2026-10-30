import {calculateAnnualBudgetPlan, type AnnualBudgetPlan} from "./annual-budget-model";
import {getSpendingGroup, type SpendingBudget} from "./spending-detail-model";
import {monthlyBudgetUsage} from "./monthly-budget-usage";

const sum = (values: number[]) => values.reduce((total, value) => total + Math.round(value * 100), 0) / 100;
export type WaterfallStep = {label: string; value: number; kind: "start" | "positive" | "negative" | "end"};

export function financeChartData(income: number, budgets: SpendingBudget[], plan: AnnualBudgetPlan) {
  const usage = monthlyBudgetUsage(income, sum(budgets.map(row => row.actual)), plan);
  const monthly = plan.rows.map(row => ({
    id: row.id, label: row.name, plan: row[plan.mode],
    value: row.kind === "consumption"
      ? sum(budgets.filter(item => getSpendingGroup(item) === row.id).map(item => item.actual))
      : row[plan.mode],
    detail: row.kind === "consumption" ? "已记净消费" : "本月预算预留，非重复消费",
  }));
  const unassigned = budgets.filter(row => getSpendingGroup(row) === "unassigned");
  if (unassigned.some(row => row.actual !== 0)) monthly.push({id: "unassigned", label: "待归类", plan: 0,
    value: sum(unassigned.map(row => row.actual)), detail: "原账本未归类金额"});
  const annual = calculateAnnualBudgetPlan(plan).rows.map(row => ({id: row.id, label: row.name, value: row.annual}));
  const waterfall: WaterfallStep[] = [
    {label: "已记收入", value: income, kind: "positive"},
    {label: "净消费", value: -usage.consumption, kind: usage.consumption < 0 ? "positive" : "negative"},
    {label: "投资预留", value: -usage.investment, kind: "negative"},
    {label: "应急预留", value: -usage.emergency, kind: "negative"},
    {label: "收支结余", value: usage.surplus, kind: "end"},
  ];
  return {monthly, annual, waterfall, usage};
}

export function waterfallSteps<T extends WaterfallStep>(data: T[]) {
  let running = 0;
  return data.map(item => {
    const before = item.kind === "start" || item.kind === "end" ? 0 : running;
    // The final column is a subtotal, never another movement of money.
    const after = item.kind === "end" ? running : item.kind === "start" ? item.value : sum([running, item.value]);
    running = after;
    return {...item, value: item.kind === "end" ? after : item.value, before, after};
  });
}

export function financeHealth(income: number, surplus: number, reserve: number, coverage: number,
  targetMonths: number, debtRatio: number, investmentValue: number, investmentCost: number) {
  const clamp = (value: number) => Math.max(0, Math.min(100, value));
  const dimensions = [
    {label: "结余保障", value: income > 0 ? clamp(surplus / income / 0.2 * 100) : 0, weight: 25},
    {label: "应急覆盖", value: clamp(coverage / Math.max(targetMonths, 1) * 100), weight: 25},
    {label: "负债健康", value: clamp(100 - debtRatio * 100), weight: 20},
    {label: "基金预留", value: income > 0 ? clamp(reserve / income / 0.45 * 100) : 0, weight: 20},
    {label: "投资保值", value: investmentCost > 0 ? clamp(investmentValue / investmentCost * 100) : 0, weight: 10},
  ];
  return {dimensions, score: Math.round(dimensions.reduce((total, row) => total + row.value * row.weight / 100, 0))};
}
