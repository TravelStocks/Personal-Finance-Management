export const spendingGroups = [
  {id: "rent", name: "房租"}, {id: "parents", name: "家用"},
  {id: "learning", name: "应急&学习金 · 学习"}, {id: "travel", name: "旅游基金"},
  {id: "partner", name: "伴侣基金"}, {id: "small", name: "小额支付"},
  {id: "daily", name: "日常使用"},
] as const;
export type SpendingGroup = typeof spendingGroups[number]["id"];
export type SpendingBudget = {
  id: string; name: string; plan: number; actual: number; required: boolean; fixed: boolean;
  group?: SpendingGroup | "unassigned";
  note?: string;
  reviewPeriod?: {id:string;start:string;end:string};
};
export function getSpendingGroup(row: SpendingBudget): SpendingGroup | "unassigned" {
  return spendingGroups.some(group => group.id === row.group) ? row.group as SpendingGroup : "unassigned";
}
const sum = (amounts: number[]) => amounts.reduce((total, amount) => total + Math.round(amount * 100), 0) / 100;
export function summarizeLearning(rows: SpendingBudget[]) {
  const learning = rows.filter(row => getSpendingGroup(row) === "learning" && row.actual !== 0);
  return {rows: learning, total: sum(learning.map(row => row.actual)),
    unassigned: sum(rows.filter(row => getSpendingGroup(row) === "unassigned").map(row => row.actual)),
    missingNotes: learning.filter(row => !row.note?.trim()).length};
}
const detailPresets: Array<{id: string; name: string; group: SpendingGroup}> = [
  {id: "lunch-dinner", name: "午餐与晚餐", group: "daily"},
  {id: "social-meals", name: "聚餐与外卖", group: "daily"},
  {id: "goods", name: "衣物与日用品", group: "daily"},
  {id: "phone-subscriptions", name: "通讯与非学习订阅", group: "daily"},
  {id: "sports", name: "运动与娱乐", group: "daily"},
  {id: "health", name: "医疗与个护", group: "daily"},
  {id: "gifts", name: "人情与其他日常", group: "daily"},
  {id: "courses", name: "学习课程与培训", group: "learning"},
  {id: "books", name: "学习书籍与资料", group: "learning"},
  {id: "tools", name: "学习工具与订阅", group: "learning"},
  {id: "small-wallet", name: "早餐地铁零食汇总", group: "small"},
];
export function addSpendingDetailPresets(rows: SpendingBudget[]) {
  const additions = detailPresets.filter(preset => !rows.some(row => row.id === `detail-${preset.id}` || row.name.trim() === preset.name));
  return [...rows, ...additions.map(preset => ({...preset, id: `detail-${preset.id}`, plan: 0, actual: 0, required: false, fixed: false, note: ""}))];
}
export function nextMonthSpendingRows(rows: SpendingBudget[]) {
  return rows.map(row => ({...row, actual: 0, note: ""}));
}
