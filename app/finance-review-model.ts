export const reviewCategories = [
  {id: "rent", name: "房租", flow: "expense"},
  {id: "parents", name: "家用", flow: "expense"},
  {id: "investment", name: "投资基金", flow: "transfer"},
  {id: "emergency", name: "应急储备", flow: "transfer"},
  {id: "learning", name: "学习支出", flow: "expense"},
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
export type ReviewAccount = {
  id: string;
  name: string;
  type: string;
  purpose: string;
  balance: number;
  included: boolean;
  note: string;
};
export type ReviewAccountDraft = Omit<ReviewAccount, "balance"> & {balance: number | null};
export type ReviewHolding = {id:string; name:string; market:"A股"|"美股"|"港股"; currency:"CNY"|"USD"|"HKD"; cost:number; value:number; note?:string};
export type ReviewInvestments = {holdings:ReviewHolding[]; fxUsd:number; fxHkd:number};
export type ReviewGoal = {id:string; name:string; current:number};
export function reviewHoldingCny(row: ReviewHolding, fx: ReviewInvestments) {
  return Math.round(row.value * (row.currency === "USD" ? fx.fxUsd : row.currency === "HKD" ? fx.fxHkd : 1) * 100) / 100;
}
export function reviewInvestmentTotal(value: ReviewInvestments) {
  return value.holdings.reduce((total,row)=>total+Math.round(reviewHoldingCny(row,value)*100),0)/100;
}
export function compareReviewInvestments(current: FinanceReview, previous?: FinanceReview) {
  const now=current.investments, prior=previous?.investments;
  return [...new Set([...(now?.holdings ?? []).map(row=>row.id),...(prior?.holdings ?? []).map(row=>row.id)])].map(id=>{
    const a=now?.holdings.find(row=>row.id===id), b=prior?.holdings.find(row=>row.id===id);
    const value=a&&now ? reviewHoldingCny(a,now) : null, before=b&&prior ? reviewHoldingCny(b,prior) : null;
    return {id,name:a?.name ?? b!.name,current:value,previous:before,delta:value!==null&&before!==null ? Math.round((value-before)*100)/100 : null,note:a?.note ?? ""};
  });
}
export const reviewFocusLabels = {projects: "大花费项目", bills: "账单与订阅", balance: "资产负债明细"};
export type ReviewFocusKey = keyof typeof reviewFocusLabels;
export type ReviewFocusSource = {
  projects: Array<{id: string; name: string; target: number; current: number; dueDate: string}>;
  bills: Array<{id: string; name: string; amount: number; date: string; kind: string}>;
  assets: Array<{id: string; name: string; amount: number}>;
  debts: Array<{id: string; name: string; amount: number}>;
  holdings: number;
};
export type ReviewFocus = ReviewFocusSource & {
  checks: Record<ReviewFocusKey, boolean>;
  notes: Partial<Record<ReviewFocusKey, string>>;
};
export function newReviewFocus(source: ReviewFocusSource): ReviewFocus {
  return {projects: source.projects.map(row => ({...row})), bills: source.bills.map(row => ({...row})),
    assets: source.assets.map(row => ({...row})), debts: source.debts.map(row => ({...row})), holdings: source.holdings,
    checks: {projects: false, bills: false, balance: false}, notes: {}};
}
export function reviewFocusMatchesSource(focus: ReviewFocus, source: ReviewFocusSource) {
  return (["projects","bills","assets","debts","holdings"] as const).every(key => JSON.stringify(focus[key]) === JSON.stringify(source[key]));
}
export function syncReviewFocus(focus: ReviewFocus | undefined, source: ReviewFocusSource): ReviewFocus {
  if (!focus) return newReviewFocus(source);
  if (reviewFocusMatchesSource(focus, source)) return focus;
  const next = newReviewFocus(source);
  const same = (key: keyof ReviewFocusSource) => JSON.stringify(focus[key]) === JSON.stringify(source[key]);
  next.checks = {projects: same("projects") && focus.checks.projects, bills: same("bills") && focus.checks.bills,
    balance: same("assets") && same("debts") && same("holdings") && focus.checks.balance};
  next.notes = {...focus.notes};
  return next;
}
export type ReviewLedgerRow = {
  id:string; date:string; flow:"income" | "expense"; categoryId:string; amount:number; note:string; name:string;
  group:Exclude<ReviewCategory,"investment" | "emergency"> | "income" | "unassigned";
};
export type FinanceReview = {
  id: string;
  type: ReviewType;
  monthStartDay?: 1 | 10;
  start: string;
  end: string;
  savedAt: string;
  income: number;
  amounts: Record<ReviewCategory, number>;
  notes: Partial<Record<ReviewCategory, string>>;
  balances: ReviewBalances;
  summary: string;
  budget?: ReviewBudget;
  accounts?: ReviewAccount[];
  focus?: ReviewFocus;
  ledger?: ReviewLedgerRow[];
  incomeLedger?: ReviewLedgerRow[];
  investments?: ReviewInvestments;
  goals?: ReviewGoal[];
};
export type ReviewDraft = Omit<FinanceReview, "id" | "savedAt" | "income" | "amounts" | "balances" | "accounts"> & {
  income: number | null;
  amounts: Record<ReviewCategory, number | null>;
  balances: Record<keyof ReviewBalances, number | null>;
  accounts?: ReviewAccountDraft[];
};
const dayMs = 86400000;
const cents = (value: number) => Math.round((value + Number.EPSILON * Math.abs(value)) * 100);
const sum = (values: number[]) => values.reduce((total, value) => total + cents(value), 0) / 100;
export function reviewAccountCash(accounts: ReviewAccountDraft[]): number | null {
  if (accounts.some(row => row.balance === null || !Number.isFinite(row.balance) || row.balance < 0)) return null;
  return sum(accounts.filter(row => row.included).map(row => row.balance!));
}
export function withReviewAccounts(draft: ReviewDraft, source: Array<Pick<ReviewAccount, "id" | "name" | "type" | "purpose" | "balance"> & {includedInPersonal?:boolean}>, previous?: ReviewAccountDraft[]): ReviewDraft {
  const accounts = source.map(row => ({...row, included: row.includedInPersonal ?? previous?.find(item => item.id === row.id)?.included ?? true, note: ""}));
  return {...draft, accounts, balances: {...draft.balances, cash: reviewAccountCash(accounts)}};
}
export function compareReviewAccounts(current: FinanceReview, previous?: FinanceReview) {
  const currentRows = current.accounts ?? [];
  const previousRows = previous?.accounts ?? [];
  const ids = [...new Set([...currentRows.map(row => row.id), ...previousRows.map(row => row.id)])];
  return ids.map(id => {
    const now = currentRows.find(row => row.id === id);
    const before = previousRows.find(row => row.id === id);
    return {id, name: now?.name ?? before!.name, purpose: now?.purpose ?? before!.purpose,
      current: now?.balance ?? null, previous: before?.balance ?? null,
      delta: now && before ? sum([now.balance, -before.balance]) : null,
      included: now?.included ?? null, note: now?.note ?? "",
      status: !now ? "本期未记录" : !before ? "无上期账户基准" : now.included !== before.included ? "计入范围变化" : "同口径"};
  });
}
export const reviewMoney = (value: number) => new Intl.NumberFormat("zh-CN", {style: "currency", currency: "CNY", maximumFractionDigits: 2}).format(value);
const signed = (value: number | null) => value === null ? "无上期基准" : `${value > 0 ? "+" : ""}${reviewMoney(value)}`;
const iso = (date: Date) => date.toISOString().slice(0, 10);
function dateValue(value: unknown): Date {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error("日期须为 YYYY-MM-DD");
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || iso(date) !== value) throw new Error(`无效日期：${value}`);
  return date;
}
export function reviewToday(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit"}).format(now);
}
export function reviewDayDistance(target: string, base = reviewToday()): number | null {
  try {return (dateValue(target).getTime() - dateValue(base).getTime()) / dayMs;}
  catch {return null;}
}
export function reviewDeadlineLabel(target: string, base = reviewToday()) {
  const days = reviewDayDistance(target, base);
  return days === null ? "日期待补" : days < 0 ? `已过 ${-days} 天，待核实` : days === 0 ? "今天" : `${days} 天后`;
}
export function reviewPeriod(type: ReviewType, end: string, monthStartDay:1 | 10 = 1) {
  const date = dateValue(end);
  let start: Date;
  let limit: Date;
  if (type === "week") {
    start = new Date(date.getTime() - ((date.getUTCDay() + 6) % 7) * dayMs);
    limit = new Date(start.getTime() + 6 * dayMs);
  } else if (type === "month" && monthStartDay === 10) {
    const month = date.getUTCMonth() - (date.getUTCDate() < 10 ? 1 : 0);
    start = new Date(Date.UTC(date.getUTCFullYear(), month, 10));
    limit = new Date(Date.UTC(date.getUTCFullYear(), month + 1, 9));
  } else {
    const month = type === "quarter" ? Math.floor(date.getUTCMonth() / 3) * 3 : date.getUTCMonth();
    start = new Date(Date.UTC(date.getUTCFullYear(), month, 1));
    limit = new Date(Date.UTC(date.getUTCFullYear(), month + (type === "quarter" ? 3 : 1), 0));
  }
  return {start: iso(start), end, limit: iso(limit)};
}
export function newReviewDraft(type: ReviewType = "week", end = reviewToday(), monthStartDay:1 | 10 = 1): ReviewDraft {
  const {start} = reviewPeriod(type, end, monthStartDay);
  return {type, start, end, ...(type === "month" && monthStartDay === 10 ? {monthStartDay} : {}), income: null,
    amounts: Object.fromEntries(reviewCategories.map(row => [row.id, null])) as ReviewDraft["amounts"],
    notes: {}, balances: {cash: null, investments: null, otherAssets: null, debt: null}, summary: ""};
}
function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
function parseReviewFocus(value: unknown): ReviewFocus {
  const raw = object(value);
  const money = (value: unknown) => {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1e12) throw new Error("关键事项金额须为有效非负数");
    return cents(value) / 100;
  };
  const date = (value: unknown) => {if (value === "") return ""; dateValue(value); return value as string;};
  const rows = (value: unknown): Array<Record<string, unknown> & {id:string;name:string}> => {
    if (!Array.isArray(value)) throw new Error("关键事项明细须为列表");
    const ids = new Set<string>();
    return value.map(value => {
      const row = object(value);
      if (typeof row.id !== "string" || !row.id.trim() || ids.has(row.id) || typeof row.name !== "string" || !row.name.trim()) throw new Error("关键事项名称与唯一编号须完整");
      ids.add(row.id);
      return {...row, id: row.id, name: row.name};
    });
  };
  const rawChecks = object(raw.checks);
  const rawNotes = object(raw.notes);
  return {
    projects: rows(raw.projects).map(row => ({id: row.id, name: row.name, target: money(row.target), current: money(row.current), dueDate: date(row.dueDate)})),
    bills: rows(raw.bills).map(row => ({id: row.id, name: row.name, amount: money(row.amount), date: date(row.date), kind: typeof row.kind === "string" ? row.kind : ""})),
    assets: rows(raw.assets).map(row => ({id: row.id, name: row.name, amount: money(row.amount)})),
    debts: rows(raw.debts).map(row => ({id: row.id, name: row.name, amount: money(row.amount)})), holdings: money(raw.holdings),
    checks: Object.fromEntries(Object.keys(reviewFocusLabels).map(key => [key, rawChecks[key] === true])) as ReviewFocus["checks"],
    notes: Object.fromEntries(Object.keys(reviewFocusLabels).map(key => [key, typeof rawNotes[key] === "string" ? rawNotes[key] : ""])),
  };
}
export function parseFinanceReview(value: unknown): FinanceReview {
  const input = object(value);
  if (!["week", "month", "quarter"].includes(String(input.type))) throw new Error("请选择周、月或季度");
  const type = input.type as ReviewType;
  dateValue(input.start);
  dateValue(input.end);
  const start = input.start as string;
  const end = input.end as string;
  if (input.monthStartDay !== undefined && (type !== "month" || ![1,10].includes(Number(input.monthStartDay)) || typeof input.monthStartDay !== "number")) throw new Error("月度起算日须为1号或10号");
  const monthStartDay = input.monthStartDay === 10 ? 10 : 1;
  if (reviewPeriod(type, end, monthStartDay).start !== start || start > end) throw new Error("日期须从本周周一、所选月度起算日或本季度首日开始，不能跨周期");
  const amount = (value: unknown, label: string, nonnegative = false) => {
    if (typeof value !== "number" || !Number.isFinite(value) || Math.abs(value) > 1e12 || (nonnegative && value < 0)) {
      throw new Error(`请填写${label}；确实没有时填 0，空白不代表 0`);
    }
    return cents(value) / 100;
  };
  const inputAmounts = object(input.amounts);
  const inputNotes = object(input.notes);
  const inputBalances = object(input.balances);
  let accounts: ReviewAccount[] | undefined;
  if (input.accounts !== undefined) {
    if (!Array.isArray(input.accounts)) throw new Error("账户快照须为列表");
    const ids = new Set<string>();
    accounts = input.accounts.map(value => {
      const row = object(value);
      if (typeof row.id !== "string" || !row.id.trim() || ids.has(row.id) || typeof row.name !== "string" || !row.name.trim() || typeof row.included !== "boolean") throw new Error("账户快照名称、唯一编号及计入范围须完整");
      ids.add(row.id);
      return {id: row.id, name: row.name, type: typeof row.type === "string" ? row.type : "",
        purpose: typeof row.purpose === "string" ? row.purpose : "", included: row.included,
        balance: amount(row.balance, `${row.name}期末余额`, true), note: typeof row.note === "string" ? row.note : ""};
    });
    if (amount(inputBalances.cash, "现金及存款", true) !== reviewAccountCash(accounts)) throw new Error("现金及存款须与计入的账户余额合计一致");
  }
  let budget: ReviewBudget | undefined;
  if (input.budget !== undefined) {
    const supplied = object(input.budget);
    if (type !== "month" || !["normal", "trip"].includes(String(supplied.mode))) throw new Error("月度预算参考须注明普通月或出差月");
    const values = object(supplied.amounts);
    budget = {mode: supplied.mode as ReviewBudget["mode"], amounts: Object.fromEntries(reviewCategories.map(row => [row.id, amount(values[row.id], `${row.name}月预算`, true)])) as ReviewBudget["amounts"]};
  }
  const record:FinanceReview = {id: `${type}:${start}`, type, start, end,
    ...(type === "month" && monthStartDay === 10 ? {monthStartDay} : {}),
    savedAt: typeof input.savedAt === "string" && Number.isFinite(Date.parse(input.savedAt)) ? input.savedAt : new Date().toISOString(),
    income: amount(input.income, "本期外部收入"),
    amounts: Object.fromEntries(reviewCategories.map(row => [row.id, amount(inputAmounts[row.id], row.name)])) as FinanceReview["amounts"],
    notes: Object.fromEntries(reviewCategories.map(row => [row.id, typeof inputNotes[row.id] === "string" ? inputNotes[row.id] : ""])),
    balances: Object.fromEntries(Object.entries(balanceLabels).map(([key, label]) => [key, amount(inputBalances[key], label, true)])) as ReviewBalances,
    summary: typeof input.summary === "string" ? input.summary : "", ...(budget ? {budget} : {}), ...(accounts ? {accounts} : {}),
    ...(input.focus === undefined ? {} : {focus: parseReviewFocus(input.focus)})};
  if (input.investments !== undefined) {
    const raw=object(input.investments), ids=new Set<string>();
    if (!Array.isArray(raw.holdings)) throw new Error("投资明细须为列表");
    const fxUsd=amount(raw.fxUsd,"美元汇率",true), fxHkd=amount(raw.fxHkd,"港币汇率",true);
    if (fxUsd<=0 || fxHkd<=0) throw new Error("汇率须大于0");
    record.investments={fxUsd,fxHkd,holdings:raw.holdings.map(value=>{
      const row=object(value);
      if (typeof row.id!=="string" || !row.id || ids.has(row.id) || typeof row.name!=="string" || !row.name.trim() || !["A股","美股","港股"].includes(String(row.market)) || !["CNY","USD","HKD"].includes(String(row.currency))) throw new Error("投资账户名称、编号、市场及币种须完整且不重复");
      ids.add(row.id);
      return {id:row.id,name:row.name,market:row.market as ReviewHolding["market"],currency:row.currency as ReviewHolding["currency"],cost:amount(row.cost,"投资成本",true),value:amount(row.value,"投资期末金额",true),note:typeof row.note==="string"?row.note:""};
    })};
    if (reviewInvestmentTotal(record.investments)!==record.balances.investments) throw new Error("证券账户总资产须等于逐账户明细折人民币合计");
  }
  if (input.goals!==undefined) {
    const ids=new Set<string>();
    if (!Array.isArray(input.goals)) throw new Error("目标余额须为列表");
    record.goals=input.goals.map(value=>{
      const row=object(value);
      if (typeof row.id!=="string"||!row.id||ids.has(row.id)||typeof row.name!=="string") throw new Error("目标编号须完整且不重复");
      ids.add(row.id);return {id:row.id,name:row.name,current:amount(row.current,"目标余额",true)};
    });
  }
  function parseLedger(value:unknown) {
    if (!Array.isArray(value)) throw new Error("日期收支快照须为列表");
    const ids = new Set<string>();
    return value.map(value=> {
      const row = object(value);
      dateValue(row.date);
      if (typeof row.id!=="string" || !row.id || ids.has(row.id) || String(row.date)<start || String(row.date)>end) throw new Error("日期收支快照重复或不属于本期");
      ids.add(row.id);
      if ((row.flow!=="income" || row.group!=="income") && (row.flow!=="expense" || !reviewCategories.some(category=>category.flow==="expense"&&category.id===row.group))) throw new Error("日期收支快照分类未确认");
      if (row.flow === "income" && !["salary","otherIncome"].includes(String(row.categoryId))) throw new Error("收入明细须区分工资与其他到账");
      if (typeof row.name!=="string" || typeof row.categoryId!=="string") throw new Error("日期收支快照分类缺失");
      return {id:row.id,date:row.date as string,flow:row.flow as ReviewLedgerRow["flow"],group:row.group as ReviewLedgerRow["group"],categoryId:row.categoryId,name:row.name,amount:amount(row.amount,"明细金额"),note:typeof row.note==="string" ? row.note : ""};
    });
  }
  if (input.ledger !== undefined) {
    record.ledger = parseLedger(input.ledger);
    if (sum(record.ledger.filter(row=>row.group==="income").map(row=>row.amount))!==record.income || reviewCategories.filter(row=>row.flow==="expense").some(category=>sum(record.ledger!.filter(row=>row.group===category.id).map(row=>row.amount))!==record.amounts[category.id])) throw new Error("复盘收支与日期明细不一致，请重新带入或改为手填");
  }
  if (input.incomeLedger !== undefined) {
    const rows = parseLedger(input.incomeLedger);
    if (rows.some(row=>row.flow!=="income") || sum(rows.map(row=>row.amount))!==record.income) throw new Error("本期收入与收入日期明细不一致");
    if (record.ledger && JSON.stringify(rows) !== JSON.stringify(record.ledger.filter(row=>row.flow==="income"))) throw new Error("两份收入快照不一致，请重新核对");
    if (!record.ledger) record.incomeLedger = rows;
  }
  return record;
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
export function latestWeeklyReview(records: FinanceReview[]) {
  return records.filter(record => record.type === "week")
    .sort((a, b) => b.end.localeCompare(a.end) || b.savedAt.localeCompare(a.savedAt))[0];
}
export type DailyCashAccount = {id:string;name:string;purpose:string;balance:number;included?:boolean;includedInPersonal?:boolean;liquid?:boolean};
export function dailyFlexibleCash(accounts:DailyCashAccount[] = []) {
  const rows=accounts.filter(row=>{
    if(row.included===false || row.includedInPersonal===false || row.liquid===false)return false;
    const text=`${row.name} ${row.purpose}`;
    return /工资主账户|日常使用|小额支付|日常零钱/.test(text) && !/投资|证券|股票|应急|学习|旅游|旅行|父母|伴侣/.test(text);
  });
  return {rows,total:rows.length ? sum(rows.map(row=>row.balance)) : null};
}
export function dailyFlexibleCashChange(accounts:DailyCashAccount[],previous?:DailyCashAccount[]) {
  const current=dailyFlexibleCash(accounts),prior=dailyFlexibleCash(previous);
  const comparable=current.total!==null && prior.total!==null && current.rows.length===prior.rows.length && current.rows.every(row=>prior.rows.some(old=>old.id===row.id));
  return {...current,delta:comparable ? sum([current.total!,-prior.total!]) : null};
}
export function reviewIncomeRows(record:Pick<FinanceReview,"ledger" | "incomeLedger">) {
  return (record.ledger ?? record.incomeLedger)?.filter(row=>row.flow==="income");
}
export function overviewWeeklyTrend(records:FinanceReview[]) {
  const weeks = new Map<string,FinanceReview>();
  for (const record of records.filter(row=>row.type==="week")) {
    const previous=weeks.get(record.start);
    if(!previous || record.savedAt>previous.savedAt || (record.savedAt===previous.savedAt && record.end>previous.end)) weeks.set(record.start,record);
  }
  const ordered=[...weeks.values()].sort((a,b)=>a.start.localeCompare(b.start));
  const rows=ordered.map((record,index)=>{
    const totals=reviewTotals(record), previous=ordered[index-1];
    const prior=previous ? reviewTotals(previous) : undefined;
    const adjacent=previous && reviewDayDistance(record.start,previous.start)===7;
    const comparable=adjacent && prior?.days===totals.days;
    return {record,...totals,comparison:!previous ? "首次基准" : !adjacent ? "中间缺周" : !comparable ? "天数不同" : "较上周",
      changes:comparable ? {income:sum([totals.income,-prior!.income]),spending:sum([totals.spending,-prior!.spending]),surplus:sum([totals.surplus,-prior!.surplus])} : null};
  });
  const latest=ordered.at(-1);
  if(!latest)return {rows,month:null};
  const cycle=reviewPeriod("month",latest.end,10);
  let income=0,coveredDays=0,boundaryMissing=false;
  for(const record of ordered.filter(row=>row.end>=cycle.start && row.start<=cycle.end)) {
    const start=record.start>cycle.start ? record.start : cycle.start;
    const end=record.end<cycle.end ? record.end : cycle.end;
    if(record.start>=cycle.start && record.end<=cycle.end) {
      income=sum([income,record.income]);
      coveredDays+=reviewDayDistance(end,start)!+1;
    } else {
      const dated=reviewIncomeRows(record);
      if(dated) {
        income=sum([income,...dated.filter(row=>row.date>=start&&row.date<=end).map(row=>row.amount)]);
        coveredDays+=reviewDayDistance(end,start)!+1;
      } else boundaryMissing=true;
    }
  }
  return {rows,month:{...cycle,income,coveredDays,days:reviewDayDistance(cycle.end,cycle.start)!+1,boundaryMissing}};
}
export function weeklyLedgerTotals(rows:Array<Pick<ReviewLedgerRow,"date" | "flow" | "categoryId" | "amount">>, start:string, end:string) {
  dateValue(start); dateValue(end);
  const result:Array<{start:string;end:string;days:number;count:number;salary:number;other:number;spending:number;surplus:number;surplusDelta:number|null}> = [];
  for (let cursor=start;cursor<=end;) {
    const limit = reviewPeriod("week",cursor).limit;
    const last = limit<end ? limit : end;
    const selected = rows.filter(row=>row.date>=cursor&&row.date<=last);
    const salary = sum(selected.filter(row=>row.flow==="income"&&row.categoryId==="salary").map(row=>row.amount));
    const other = sum(selected.filter(row=>row.flow==="income"&&row.categoryId==="otherIncome").map(row=>row.amount));
    const spending = sum(selected.filter(row=>row.flow==="expense").map(row=>row.amount));
    const surplus = sum([salary,other,-spending]);
    const days = (dateValue(last).getTime()-dateValue(cursor).getTime())/dayMs+1;
    const previous = result.at(-1);
    result.push({start:cursor,end:last,days,count:selected.length,salary,other,spending,surplus,surplusDelta:previous&&previous.count&&selected.length&&previous.days===days ? sum([surplus,-previous.surplus]) : null});
    cursor = iso(new Date(dateValue(last).getTime()+dayMs));
  }
  return result;
}
function focusItemChanges<T extends {id: string; name: string}>(current: T[], previous: T[], fields: Array<[keyof T, string]>) {
  const format = (value: T[keyof T]) => typeof value === "number" ? reviewMoney(value) : String(value || "未填写");
  const changes = current.flatMap(row => {
    const old = previous.find(item => item.id === row.id);
    if (!old) return [`新增登记：${row.name}`];
    const changed = fields.filter(([key]) => row[key] !== old[key]).map(([key,label]) => `${label} ${format(old[key])} → ${format(row[key])}`);
    if (row.name !== old.name) changed.unshift(`名称 ${old.name} → ${row.name}`);
    return changed.length ? [`${row.name}：${changed.join("，")}`] : [];
  });
  return [...changes, ...previous.filter(row => !current.some(item => item.id === row.id)).map(row => `${row.name}：已移出本期清单，处理状态待确认`)];
}
export function reviewHighlights(current: FinanceReview, previous?: FinanceReview) {
  const totals = reviewTotals(current);
  const prior = previous ? reviewTotals(previous) : null;
  const focus = current.focus;
  const before = previous?.focus;
  const delta = (value: number, old?: number) => old === undefined ? "无上期基准" : `较上期 ${signed(sum([value, -old]))}`;
  const daysUntil = (date: string) => date ? (dateValue(date).getTime() - dateValue(current.end).getTime()) / dayMs : null;
  const projectGap = (rows: ReviewFocusSource["projects"]) => sum(rows.map(row => Math.max(0, sum([row.target, -row.current]))));
  const changes = {
    projects: focus?.checks.projects && before?.checks.projects ? focusItemChanges(focus.projects, before.projects, [["target","目标"],["current","实际"],["dueDate","截止日期"]]) : [],
    bills: focus?.checks.bills && before?.checks.bills ? focusItemChanges(focus.bills, before.bills, [["amount","登记金额"],["date","提醒日期"],["kind","类型"]]) : [],
    balance: focus?.checks.balance && before?.checks.balance ? [
      ...focusItemChanges(focus.assets,before.assets,[["amount","补录资产"]]),
      ...focusItemChanges(focus.debts,before.debts,[["amount","负债余额"]]),
      ...(focus.holdings !== before.holdings ? [`持仓参考市值：${delta(focus.holdings,before.holdings)}（不直接视为投资收益）`] : []),
    ] : [],
  };
  const upcomingProjects = (focus?.projects ?? []).filter(row => row.target > row.current && daysUntil(row.dueDate) !== null && daysUntil(row.dueDate)! >= 0 && daysUntil(row.dueDate)! <= 30).sort((a,b) => a.dueDate.localeCompare(b.dueDate));
  const oldProjects = (focus?.projects ?? []).filter(row => daysUntil(row.dueDate) !== null && daysUntil(row.dueDate)! < 0);
  const upcomingBills = (focus?.bills ?? []).filter(row => daysUntil(row.date) !== null && daysUntil(row.date)! >= 0 && daysUntil(row.date)! <= 7).sort((a,b) => a.date.localeCompare(b.date));
  const oldBills = (focus?.bills ?? []).filter(row => daysUntil(row.date) !== null && daysUntil(row.date)! < 0);
  const state = (key: ReviewFocusKey) => !focus ? "未提供" : !focus.checks[key] ? "待核对" : !before?.checks[key] ? "首次基准" : changes[key].length ? `${changes[key].length} 项变化` : "登记未变";
  const baseline = (key: ReviewFocusKey) => !focus ? "本期没有这项快照，不按 0 或没有变化处理。" : !focus.checks[key] ? "带入的登记数据尚未核对，不能据此确认本期变化。" : !before?.checks[key] ? "暂无已核对的上期明细，仅建立本期基准。" : "";
  const expenseChanges = reviewCategories.filter(row => row.flow === "expense").map(row => ({name:row.name,delta:previous ? sum([current.amounts[row.id],-previous.amounts[row.id]]) : 0})).filter(row => row.delta !== 0).sort((a,b) => Math.abs(b.delta)-Math.abs(a.delta));
  const debtTotal = focus ? sum(focus.debts.map(row => row.amount)) : null;
  const details = (items: string[]) => items.filter(Boolean);
  const highlights = [
    {id:"flows", title:"收入与支出", state:prior ? prior.days !== totals.days ? `本期 ${totals.days} 天 / 上期 ${prior.days} 天` : "本期对比" : "首次基准",
      summary:`收入 ${reviewMoney(totals.income)}（${delta(totals.income,prior?.income)}）；消费 ${reviewMoney(totals.spending)}（${delta(totals.spending,prior?.spending)}）；结余 ${reviewMoney(totals.surplus)}。`,
      details:details([...(reviewIncomeRows(current) ?? []).map(row=>`${row.date} ${row.categoryId === "salary" ? "工资到账" : "其他收入"} ${reviewMoney(row.amount)}${row.note ? `：${row.note}` : ""}`), ...(expenseChanges.slice(0,2).map(row => `${row.name} ${signed(row.delta)}`)), prior && prior.days !== totals.days ? `本期 ${totals.days} 天 / 上期 ${prior.days} 天；日均消费 ${reviewMoney(totals.spending/totals.days)} / ${reviewMoney(prior.spending/prior.days)}，总额不直接代表消费强度。` : ""])},
    {id:"projects", title:"大花费项目", state:state("projects"),
      summary:focus?.checks.projects ? `${focus.projects.length} 项，资金缺口 ${reviewMoney(projectGap(focus.projects))}（${delta(projectGap(focus.projects),before?.checks.projects ? projectGap(before.projects) : undefined)}）；未来 30 天 ${upcomingProjects.length} 项待筹资。` : baseline("projects"),
      details:details([baseline("projects"), ...changes.projects,
        ...upcomingProjects.slice(0,2).map(row => `${row.name} · ${row.dueDate} · 缺口 ${reviewMoney(Math.max(0,sum([row.target,-row.current])))}`),
        oldProjects.length ? `${oldProjects.length} 项日期已过：${oldProjects.slice(0,2).map(row=>row.name).join("、")}；需核实是否完成、取消或延期，不直接认定欠款。` : "",
        focus?.projects.some(row=>!row.dueDate) ? "有项目尚未填写截止日期，暂不能判断其资金准备期限。" : "",focus?.notes.projects ?? ""])},
    {id:"bills", title:"账单与订阅", state:state("bills"),
      summary:focus?.checks.bills ? `${focus.bills.length} 项登记，未来 7 天 ${upcomingBills.length} 项到期提醒，登记金额 ${reviewMoney(sum(upcomingBills.map(row => row.amount)))}。` : baseline("bills"),
      details:details([baseline("bills"),...changes.bills,...upcomingBills.slice(0,2).map(row=>`${row.name} · ${row.date} · ${reviewMoney(row.amount)} · ${row.kind}`),
        oldBills.length ? `${oldBills.length} 项提醒日期已过，支付、续费或取消状态待核实。` : "",focus?.bills.some(row=>!row.date) ? "有账单尚未填写提醒日期，暂未计入近期到期提醒。" : "", "提醒金额不是已支付消费；未登记订阅不在本次清单内。",focus?.notes.bills ?? ""])},
    {id:"balance", title:"资产与负债", state:prior && (prior.assets !== totals.assets || previous?.balances.debt !== current.balances.debt) ? "余额变化" : focus?.checks.balance ? state("balance") : "明细待核对",
      summary:`个人资产 ${reviewMoney(totals.assets)}（${delta(totals.assets,prior?.assets)}）；负债 ${reviewMoney(current.balances.debt)}（${delta(current.balances.debt,previous?.balances.debt)}）；净资产 ${delta(totals.netWorth,prior?.netWorth)}。`,
      details:details([baseline("balance"),...changes.balance,
        focus?.checks.balance && debtTotal !== current.balances.debt ? `登记负债 ${reviewMoney(debtTotal!)} 与填写的个人负债 ${reviewMoney(current.balances.debt)} 不一致，需核对遗漏或口径。` : "", focus?.notes.balance ?? ""])},
  ];
  const actions = [];
  if (focus?.checks.bills && upcomingBills[0]) actions.push(`核对 ${upcomingBills[0].date} 的“${upcomingBills[0].name}”提醒（${reviewMoney(upcomingBills[0].amount)}），确认是否需要付款、续费或处理到期事项。`);
  if (focus?.checks.projects && upcomingProjects[0]) actions.push(`“${upcomingProjects[0].name}”截至 ${upcomingProjects[0].dueDate} 尚有 ${reviewMoney(Math.max(0,sum([upcomingProjects[0].target,-upcomingProjects[0].current])))} 资金缺口，确定补足或调整计划。`);
  if (focus?.checks.balance && debtTotal !== current.balances.debt) actions.push("先核对资产负债表与本期负债合计的差异，避免遗漏借款或重复记录。");
  if ((focus?.checks.projects && oldProjects.length) || (focus?.checks.bills && oldBills.length)) actions.push("清理已过日期的项目与提醒，确认完成、支付或延期状态；不要直接当作欠款。");
  return {highlights, actions};
}
export function analyzeFinanceReview(current: FinanceReview, records: FinanceReview[]) {
  const previous = records.filter(row => row.type === current.type && (current.type!=="month" || (row.monthStartDay ?? 1)===(current.monthStartDay ?? 1)) && row.end < current.start).sort((a, b) => b.end.localeCompare(a.end))[0];
  const totals = reviewTotals(current);
  const prior = previous ? reviewTotals(previous) : null;
  const rows = reviewCategories.map(row => ({...row, amount: current.amounts[row.id], previous: previous?.amounts[row.id] ?? null,
    delta: previous ? sum([current.amounts[row.id], -previous.amounts[row.id]]) : null,
    note: current.notes[row.id] || (current.ledger ?? []).filter(entry=>entry.group===row.id&&entry.note.trim()).map(entry=>`${entry.date} ${entry.name} ${reviewMoney(entry.amount)}：${entry.note}`).join("；")}));
  const contiguous = previous ? dateValue(current.start).getTime() - dateValue(previous.end).getTime() === dayMs : false;
  const netWorthDelta = prior ? sum([totals.netWorth, -prior.netWorth]) : null;
  // A missing interval cannot be reconciled using just the current period's income and spending.
  const unexplained = contiguous && netWorthDelta !== null ? sum([netWorthDelta, -totals.surplus]) : null;
  const notices = ["投资基金填净投入，应急基金填净转入；二者不计消费。其他七项填实际净支出，不填充值或预算预留。"];
  if (current.ledger) notices.push("收支来自保存时核对的日期明细快照，不含未标日期的月度余额；后续账本修改不自动改写本报告。");
  const accountRows = compareReviewAccounts(current, previous);
  if (current.accounts) notices.push("账户余额按复盘时的快照比较；余额变化本身不等于消费，具体原因以本期变动说明和账单为准。账户计入范围变化须另行核对。");
  notices.push("预算中的应急&学习金合并展示；复盘仍区分应急净转入与学习实际消费，学习用途据备注判断。");
  if (!previous) notices.push("本期是首次基准，暂无上期变化；不会把缺失的上期当成 0。");
  else {
    if (!contiguous) notices.push("与上期之间有未覆盖日期；余额差值不等于本期变化，暂不做收支对账。");
    if (totals.days !== prior!.days) notices.push(`本期${totals.days}天，上期${prior!.days}天；比较总额时同时看日均支出。`);
  }
  if (current.type === "month") notices.push(current.monthStartDay === 10 ? "月度账期为每月10日至下月9日；与自然月报告分别比较，10号只归新账期。" : "本报告沿用自然月口径，不与10号账期混合比较。");
  if (current.end !== reviewPeriod(current.type, current.end, current.monthStartDay).limit) notices.push("本周期尚未结束，报告是截至所选日期的阶段数据。");
  const focusAnalysis = reviewHighlights(current, previous);
  if (current.focus) notices.push("关键事项为保存时的登记快照，不与账户或净资产重复相加；项目预留及提醒金额不记为本期消费。未核对的快照不作为已确认变化。");
  const actions: string[] = [];
  if (totals.surplus < 0) actions.push(`本期收支缺口${reviewMoney(-totals.surplus)}，结合发薪日与集中付款核对周转资金。`);
  if (unexplained !== null && Math.abs(unexplained) >= 0.01) actions.push(`净资产与收支之间有${signed(unexplained)}待解释变化，核对投资涨跌、汇率、账户遗漏及口径，不能直接当作投资收益。`);
  actions.push(...focusAnalysis.actions);
  const increase = rows.filter(row => row.flow === "expense" && (row.delta ?? 0) > 0).sort((a, b) => b.delta! - a.delta!)[0];
  if (increase) actions.push(`优先复核${increase.name}增加的${reviewMoney(increase.delta!)}${increase.note ? `，已记事项：${increase.note}` : "，补充发生事项后再判断是否调整预算"}。`);
  if (actions.length === 0) actions.push(previous ? "按现有预算继续执行；下期先核对余额，再更新本期实际发生额。" : "核实本期余额和九类金额，作为下一次复盘基准。");
  const budgetRows = current.budget ? rows.map(row => ({...row, budget: current.budget!.amounts[row.id], remaining: sum([current.budget!.amounts[row.id], -row.amount])})) : [];
  const overDaily = budgetRows.filter(row => current.budget?.mode === "normal" && ["small", "daily"].includes(row.id) && row.remaining < 0);
  if (overDaily.length) actions.unshift(`本月${overDaily.map(row => `${row.name}超过预算${reviewMoney(-row.remaining)}`).join("、")}，核对实际明细，再调整下月额度或消费。`);
  if (current.budget) notices.push("预算为保存时的完整月度周期额度，不按天摊分；阶段月报的剩余额度不代表最终结余。消费基金跨月使用时结合历史余额判断，不把预留重复计消费。");
  if (current.budget?.mode === "trip") notices.push("出差预算已从补贴扣除海外开销；若实际收支按毛额录入，先拆分海外开销再核对预算，本表不据此自动判定日常超支。");
  return {previous, prior, totals, rows, highlights:focusAnalysis.highlights, accountRows, budgetRows, contiguous, netWorthDelta, unexplained, notices, actions: actions.slice(0, 3)};
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
    ...(current.ledger ? ["## 日期收支快照", "仅按本期日期汇总已核对的实际收支；月度未标日期金额、股票浮盈、自有账户划拨不计入。",
      "| 日期 | 收支 | 分类 | 金额 | 事项 / 用途 |", "|---|---|---|---:|---|", ...current.ledger.map(row=>`| ${row.date} | ${row.flow === "income" ? "收入" : "支出"} | ${cell(row.name)} | ${reviewMoney(row.amount)} | ${cell(row.note || "未填写")} |`), ""] : []),
    ...(current.incomeLedger ? ["## 收入到账快照", "| 日期 | 类型 | 金额 | 事项 |", "|---|---|---:|---|", ...current.incomeLedger.map(row=>`| ${row.date} | ${row.categoryId === "salary" ? "工资到账" : "其他收入"} | ${reviewMoney(row.amount)} | ${cell(row.note || "未填写")} |`), ""] : []),
    "## 本期关键变化", ...analysis.highlights.flatMap(row => [`### ${row.title} · ${row.state}`, row.summary, ...row.details.map(detail=>`- ${cell(detail)}`), ""]),
    "| 项目 | 本期发生额 | 上期发生额 | 变化 | 本期事项 |", "|---|---:|---:|---:|---|",
    ...rows.map(row => `| ${row.name}${row.flow === "transfer" ? "（划拨）" : ""} | ${reviewMoney(row.amount)} | ${row.previous === null ? "无基准" : reviewMoney(row.previous)} | ${signed(row.delta)} | ${cell(row.note || "未填写事项")} |`), "",
    ...(current.budget ? [`## 月预算核对 · ${current.budget.mode === "normal" ? "普通月" : "出差月"}`, "| 项目 | 整月预算 | 本期金额 | 预算减本期 |", "|---|---:|---:|---:|", ...analysis.budgetRows.map(row => `| ${row.name} | ${reviewMoney(row.budget)} | ${reviewMoney(row.amount)} | ${reviewMoney(row.remaining)} |`), ""] : []),
    "| 期末余额 | 本期 | 上期 | 变化 |", "|---|---:|---:|---:|",
    ...Object.entries(balanceLabels).map(([key, label]) => {const field = key as keyof ReviewBalances; return `| ${label} | ${reviewMoney(current.balances[field])} | ${previous ? reviewMoney(previous.balances[field]) : "无基准"} | ${signed(previous ? sum([current.balances[field], -previous.balances[field]]) : null)} |`;}), "",
    ...(analysis.accountRows.length ? ["## 账户余额对比", "| 账户 | 本期期末 | 上期期末 | 余额变化 | 计入个人现金 | 本期说明 |", "|---|---:|---:|---:|---|---|",
      ...analysis.accountRows.map(row => `| ${cell(row.name)} | ${row.current === null ? "未记录" : reviewMoney(row.current)} | ${row.previous === null ? "无基准" : reviewMoney(row.previous)} | ${signed(row.delta)} | ${row.included === null ? "未记录" : row.included ? "是" : "否"} | ${cell([row.status, row.note].filter(Boolean).join("；"))} |`), ""] : []),
    ...(current.investments ? ["## 逐账户投资变化（人民币）", "余额变化包含净投入、市值和汇率变化，不直接等于投资收益。", "| 账户 | 本期 | 上期 | 余额变化 | 说明 |", "|---|---:|---:|---:|---|", ...compareReviewInvestments(current,previous).map(row=>`| ${cell(row.name)} | ${row.current===null?"未记录":reviewMoney(row.current)} | ${row.previous===null?"无基准":reviewMoney(row.previous)} | ${signed(row.delta)} | ${cell(row.note)} |`), ""] : []),
    ...(current.summary ? [`本期补充：${cell(current.summary)}`, ""] : []),
    "## 学习用途", `本期学习净支出 ${reviewMoney(current.amounts.learning)}；${cell(rows.find(row=>row.id==="learning")?.note || "未填写学习事项，暂不能判断学了什么。")}`, "",
    "## 下期动作", ...analysis.actions.map(action => `- ${action}`), "",
    "## 数据口径", ...analysis.notices.map(note => `- ${note}`), "",
  ].join("\n");
}
export function aggregateFinanceReviews(records: FinanceReview[], type: "month" | "quarter", end: string, monthStartDay:1 | 10 = 1): FinanceReview {
  const {start} = reviewPeriod(type, end, monthStartDay);
  for (const sourceType of type === "quarter" ? ["month", "week"] : ["week"]) {
    const source = records.filter(row => row.type === sourceType && (sourceType!=="month" || (row.monthStartDay ?? 1)===1) && row.start >= start && row.end <= end).sort((a, b) => a.start.localeCompare(b.start));
    let next = start;
    let covered = source.length > 0;
    for (const row of source) {
      if (row.start !== next) covered = false;
      next = iso(new Date(dateValue(row.end).getTime() + dayMs));
    }
    if (!covered || next !== iso(new Date(dateValue(end).getTime() + dayMs))) continue;
    return parseFinanceReview({...newReviewDraft(type, end, monthStartDay),
      income: sum(source.map(row => row.income)),
      amounts: Object.fromEntries(reviewCategories.map(category => [category.id, sum(source.map(row => row.amounts[category.id]))])),
      notes: Object.fromEntries(reviewCategories.map(category => [category.id, source.filter(row => row.notes[category.id]).map(row => `${row.start}：${row.notes[category.id]}`).join("；")])),
      balances: source[source.length - 1].balances, accounts: source[source.length - 1].accounts,
      focus: source[source.length - 1].focus,
      investments: source[source.length - 1].investments, goals: source[source.length - 1].goals,
      ...(source.every(row=>row.ledger) ? {ledger:source.flatMap(row=>row.ledger!)} : {}),
      ...(!source.every(row=>row.ledger) && source.every(row=>reviewIncomeRows(row)) ? {incomeLedger:source.flatMap(row=>reviewIncomeRows(row)!)} : {}),
      summary: `由 ${source.length} 条无重叠、连续覆盖的${sourceType === "week" ? "周" : "月"}记录汇总；期末余额及账户快照取最后一期，不累加。`});
  }
  throw new Error("现有记录没有完整、连续覆盖该周期，或有跨月/跨季的周记录。请补填本周期实际汇总，不能按天摊分实际消费。");
}
