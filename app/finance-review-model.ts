export const reviewCategories = [
  {id: "rent", name: "房租", flow: "expense"},
  {id: "parents", name: "家用", flow: "expense"},
  {id: "investment", name: "投资基金", flow: "transfer"},
  {id: "emergency", name: "应急基金", flow: "transfer"},
  {id: "learning", name: "学习基金", flow: "expense"},
  {id: "travel", name: "旅游基金", flow: "expense"},
  {id: "partner", name: "伴侣基金", flow: "expense"},
  {id: "small", name: "小额支付", flow: "expense"},
  {id: "daily", name: "日常使用", flow: "expense"},
] as const;
export type ReviewCategory = typeof reviewCategories[number]["id"];
export type ReviewType = "week" | "month" | "quarter";
export const reviewTypeNames: Record<ReviewType, string> = {week: "周复盘", month: "月复盘", quarter: "季度复盘"};
export const balanceLabels = {cash: "现金及存款", investments: "证券账户总资产", otherAssets: "其他个人资产", debt: "个人负债"};
export type ReviewBalances = Record<keyof typeof balanceLabels, number>;
export type ReviewBudget = {mode: "normal" | "trip"; amounts: Record<ReviewCategory, number>};
export type FinanceReview = {
  id: string;
  type: ReviewType;
  start: string;
  end: string;
  savedAt: string;
  income: number;
  amounts: Record<ReviewCategory, number>;
  notes: Partial<Record<ReviewCategory, string>>;
  balances: ReviewBalances;
  summary: string;
  budget?: ReviewBudget;
};
export type ReviewDraft = Omit<FinanceReview, "id" | "savedAt" | "income" | "amounts" | "balances"> & {
  income: number | null;
  amounts: Record<ReviewCategory, number | null>;
  balances: Record<keyof ReviewBalances, number | null>;
};
const dayMs = 86400000;
const cents = (value: number) => Math.round((value + Number.EPSILON * Math.abs(value)) * 100);
const sum = (values: number[]) => values.reduce((total, value) => total + cents(value), 0) / 100;
export const reviewMoney = (value: number) => new Intl.NumberFormat("zh-CN", {style: "currency", currency: "CNY", maximumFractionDigits: 2}).format(value);
const signed = (value: number | null) => value === null ? "无上期基准" : `${value > 0 ? "+" : ""}${reviewMoney(value)}`;
const iso = (date: Date) => date.toISOString().slice(0, 10);
function dateValue(value: unknown): Date {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("日期须为 YYYY-MM-DD");
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || iso(date) !== value) throw new Error(`无效日期：${value}`);
  return date;
}
export function reviewToday() {
  return new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit"}).format(new Date());
}
export function reviewPeriod(type: ReviewType, end: string) {
  const date = dateValue(end);
  let start: Date;
  let limit: Date;
  if (type === "week") {
    start = new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * dayMs);
    limit = new Date(start.getTime() + 6 * dayMs);
  } else {
    const month = type === "quarter" ? Math.floor(date.getUTCMonth() / 3) * 3 : date.getUTCMonth();
    start = new Date(Date.UTC(date.getUTCFullYear(), month, 1));
    limit = new Date(Date.UTC(date.getUTCFullYear(), month + (type === "quarter" ? 3 : 1), 0));
  }
  return {start: iso(start), end, limit: iso(limit)};
}
export function newReviewDraft(type: ReviewType = "week", end = reviewToday()): ReviewDraft {
  const {start} = reviewPeriod(type, end);
  return {type, start, end, income: null,
    amounts: Object.fromEntries(reviewCategories.map(row => [row.id, null])) as ReviewDraft["amounts"],
    notes: {}, balances: {cash: null, investments: null, otherAssets: null, debt: null}, summary: ""};
}
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
export function parseFinanceReview(value: unknown): FinanceReview {
  const input = object(value);
  if (!["week", "month", "quarter"].includes(String(input.type))) throw new Error("请选择周、月或季度");
  const type = input.type as ReviewType;
  dateValue(input.start);
  dateValue(input.end);
  const start = input.start as string;
  const end = input.end as string;
  if (reviewPeriod(type, end).start !== start || start > end) throw new Error("日期须从本周周一、本月1日或本季度首日开始，不能跨周期");
  const amount = (value: unknown, label: string, nonnegative = false) => {
    if (typeof value !== "number" || !Number.isFinite(value) || Math.abs(value) > 1e12 || (nonnegative && value < 0)) {
      throw new Error(`请填写${label}；确实没有时填 0，空白不代表 0`);
    }
    return cents(value) / 100;
  };
  const inputAmounts = object(input.amounts);
  const inputNotes = object(input.notes);
  const inputBalances = object(input.balances);
  let budget: ReviewBudget | undefined;
  if (input.budget !== undefined) {
    const supplied = object(input.budget);
    if (type !== "month" || !["normal", "trip"].includes(String(supplied.mode))) throw new Error("月度预算参考须注明普通月或出差月");
    const values = object(supplied.amounts);
    budget = {mode: supplied.mode as ReviewBudget["mode"], amounts: Object.fromEntries(reviewCategories.map(row => [row.id, amount(values[row.id], `${row.name}月预算`, true)])) as ReviewBudget["amounts"]};
  }
  return {id: `${type}:${start}`, type, start, end,
    savedAt: typeof input.savedAt === "string" && Number.isFinite(Date.parse(input.savedAt)) ? input.savedAt : new Date().toISOString(),
    income: amount(input.income, "本期外部收入"),
    amounts: Object.fromEntries(reviewCategories.map(row => [row.id, amount(inputAmounts[row.id], row.name)])) as FinanceReview["amounts"],
    notes: Object.fromEntries(reviewCategories.map(row => [row.id, typeof inputNotes[row.id] === "string" ? inputNotes[row.id] : ""])),
    balances: Object.fromEntries(Object.entries(balanceLabels).map(([key, label]) => [key, amount(inputBalances[key], label, true)])) as ReviewBalances,
    summary: typeof input.summary === "string" ? input.summary : "", ...(budget ? {budget} : {})};
}
export function upsertFinanceReview(records: FinanceReview[], record: FinanceReview) {
  return [...records.filter(item => item.id !== record.id), record].sort((a, b) => b.end.localeCompare(a.end) || a.id.localeCompare(b.id));
}
export function parseFinanceReviews(value: unknown): FinanceReview[] {
  const input = object(value);
  const rows = Array.isArray(value) ? value : Array.isArray(input.records) ? input.records : input.type ? [input] : null;
  if (!rows) throw new Error("请选择周期复盘 JSON 文件");
  return rows.reduce<FinanceReview[]>((result, row) => upsertFinanceReview(result, parseFinanceReview(row)), []);
}
export function reviewTotals(record: FinanceReview) {
  const spending = sum(reviewCategories.filter(row => row.flow === "expense").map(row => record.amounts[row.id]));
  const assets = sum([record.balances.cash, record.balances.investments, record.balances.otherAssets]);
  return {income: record.income, spending, surplus: sum([record.income, -spending]), assets,
    netWorth: sum([assets, -record.balances.debt]), days: (dateValue(record.end).getTime() - dateValue(record.start).getTime()) / dayMs + 1};
}
export function analyzeFinanceReview(current: FinanceReview, records: FinanceReview[]) {
  const previous = records.filter(row => row.type === current.type && row.end < current.start).sort((a, b) => b.end.localeCompare(a.end))[0];
  const totals = reviewTotals(current);
  const prior = previous ? reviewTotals(previous) : null;
  const rows = reviewCategories.map(row => ({...row, amount: current.amounts[row.id], previous: previous?.amounts[row.id] ?? null,
    delta: previous ? sum([current.amounts[row.id], -previous.amounts[row.id]]) : null, note: current.notes[row.id] || ""}));
  const contiguous = previous ? dateValue(current.start).getTime() - dateValue(previous.end).getTime() === dayMs : false;
  const netWorthDelta = prior ? sum([totals.netWorth, -prior.netWorth]) : null;
  // A missing interval cannot be reconciled using just the current period's income and spending.
  const unexplained = contiguous && netWorthDelta !== null ? sum([netWorthDelta, -totals.surplus]) : null;
  const notices = ["投资基金填净投入，应急基金填净转入；二者不计消费。其他七项填实际净支出，不填充值或预算预留。"];
  if (!previous) notices.push("本期是首次基准，暂无上期变化；不会把缺失的上期当成 0。");
  else {
    if (!contiguous) notices.push("与上期之间有未覆盖日期；余额差值不等于本期变化，暂不做收支对账。");
    if (totals.days !== prior!.days) notices.push(`本期${totals.days}天，上期${prior!.days}天；比较总额时同时看日均支出。`);
  }
  if (current.end !== reviewPeriod(current.type, current.end).limit) notices.push("本周期尚未结束，报告是截至所选日期的阶段数据。");
  const actions: string[] = [];
  if (totals.surplus < 0) actions.push(`本期收支缺口${reviewMoney(-totals.surplus)}，结合发薪日与集中付款核对周转资金。`);
  const increase = rows.filter(row => row.flow === "expense" && (row.delta ?? 0) > 0).sort((a, b) => b.delta! - a.delta!)[0];
  if (increase) actions.push(`优先复核${increase.name}增加的${reviewMoney(increase.delta!)}${increase.note ? `，已记事项：${increase.note}` : "，补充发生事项后再判断是否调整预算"}。`);
  if (unexplained !== null && Math.abs(unexplained) >= 0.01) actions.push(`净资产与收支之间有${signed(unexplained)}待解释变化，核对投资涨跌、汇率、账户遗漏及口径，不能直接当作投资收益。`);
  if (actions.length === 0) actions.push(previous ? "按现有预算继续执行；下期先核对余额，再更新本期实际发生额。" : "核实本期余额和九类金额，作为下一次复盘基准。");
  const budgetRows = current.budget ? rows.map(row => ({...row, budget: current.budget!.amounts[row.id], remaining: sum([current.budget!.amounts[row.id], -row.amount])})) : [];
  const overDaily = budgetRows.filter(row => current.budget?.mode === "normal" && ["small", "daily"].includes(row.id) && row.remaining < 0);
  if (overDaily.length) actions.unshift(`本月${overDaily.map(row => `${row.name}超过预算${reviewMoney(-row.remaining)}`).join("、")}，核对实际明细，再调整下月额度或消费。`);
  if (current.budget) notices.push("预算为保存时的整月额度，不按天摊分；阶段月报的剩余额度不代表最终结余。消费基金跨月使用时结合历史余额判断，不把预留重复计消费。");
  if (current.budget?.mode === "trip") notices.push("出差预算已从补贴扣除海外开销；若实际收支按毛额录入，先拆分海外开销再核对预算，本表不据此自动判定日常超支。");
  return {previous, prior, totals, rows, budgetRows, contiguous, netWorthDelta, unexplained, notices, actions: actions.slice(0, 3)};
}
export function financeReviewReport(current: FinanceReview, records: FinanceReview[]) {
  const analysis = analyzeFinanceReview(current, records);
  const {previous, prior, totals, rows} = analysis;
  const cell = (text: string) => text.replace(/\|/g, "／").replace(/[\r\n]+/g, " ");
  return [
    `# ${reviewTypeNames[current.type]} · ${current.start} 至 ${current.end}`,
    previous ? `对比：${previous.start} 至 ${previous.end}` : "本期建立首次基准。", "",
    `收入 ${reviewMoney(totals.income)} · 实际消费 ${reviewMoney(totals.spending)} · 收支结余 ${reviewMoney(totals.surplus)}`,
    `期末净资产 ${reviewMoney(totals.netWorth)} · 较上期余额 ${signed(analysis.netWorthDelta)}`,
    `日均消费 ${reviewMoney(totals.spending / totals.days)}${prior ? `；上期 ${reviewMoney(prior.spending / prior.days)}` : ""}`, "",
    "| 项目 | 本期发生额 | 上期发生额 | 变化 | 本期事项 |", "|---|---:|---:|---:|---|",
    ...rows.map(row => `| ${row.name}${row.flow === "transfer" ? "（划拨）" : ""} | ${reviewMoney(row.amount)} | ${row.previous === null ? "无基准" : reviewMoney(row.previous)} | ${signed(row.delta)} | ${cell(row.note || "未填写事项")} |`), "",
    ...(current.budget ? [`## 月预算核对 · ${current.budget.mode === "normal" ? "普通月" : "出差月"}`, "| 项目 | 整月预算 | 本期金额 | 预算减本期 |", "|---|---:|---:|---:|", ...analysis.budgetRows.map(row => `| ${row.name} | ${reviewMoney(row.budget)} | ${reviewMoney(row.amount)} | ${reviewMoney(row.remaining)} |`), ""] : []),
    "| 期末余额 | 本期 | 上期 | 变化 |", "|---|---:|---:|---:|",
    ...Object.entries(balanceLabels).map(([key, label]) => {const field = key as keyof ReviewBalances; return `| ${label} | ${reviewMoney(current.balances[field])} | ${previous ? reviewMoney(previous.balances[field]) : "无基准"} | ${signed(previous ? sum([current.balances[field], -previous.balances[field]]) : null)} |`;}), "",
    ...(current.summary ? [`本期补充：${cell(current.summary)}`, ""] : []),
    "## 下期动作", ...analysis.actions.map(action => `- ${action}`), "",
    "## 数据口径", ...analysis.notices.map(note => `- ${note}`), "",
  ].join("\n");
}
export function aggregateFinanceReviews(records: FinanceReview[], type: "month" | "quarter", end: string): FinanceReview {
  const {start} = reviewPeriod(type, end);
  for (const sourceType of type === "quarter" ? ["month", "week"] : ["week"]) {
    const source = records.filter(row => row.type === sourceType && row.start >= start && row.end <= end).sort((a, b) => a.start.localeCompare(b.start));
    let next = start;
    let covered = source.length > 0;
    for (const row of source) {
      if (row.start !== next) covered = false;
      next = iso(new Date(dateValue(row.end).getTime() + dayMs));
    }
    if (!covered || next !== iso(new Date(dateValue(end).getTime() + dayMs))) continue;
    return parseFinanceReview({...newReviewDraft(type, end),
      income: sum(source.map(row => row.income)),
      amounts: Object.fromEntries(reviewCategories.map(category => [category.id, sum(source.map(row => row.amounts[category.id]))])),
      notes: Object.fromEntries(reviewCategories.map(category => [category.id, source.filter(row => row.notes[category.id]).map(row => `${row.start}：${row.notes[category.id]}`).join("；")])),
      balances: source[source.length - 1].balances, summary: `由 ${source.length} 条无重叠、连续覆盖的${sourceType === "week" ? "周" : "月"}记录汇总；期末余额取最后一期，不累加。`});
  }
  throw new Error("现有记录没有完整、连续覆盖该周期，或有跨月/跨季的周记录。请补填本周期实际汇总，不能按天摊分实际消费。");
}
