"use client";

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";

type Period = "周" | "月" | "季" | "年";
type Tone = "blue" | "green" | "amber" | "red" | "violet";
type ModuleId =
  | "income"
  | "spending"
  | "cashflow"
  | "accounts"
  | "budget"
  | "investment"
  | "balance"
  | "emergency"
  | "reminders"
  | "goals"
  | "reports"
  | "health"
  | "future";

type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  purpose: string;
  liquid: boolean;
};

type Budget = {
  id: string;
  name: string;
  plan: number;
  actual: number;
  required: boolean;
  fixed: boolean;
};

type MonthRecord = {
  id: string;
  label: string;
  salary: number;
  payday: number;
  stockIncome: number;
  otherIncome: number;
  budgets: Budget[];
};

type Holding = {
  id: string;
  name: string;
  market: "A股" | "美股" | "港股";
  cost: number;
  value: number;
  currency: "CNY" | "USD" | "HKD";
};

type Reminder = {
  id: string;
  name: string;
  date: string;
  amount: number;
  kind: string;
};

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  monthly: number;
  actualMonthly: number;
};

type FutureCapability = {
  id: string;
  name: string;
  score: number;
};

type Liability = {
  id: string;
  name: string;
  amount: number;
};

type BalanceAsset = {
  id: string;
  name: string;
  amount: number;
  note: string;
};

type CashflowDirection = "inflow" | "outflow";

type CashflowBuiltinId =
  | "salary"
  | "spendingPlan"
  | "travelSaving"
  | "learningSaving"
  | "partnerSaving"
  | "emergencyFund"
  | "aSharePlan"
  | "usSharePlan"
  | "hkSharePlan";

type CashflowCustomItem = {
  id: string;
  name: string;
  amount: number;
  direction: CashflowDirection;
};

type CashflowTableRow = {
  id: string;
  name: string;
  amount: number;
  direction: CashflowDirection;
  source: string;
  builtinId?: CashflowBuiltinId;
  readonlyAmount?: boolean;
  summaryOnly?: boolean;
  onNameChange?: (value: string) => void;
  onAmountChange?: (value: number) => void;
  onDirectionChange?: (value: CashflowDirection) => void;
  onDelete?: () => void;
};

type ReportRow = {
  id: string;
  name: string;
  amount: number;
  flow: string;
  source: string;
};

type PersistedFinanceData = {
  monthlyRecords: MonthRecord[];
  accounts: Account[];
  holdings: Holding[];
  fxUsd: number;
  fxHkd: number;
  aSharePlan: number;
  usSharePlan: number;
  hkSharePlan: number;
  travelSaving: number;
  learningSaving: number;
  emergencyFund: number;
  emergencyMonths: number;
  emergencyMonthlyNeed: number;
  balanceAssets: BalanceAsset[];
  liabilities: Liability[];
  houseDebt?: number;
  carDebt?: number;
  otherDebt?: number;
  reminders: Reminder[];
  goals: Goal[];
  futureCapabilities: FutureCapability[];
  cashflowHiddenBuiltinIds: CashflowBuiltinId[];
  cashflowCustomItems: CashflowCustomItem[];
};

type ChartDatum = {
  label: string;
  value: number;
  color?: string;
  detail?: string;
  max?: number;
};

type LinePoint = {
  label: string;
  value: number;
};

type CashflowEvent = {
  date: string;
  item: string;
  inflow: number;
  outflow: number;
  balance: number;
  kind: string;
};

type WaterfallDatum = {
  label: string;
  value: number;
  kind: "start" | "positive" | "negative" | "end";
  color?: string;
};

type MatrixPoint = {
  label: string;
  x: number;
  y: number;
  value: string;
  color?: string;
};

type ScatterPoint = {
  label: string;
  x: number;
  y: number;
  value: string;
  color?: string;
};

type GoalKind = "travel" | "learning" | "partner" | "emergency" | "other";

const palette = ["#1f5fbf", "#07835f", "#b7791f", "#6852bd", "#c53030", "#2b6cb0", "#0f766e", "#805ad5"];
const today = new Date("2026-06-14T00:00:00+08:00");

const initialAccounts: Account[] = [
  { id: "icbc2616", name: "工行 2616", type: "银行卡", balance: 1479.79, purpose: "工资主账户", liquid: true },
  { id: "yu-ebao-3034", name: "余额宝 - 3034", type: "支付宝", balance: 6709.62, purpose: "旅游/余额宝", liquid: true },
  { id: "yu-ebao-8514", name: "余额宝 - 8514", type: "支付宝", balance: 5000, purpose: "去A股", liquid: true },
  { id: "wechat-3034", name: "微信 - 3034", type: "微信", balance: 0, purpose: "日常零钱", liquid: true },
  { id: "cash", name: "现金", type: "现金", balance: 0, purpose: "备用", liquid: true },
  { id: "wechat-8514", name: "微信 - 8514", type: "微信", balance: 0, purpose: "待填写用途", liquid: true },
  { id: "icbc7768", name: "工行7768", type: "银行卡", balance: 0, purpose: "储蓄", liquid: true },
  { id: "icbc8615", name: "工行8615", type: "银行卡", balance: 0, purpose: "储蓄", liquid: true },
  { id: "boc8292", name: "中国银行8292", type: "银行卡", balance: 4389.26, purpose: "去美股", liquid: true },
  { id: "cmb", name: "招商银行", type: "银行卡", balance: 0, purpose: "储蓄", liquid: true },
];

const initialBudgets: Budget[] = [
  { id: "rent", name: "房租", plan: 1800, actual: 1800, required: true, fixed: true },
  { id: "food", name: "吃饭", plan: 900, actual: 620, required: true, fixed: false },
  { id: "transport", name: "交通", plan: 300, actual: 180, required: true, fixed: false },
  { id: "phone", name: "话费", plan: 120, actual: 120, required: true, fixed: true },
  { id: "sub", name: "订阅", plan: 160, actual: 98, required: false, fixed: true },
  { id: "daily", name: "日用品", plan: 350, actual: 210, required: true, fixed: false },
  { id: "snack", name: "零食", plan: 180, actual: 110, required: false, fixed: false },
  { id: "fun", name: "娱乐", plan: 290, actual: 150, required: false, fixed: false },
  { id: "parents", name: "孝敬父母", plan: 400, actual: 400, required: true, fixed: true },
];

function monthBudgets(actualOverrides: Record<string, number> = {}) {
  return initialBudgets.map((item) => ({
    ...item,
    actual: actualOverrides[item.id] ?? 0,
  }));
}

const initialMonthRecords: MonthRecord[] = [
  {
    id: "2026-06",
    label: "2026年6月",
    salary: 15000,
    payday: 10,
    stockIncome: 0,
    otherIncome: 0,
    budgets: initialBudgets.map((item) => ({ ...item })),
  },
  { id: "2026-07", label: "2026年7月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-08", label: "2026年8月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-09", label: "2026年9月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-10", label: "2026年10月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-11", label: "2026年11月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-12", label: "2026年12月", salary: 15000, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
];

const initialHoldings: Holding[] = [
  { id: "ashare", name: "A股组合", market: "A股", cost: 16500, value: 18500, currency: "CNY" },
  { id: "us", name: "美股组合", market: "美股", cost: 1200, value: 1280, currency: "USD" },
  { id: "hk", name: "港股组合", market: "港股", cost: 0, value: 0, currency: "HKD" },
];

const initialLiabilities: Liability[] = [
  { id: "house-debt", name: "房子负债", amount: 0 },
  { id: "car-debt", name: "车子负债", amount: 0 },
  { id: "other-debt", name: "其他负债", amount: 0 },
];

const initialBalanceAssets: BalanceAsset[] = [
  { id: "house-asset", name: "房产资产", amount: 0, note: "房产估值" },
  { id: "car-asset", name: "车子资产", amount: 0, note: "车辆残值" },
  { id: "other-asset", name: "其他资产", amount: 0, note: "未归类资产" },
];

const initialReminders: Reminder[] = [
  { id: "rent-reminder", name: "房租提醒", date: "2026-06-30", amount: 1800, kind: "房租" },
  { id: "sub-reminder", name: "订阅服务检查", date: "2026-06-18", amount: 98, kind: "订阅" },
  { id: "deposit-reminder", name: "定期存款到期提醒", date: "2026-07-12", amount: 2000, kind: "定存" },
];

const initialGoals: Goal[] = [
  { id: "travel", name: "旅游基金", target: 18000, current: 3000, monthly: 3000, actualMonthly: 3000 },
  { id: "learning", name: "学习成长", target: 12000, current: 0, monthly: 0, actualMonthly: 0 },
  { id: "partner", name: "伴侣基金", target: 0, current: 0, monthly: 0, actualMonthly: 0 },
  { id: "emergency-goal", name: "应急储备", target: 13500, current: 2000, monthly: 2000, actualMonthly: 0 },
];

const initialFutureCapabilities: FutureCapability[] = [
  { id: "debt-strategy", name: "债务策略", score: 70 },
  { id: "insurance", name: "保险管理", score: 20 },
  { id: "data-quality", name: "数据质量", score: 55 },
  { id: "rules-engine", name: "规则引擎", score: 35 },
];

const cashflowBuiltinIds: CashflowBuiltinId[] = [
  "salary",
  "spendingPlan",
  "travelSaving",
  "learningSaving",
  "partnerSaving",
  "emergencyFund",
  "aSharePlan",
  "usSharePlan",
  "hkSharePlan",
];

const reportStartMonthId = "2026-06";
const financeStorageKey = "personal-finance-management-data-v2";

const moduleList: Array<{ id: ModuleId; title: string; desc: string }> = [
  { id: "income", title: "收入", desc: "税后工资、实际到账、炒股月结算记录" },
  { id: "spending", title: "支出", desc: "实际花费、必要支出、可取消支出" },
  { id: "cashflow", title: "现金流预测", desc: "未来 6 个月流入流出和预计余额" },
  { id: "accounts", title: "账户管理", desc: "银行卡、支付宝、微信、现金余额可编辑" },
  { id: "budget", title: "预算管理", desc: "分类预算和固定支出率" },
  { id: "investment", title: "投资管理", desc: "A股、美股、港股市值和投入计划" },
  { id: "balance", title: "资产负债表", desc: "总资产、负债项可增删编辑" },
  { id: "emergency", title: "应急金", desc: "目标月数、当前金额、覆盖月数" },
  { id: "reminders", title: "账单与提醒", desc: "提前 7 天提醒账单和到期事项" },
  { id: "goals", title: "目标管理", desc: "旅游、学习、伴侣基金和大额支出目标" },
  { id: "reports", title: "财务报表", desc: "收入、支出、结余、投资表现" },
  { id: "health", title: "健康评分", desc: "100 分制财务健康状态" },
  { id: "future", title: "数据能力", desc: "保险、债务策略、规则引擎、数据质量" },
];

function money(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percent(value: number) {
  return `${clamp(value * 100).toFixed(0)}%`;
}

function shortMonth(label: string) {
  return label.replace("2026年", "").replace("月", "月");
}

function addMonthsToId(monthId: string, offset: number) {
  const [yearText, monthText] = monthId.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return monthId;
  const next = new Date(Date.UTC(year, month - 1 + offset, 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthLabelFromId(monthId: string) {
  const [yearText, monthText] = monthId.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  if (!Number.isFinite(year) || !Number.isFinite(month)) return monthId;
  return `${year}年${month}月`;
}

function recordIncome(record: MonthRecord) {
  return record.salary + Math.max(record.stockIncome, 0) + record.otherIncome;
}

function recordSpendingActual(record: MonthRecord) {
  return record.budgets.reduce((sum, item) => sum + item.actual, 0);
}

function recordSpendingPlan(record: MonthRecord) {
  return record.budgets.reduce((sum, item) => sum + item.plan, 0);
}

function investmentReserveKind(account: Account) {
  const text = `${account.name} ${account.type} ${account.purpose}`.toLowerCase();
  if ((text.includes("余额宝") && text.includes("8514")) || text.includes("a股")) return "aShare";
  if (
    (text.includes("中国银行") && text.includes("8292")) ||
    text.includes("美股") ||
    text.includes("us stock") ||
    text.includes("us-stock")
  )
    return "usShare";
  return null;
}

function isInvestmentReserveAccount(account: Account) {
  return investmentReserveKind(account) !== null;
}

function isTravelSavingsAccount(account: Account) {
  const text = `${account.name} ${account.type} ${account.purpose}`.toLowerCase();
  return !isInvestmentReserveAccount(account) && (text.includes("旅游") || text.includes("旅行"));
}

function isLearningSavingsAccount(account: Account) {
  const text = `${account.name} ${account.type} ${account.purpose}`.toLowerCase();
  return !isInvestmentReserveAccount(account) && (text.includes("学习") || text.includes("教育") || text.includes("成长"));
}

function goalKind(goal: Goal): GoalKind {
  const text = goal.name.toLowerCase();
  if (text.includes("旅游") || text.includes("旅行")) return "travel";
  if (text.includes("学习") || text.includes("教育") || text.includes("成长")) return "learning";
  if (text.includes("伴侣") || text.includes("情侣") || text.includes("共同")) return "partner";
  if (text.includes("应急") || text.includes("紧急")) return "emergency";
  return "other";
}

function summarizeGoals(goals: Goal[]) {
  const summary = {
    travelCurrent: 0,
    travelMonthly: 0,
    travelActualMonthly: 0,
    learningCurrent: 0,
    learningMonthly: 0,
    learningActualMonthly: 0,
    partnerCurrent: 0,
    partnerMonthly: 0,
    partnerActualMonthly: 0,
    emergencyMonthly: 0,
    emergencyActualMonthly: 0,
    otherCurrent: 0,
    otherMonthly: 0,
    otherActualMonthly: 0,
    hasTravel: false,
    hasLearning: false,
    hasPartner: false,
    hasEmergency: false,
  };

  for (const goal of goals) {
    const kind = goalKind(goal);
    if (kind === "travel") {
      summary.travelCurrent += goal.current;
      summary.travelMonthly += goal.monthly;
      summary.travelActualMonthly += goal.actualMonthly;
      summary.hasTravel = true;
    } else if (kind === "learning") {
      summary.learningCurrent += goal.current;
      summary.learningMonthly += goal.monthly;
      summary.learningActualMonthly += goal.actualMonthly;
      summary.hasLearning = true;
    } else if (kind === "partner") {
      summary.partnerCurrent += goal.current;
      summary.partnerMonthly += goal.monthly;
      summary.partnerActualMonthly += goal.actualMonthly;
      summary.hasPartner = true;
    } else if (kind === "emergency") {
      summary.emergencyMonthly += goal.monthly;
      summary.emergencyActualMonthly += goal.actualMonthly;
      summary.hasEmergency = true;
    } else if (kind === "other") {
      summary.otherCurrent += goal.current;
      summary.otherMonthly += goal.monthly;
      summary.otherActualMonthly += goal.actualMonthly;
    }
  }

  return summary;
}

function normalizeGoals(value: unknown) {
  const savedGoals = Array.isArray(value) ? value : [];
  const normalized = savedGoals
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const goal = item as Partial<Goal>;
      const monthly = typeof goal.monthly === "number" ? goal.monthly : 0;
      return {
        id: typeof goal.id === "string" && goal.id.trim() ? goal.id : `goal-${index}`,
        name: typeof goal.name === "string" && goal.name.trim() ? goal.name : `目标 ${index + 1}`,
        target: typeof goal.target === "number" ? goal.target : 0,
        current: typeof goal.current === "number" ? goal.current : 0,
        monthly,
        actualMonthly: typeof goal.actualMonthly === "number" ? goal.actualMonthly : monthly,
      };
    })
    .filter((item): item is Goal => item !== null);

  const goals = normalized.length ? normalized : initialGoals;
  if (goals.some((item) => goalKind(item) === "partner")) return goals;
  const partnerGoal = initialGoals.find((item) => item.id === "partner");
  return partnerGoal ? [...goals, partnerGoal] : goals;
}

function normalizeLiabilities(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<Liability>;
      return {
        id: typeof raw.id === "string" && raw.id ? raw.id : `liability-${index + 1}`,
        name: typeof raw.name === "string" && raw.name.trim() ? raw.name : `负债项 ${index + 1}`,
        amount: typeof raw.amount === "number" ? raw.amount : 0,
      };
    })
    .filter((item): item is Liability => item !== null);
}

function normalizeBalanceAssets(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<BalanceAsset>;
      return {
        id: typeof raw.id === "string" && raw.id ? raw.id : `balance-asset-${index + 1}`,
        name: typeof raw.name === "string" && raw.name.trim() ? raw.name : `资产项 ${index + 1}`,
        amount: typeof raw.amount === "number" ? raw.amount : 0,
        note: typeof raw.note === "string" ? raw.note : "",
      };
    })
    .filter((item): item is BalanceAsset => item !== null);
}

function legacyLiabilitiesFromSaved(saved: Partial<PersistedFinanceData>) {
  return initialLiabilities.map((item) => ({
    ...item,
    amount:
      item.id === "house-debt"
        ? saved.houseDebt ?? 0
        : item.id === "car-debt"
          ? saved.carDebt ?? 0
          : saved.otherDebt ?? 0,
  }));
}

function dayDistance(date: string) {
  const target = new Date(`${date}T00:00:00+08:00`);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

function EditableNumber({
  label,
  value,
  onChange,
  step = 100,
  disabled = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  disabled?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        disabled={disabled}
        inputMode="decimal"
        min="0"
        step={step}
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(numberValue(event.target.value))}
      />
    </label>
  );
}

export default function FinanceDashboard() {
  const [activeModules, setActiveModules] = useState<ModuleId[]>([]);
  const [period, setPeriod] = useState<Period>("月");
  const [selectedMonth, setSelectedMonth] = useState("2026-06");
  const [monthlyRecords, setMonthlyRecords] = useState<MonthRecord[]>(initialMonthRecords);
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [fxUsd, setFxUsd] = useState(7.25);
  const [fxHkd, setFxHkd] = useState(0.93);
  const [aSharePlan, setASharePlan] = useState(2250);
  const [usSharePlan, setUsSharePlan] = useState(1500);
  const [hkSharePlan, setHkSharePlan] = useState(0);
  const [travelSaving, setTravelSaving] = useState(3000);
  const [learningSaving, setLearningSaving] = useState(500);
  const [emergencyFund, setEmergencyFund] = useState(2000);
  const [emergencyMonths, setEmergencyMonths] = useState(3);
  const [emergencyMonthlyNeed, setEmergencyMonthlyNeed] = useState(4500);
  const [balanceAssets, setBalanceAssets] = useState<BalanceAsset[]>(initialBalanceAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(initialLiabilities);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [futureCapabilities, setFutureCapabilities] = useState<FutureCapability[]>(initialFutureCapabilities);
  const [cashflowHiddenBuiltinIds, setCashflowHiddenBuiltinIds] = useState<CashflowBuiltinId[]>([]);
  const [cashflowCustomItems, setCashflowCustomItems] = useState<CashflowCustomItem[]>([]);
  const [savedDataReady, setSavedDataReady] = useState(false);

  useEffect(() => {
    const loadSavedData = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(financeStorageKey);
        if (raw) {
          const saved = JSON.parse(raw) as Partial<PersistedFinanceData>;
          if (Array.isArray(saved.monthlyRecords)) setMonthlyRecords(saved.monthlyRecords);
          if (Array.isArray(saved.accounts)) setAccounts(saved.accounts);
          if (Array.isArray(saved.holdings)) setHoldings(saved.holdings);
          if (typeof saved.fxUsd === "number") setFxUsd(saved.fxUsd);
          if (typeof saved.fxHkd === "number") setFxHkd(saved.fxHkd);
          if (typeof saved.aSharePlan === "number") setASharePlan(saved.aSharePlan);
          if (typeof saved.usSharePlan === "number") setUsSharePlan(saved.usSharePlan);
          if (typeof saved.hkSharePlan === "number") setHkSharePlan(saved.hkSharePlan);
          if (typeof saved.travelSaving === "number") setTravelSaving(saved.travelSaving);
          if (typeof saved.learningSaving === "number") setLearningSaving(saved.learningSaving);
          if (typeof saved.emergencyFund === "number") setEmergencyFund(saved.emergencyFund);
          if (typeof saved.emergencyMonths === "number") setEmergencyMonths(saved.emergencyMonths);
          if (typeof saved.emergencyMonthlyNeed === "number") setEmergencyMonthlyNeed(saved.emergencyMonthlyNeed);
          const savedBalanceAssets = normalizeBalanceAssets(saved.balanceAssets);
          if (savedBalanceAssets.length > 0) setBalanceAssets(savedBalanceAssets);
          const savedLiabilities = normalizeLiabilities(saved.liabilities);
          if (savedLiabilities.length > 0) {
            setLiabilities(savedLiabilities);
          } else if (
            typeof saved.houseDebt === "number" ||
            typeof saved.carDebt === "number" ||
            typeof saved.otherDebt === "number"
          ) {
            setLiabilities(legacyLiabilitiesFromSaved(saved));
          }
          if (Array.isArray(saved.reminders)) setReminders(saved.reminders);
          if (Array.isArray(saved.goals)) setGoals(normalizeGoals(saved.goals));
          if (Array.isArray(saved.futureCapabilities)) setFutureCapabilities(saved.futureCapabilities);
          if (Array.isArray(saved.cashflowHiddenBuiltinIds)) {
            setCashflowHiddenBuiltinIds(saved.cashflowHiddenBuiltinIds.filter((id) => cashflowBuiltinIds.includes(id)));
          }
          if (Array.isArray(saved.cashflowCustomItems)) setCashflowCustomItems(saved.cashflowCustomItems);
        }
      } catch {
        window.localStorage.removeItem(financeStorageKey);
      } finally {
        setSavedDataReady(true);
      }
    }, 0);
    return () => window.clearTimeout(loadSavedData);
  }, []);

  useEffect(() => {
    if (!savedDataReady) return;
    const data: PersistedFinanceData = {
      monthlyRecords,
      accounts,
      holdings,
      fxUsd,
      fxHkd,
      aSharePlan,
      usSharePlan,
      hkSharePlan,
      travelSaving,
      learningSaving,
      emergencyFund,
      emergencyMonths,
      emergencyMonthlyNeed,
      balanceAssets,
      liabilities,
      reminders,
      goals,
      futureCapabilities,
      cashflowHiddenBuiltinIds,
      cashflowCustomItems,
    };
    window.localStorage.setItem(financeStorageKey, JSON.stringify(data));
  }, [
    savedDataReady,
    monthlyRecords,
    accounts,
    holdings,
    fxUsd,
    fxHkd,
    aSharePlan,
    usSharePlan,
    hkSharePlan,
    travelSaving,
    learningSaving,
    emergencyFund,
    emergencyMonths,
    emergencyMonthlyNeed,
    balanceAssets,
    liabilities,
    reminders,
    goals,
    futureCapabilities,
    cashflowHiddenBuiltinIds,
    cashflowCustomItems,
  ]);

  const activeMonth = monthlyRecords.find((item) => item.id === selectedMonth) ?? monthlyRecords[0];
  const salary = activeMonth.salary;
  const stockIncome = activeMonth.stockIncome;
  const otherIncome = activeMonth.otherIncome;
  const budgets = activeMonth.budgets;
  const actualIncome = salary + Math.max(stockIncome, 0) + otherIncome;

  const totals = useMemo(() => {
    const accountTotal = accounts.reduce((sum, item) => sum + item.balance, 0);
    const aShareInvestmentReserve = accounts
      .filter((item) => investmentReserveKind(item) === "aShare")
      .reduce((sum, item) => sum + item.balance, 0);
    const usShareInvestmentReserve = accounts
      .filter((item) => investmentReserveKind(item) === "usShare")
      .reduce((sum, item) => sum + item.balance, 0);
    const investmentReserve = aShareInvestmentReserve + usShareInvestmentReserve;
    const accountTravelSavings = accounts.filter(isTravelSavingsAccount).reduce((sum, item) => sum + item.balance, 0);
    const accountLearningSavings = accounts.filter(isLearningSavingsAccount).reduce((sum, item) => sum + item.balance, 0);
    const accountSpecialSavings = accountTravelSavings + accountLearningSavings;
    const goalSummary = summarizeGoals(goals);
    const travelSavings = accountTravelSavings > 0 ? accountTravelSavings : goalSummary.hasTravel ? goalSummary.travelCurrent : travelSaving;
    const learningSavings =
      accountLearningSavings > 0 ? accountLearningSavings : goalSummary.hasLearning ? goalSummary.learningCurrent : learningSaving;
    const partnerSavings = goalSummary.partnerCurrent;
    const otherSavings = goalSummary.otherCurrent;
    const familyFund = partnerSavings;
    const totalSavings = travelSavings + learningSavings + otherSavings;
    const savingsOutsideAccounts = Math.max(0, totalSavings - accountSpecialSavings);
    const operatingAccountTotal = accountTotal - investmentReserve - accountSpecialSavings;
    const liquidAccountTotal = accounts.filter((item) => item.liquid).reduce((sum, item) => sum + item.balance, 0);
    const spendingActual = budgets.reduce((sum, item) => sum + item.actual, 0);
    const spendingPlan = budgets.reduce((sum, item) => sum + item.plan, 0);
    const budgetRemaining = spendingPlan - spendingActual;
    const fixedSpending = budgets.filter((item) => item.fixed).reduce((sum, item) => sum + item.plan, 0);
    const requiredSpending = budgets.filter((item) => item.required).reduce((sum, item) => sum + item.plan, 0);
    const investmentValue = holdings.reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const investmentCost = holdings.reduce((sum, item) => sum + toCny(item.cost, item.currency, fxUsd, fxHkd), 0);
    const aShareValue = holdings.filter((item) => item.market === "A股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const usShareValue = holdings.filter((item) => item.market === "美股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const hkShareValue = holdings.filter((item) => item.market === "港股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const manualAssetTotal = balanceAssets.reduce((sum, item) => sum + item.amount, 0);
    const totalDebt = liabilities.reduce((sum, item) => sum + item.amount, 0);
    const totalAssets = accountTotal + investmentValue + savingsOutsideAccounts + emergencyFund + manualAssetTotal;
    const customOutflow = cashflowCustomItems
      .filter((item) => item.direction === "outflow")
      .reduce((sum, item) => sum + item.amount, 0);
    const enabledCashflowValue = (id: CashflowBuiltinId, value: number) => (cashflowHiddenBuiltinIds.includes(id) ? 0 : value);
    const cashflowSpendingPlan = enabledCashflowValue("spendingPlan", spendingPlan);
    const travelAllocationSource = goalSummary.hasTravel ? goalSummary.travelActualMonthly : travelSaving;
    const learningAllocationSource = goalSummary.hasLearning ? goalSummary.learningActualMonthly : learningSaving;
    const partnerAllocationSource = goalSummary.hasPartner ? goalSummary.partnerActualMonthly : 0;
    const emergencyAllocationSource = goalSummary.hasEmergency ? goalSummary.emergencyActualMonthly : 0;
    const travelExpectedSource = goalSummary.hasTravel ? goalSummary.travelMonthly : travelSaving;
    const learningExpectedSource = goalSummary.hasLearning ? goalSummary.learningMonthly : learningSaving;
    const partnerExpectedSource = goalSummary.hasPartner ? goalSummary.partnerMonthly : 0;
    const emergencyExpectedSource = goalSummary.hasEmergency ? goalSummary.emergencyMonthly : 0;
    const travelAllocation = enabledCashflowValue("travelSaving", travelAllocationSource);
    const learningAllocation = enabledCashflowValue("learningSaving", learningAllocationSource);
    const partnerAllocation = enabledCashflowValue("partnerSaving", partnerAllocationSource);
    const emergencyAllocation = enabledCashflowValue("emergencyFund", emergencyAllocationSource);
    const investmentSavingAllocation =
      enabledCashflowValue("aSharePlan", aSharePlan) +
      enabledCashflowValue("usSharePlan", usSharePlan) +
      enabledCashflowValue("hkSharePlan", hkSharePlan);
    const assetOutflow =
      travelAllocation + learningAllocation + partnerAllocation + emergencyAllocation + investmentSavingAllocation + customOutflow;
    const monthlySurplus = actualIncome - spendingActual - assetOutflow;
    const fixedRatio = actualIncome ? fixedSpending / actualIncome : 0;
    const savingsRate = actualIncome ? assetOutflow / actualIncome : 0;
    const emergencyNeed = Math.max(0, emergencyMonthlyNeed);
    const emergencyTarget = emergencyNeed * emergencyMonths;
    const emergencyCoverage = emergencyNeed ? emergencyFund / emergencyNeed : 0;
    const debtRatio = totalAssets ? totalDebt / totalAssets : 0;
    const score = Math.round(
      Math.max(0, Math.min(25, 25 - Math.max(0, fixedRatio - 0.35) * 85)) +
        Math.min(25, (emergencyCoverage / Math.max(emergencyMonths, 1)) * 25) +
        (totalDebt === 0 ? 20 : Math.max(0, 20 - debtRatio * 50)) +
        Math.min(20, savingsRate / 0.45 * 20) +
        (investmentValue >= investmentCost ? 10 : 6),
    );
    return {
      accountTotal,
      operatingAccountTotal,
      aShareInvestmentReserve,
      usShareInvestmentReserve,
      investmentReserve,
      accountSpecialSavings,
      liquidAccountTotal,
      spendingActual,
      spendingPlan,
      budgetRemaining,
      fixedSpending,
      requiredSpending,
      investmentValue,
      investmentCost,
      investmentPnL: investmentValue - investmentCost,
      aShareValue,
      usShareValue,
      hkShareValue,
      manualAssetTotal,
      cashflowSpendingPlan,
      travelAllocation,
      learningAllocation,
      partnerAllocation,
      emergencyAllocation,
      investmentSavingAllocation,
      customOutflow,
      travelAllocationSource,
      learningAllocationSource,
      partnerAllocationSource,
      emergencyAllocationSource,
      travelExpectedSource,
      learningExpectedSource,
      partnerExpectedSource,
      emergencyExpectedSource,
      travelSavings,
      learningSavings,
      partnerSavings,
      familyFund,
      otherSavings,
      totalSavings,
      savingsOutsideAccounts,
      totalDebt,
      totalAssets,
      netWorth: totalAssets - totalDebt,
      assetOutflow,
      monthlySurplus,
      fixedRatio,
      savingsRate,
      emergencyCoverage,
      debtRatio,
      score,
      emergencyMonthlyNeed: emergencyNeed,
      emergencyTarget,
    };
  }, [
    accounts,
    goals,
    budgets,
    actualIncome,
    holdings,
    fxUsd,
    fxHkd,
    travelSaving,
    learningSaving,
    emergencyFund,
    emergencyMonths,
    emergencyMonthlyNeed,
    balanceAssets,
    liabilities,
    aSharePlan,
    usSharePlan,
    hkSharePlan,
    cashflowHiddenBuiltinIds,
    cashflowCustomItems,
  ]);

  const forecast = useMemo(() => {
    const rows: Array<{ month: string; inflow: number; outflow: number; balance: number }> = [];
    let balance = totals.accountTotal;
    const customInflow = cashflowCustomItems
      .filter((item) => item.direction === "inflow")
      .reduce((sum, item) => sum + item.amount, 0);
    for (let index = 0; index < 6; index += 1) {
      const forecastMonthId = addMonthsToId(selectedMonth, index);
      const forecastRecord = monthlyRecords.find((item) => item.id === forecastMonthId);
      const forecastSalary = forecastRecord?.salary ?? salary;
      const forecastSpendingPlan = forecastRecord ? recordSpendingPlan(forecastRecord) : totals.spendingPlan;
      const inflow = (cashflowHiddenBuiltinIds.includes("salary") ? 0 : forecastSalary) + customInflow;
      const outflow = (cashflowHiddenBuiltinIds.includes("spendingPlan") ? 0 : forecastSpendingPlan) + totals.assetOutflow;
      balance += inflow - outflow;
      rows.push({
        month: shortMonth(forecastRecord?.label ?? monthLabelFromId(forecastMonthId)),
        inflow,
        outflow,
        balance,
      });
    }
    return rows;
  }, [
    cashflowCustomItems,
    cashflowHiddenBuiltinIds,
    monthlyRecords,
    salary,
    selectedMonth,
    totals.accountTotal,
    totals.assetOutflow,
    totals.spendingPlan,
  ]);

  const cashflowEvents = useMemo(() => {
    const customInflow = cashflowCustomItems
      .filter((item) => item.direction === "inflow")
      .reduce((sum, item) => sum + item.amount, 0);
    const inflow = (cashflowHiddenBuiltinIds.includes("salary") ? 0 : salary) + customInflow;
    const rawEvents = [
      ...reminders.map((item) => ({
        date: item.date,
        item: item.name,
        inflow: item.kind === "定存" ? item.amount : 0,
        outflow: item.kind === "定存" ? 0 : item.amount,
        kind: item.kind,
      })),
      { date: "2026-07-10", item: "现金流入", inflow, outflow: 0, kind: "收入" },
      { date: "2026-07-15", item: "月度资产分配", inflow: 0, outflow: totals.assetOutflow, kind: "分配" },
    ].sort((a, b) => a.date.localeCompare(b.date));
    return rawEvents.reduce<{ balance: number; rows: CashflowEvent[] }>(
      (state, item) => {
        const nextBalance = state.balance + item.inflow - item.outflow;
        return {
          balance: nextBalance,
          rows: [...state.rows, { ...item, balance: nextBalance }],
        };
      },
      { balance: totals.accountTotal, rows: [] },
    ).rows;
  }, [cashflowCustomItems, cashflowHiddenBuiltinIds, reminders, salary, totals.accountTotal, totals.assetOutflow]);

  function updateAccount(id: string, patch: Partial<Account>) {
    setAccounts((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addAccount() {
    const nextIndex = accounts.length + 1;
    setAccounts((items) => [
      ...items,
      {
        id: `account-${Date.now()}`,
        name: `新账户 ${nextIndex}`,
        type: "银行卡",
        balance: 0,
        purpose: "待填写用途",
        liquid: true,
      },
    ]);
  }

  function deleteAccount(id: string) {
    setAccounts((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function reorderAccount(draggedId: string, targetId: string) {
    setAccounts((items) => {
      const fromIndex = items.findIndex((item) => item.id === draggedId);
      const toIndex = items.findIndex((item) => item.id === targetId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return items;

      const nextItems = [...items];
      const [movedItem] = nextItems.splice(fromIndex, 1);
      nextItems.splice(toIndex, 0, movedItem);
      return nextItems;
    });
  }

  function updateMonthRecord(monthId: string, patch: Partial<Omit<MonthRecord, "id" | "label" | "budgets">>) {
    setMonthlyRecords((records) =>
      records.map((record) => (record.id === monthId ? { ...record, ...patch } : record)),
    );
  }

  function addMonthRecord() {
    setMonthlyRecords((records) => {
      const sortedRecords = [...records].sort((a, b) => a.id.localeCompare(b.id));
      const lastRecord = sortedRecords[sortedRecords.length - 1] ?? initialMonthRecords[0];
      const [yearText, monthText] = lastRecord.id.split("-");
      const baseDate = new Date(Number(yearText), Number(monthText) - 1, 1);
      const nextDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
      const id = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}`;
      const label = `${nextDate.getFullYear()}年${nextDate.getMonth() + 1}月`;
      const templateBudgets = lastRecord.budgets.length > 0 ? lastRecord.budgets : initialBudgets;
      const nextRecord: MonthRecord = {
        id,
        label,
        salary: lastRecord.salary,
        payday: lastRecord.payday,
        stockIncome: 0,
        otherIncome: 0,
        budgets: templateBudgets.map((item) => ({ ...item, actual: 0 })),
      };

      setSelectedMonth(id);
      return [...records, nextRecord].sort((a, b) => a.id.localeCompare(b.id));
    });
  }

  function deleteMonthRecord(monthId: string) {
    setMonthlyRecords((records) => {
      if (records.length <= 1) return records;

      const sortedRecords = [...records].sort((a, b) => a.id.localeCompare(b.id));
      const deletedIndex = sortedRecords.findIndex((record) => record.id === monthId);
      const nextRecords = sortedRecords.filter((record) => record.id !== monthId);
      if (monthId === selectedMonth) {
        const nextSelected = nextRecords[Math.max(0, deletedIndex - 1)] ?? nextRecords[0];
        setSelectedMonth(nextSelected.id);
      }
      return nextRecords;
    });
  }

  function setSalary(value: number) {
    updateMonthRecord(selectedMonth, { salary: value });
  }

  function addCashflowCustomItem() {
    setCashflowCustomItems((items) => [
      ...items,
      {
        id: `cashflow-${Date.now()}`,
        name: `新增现金流 ${items.length + 1}`,
        amount: 0,
        direction: "outflow",
      },
    ]);
  }

  function updateCashflowCustomItem(id: string, patch: Partial<CashflowCustomItem>) {
    setCashflowCustomItems((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function deleteCashflowCustomItem(id: string) {
    setCashflowCustomItems((items) => items.filter((item) => item.id !== id));
  }

  function deleteCashflowBuiltinItem(id: CashflowBuiltinId) {
    setCashflowHiddenBuiltinIds((items) => (items.includes(id) ? items : [...items, id]));
  }

  function updateBudget(id: string, patch: Partial<Budget>) {
    setMonthlyRecords((records) =>
      records.map((record) =>
        record.id === selectedMonth
          ? { ...record, budgets: record.budgets.map((item) => (item.id === id ? { ...item, ...patch } : item)) }
          : record,
      ),
    );
  }

  function addBudget() {
    setMonthlyRecords((records) =>
      records.map((record) =>
        record.id === selectedMonth
          ? {
              ...record,
              budgets: [
                ...record.budgets,
                {
                  id: `budget-${Date.now()}`,
                  name: `新分类 ${record.budgets.length + 1}`,
                  plan: 0,
                  actual: 0,
                  required: false,
                  fixed: false,
                },
              ],
            }
          : record,
      ),
    );
  }

  function deleteBudget(id: string) {
    setMonthlyRecords((records) =>
      records.map((record) =>
        record.id === selectedMonth && record.budgets.length > 1
          ? { ...record, budgets: record.budgets.filter((item) => item.id !== id) }
          : record,
      ),
    );
  }

  function updateHolding(id: string, patch: Partial<Holding>) {
    setHoldings((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addHolding() {
    setHoldings((items) => [
      ...items,
      {
        id: `holding-${Date.now()}`,
        name: `新投资 ${items.length + 1}`,
        market: "A股",
        cost: 0,
        value: 0,
        currency: "CNY",
      },
    ]);
  }

  function deleteHolding(id: string) {
    setHoldings((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateBalanceAsset(id: string, patch: Partial<BalanceAsset>) {
    setBalanceAssets((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addBalanceAsset() {
    setBalanceAssets((items) => [
      ...items,
      {
        id: `balance-asset-${Date.now()}`,
        name: `新资产 ${items.length + 1}`,
        amount: 0,
        note: "资产负债表补录",
      },
    ]);
  }

  function deleteBalanceAsset(id: string) {
    setBalanceAssets((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateLiability(id: string, patch: Partial<Liability>) {
    setLiabilities((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addLiability() {
    setLiabilities((items) => [
      ...items,
      {
        id: `liability-${Date.now()}`,
        name: `新负债 ${items.length + 1}`,
        amount: 0,
      },
    ]);
  }

  function deleteLiability(id: string) {
    setLiabilities((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateReminder(id: string, patch: Partial<Reminder>) {
    setReminders((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addReminder() {
    setReminders((items) => [
      ...items,
      {
        id: `reminder-${Date.now()}`,
        name: `新提醒 ${items.length + 1}`,
        date: "2026-07-01",
        amount: 0,
        kind: "账单",
      },
    ]);
  }

  function deleteReminder(id: string) {
    setReminders((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateGoal(id: string, patch: Partial<Goal>) {
    setGoals((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function updateFirstGoalByKind(kind: GoalKind, patch: Partial<Goal>) {
    setGoals((items) => {
      const target = items.find((item) => goalKind(item) === kind);
      if (!target) return items;
      return items.map((item) => (item.id === target.id ? { ...item, ...patch } : item));
    });
  }

  function setTravelSavingFromInput(value: number) {
    setTravelSaving(value);
    updateFirstGoalByKind("travel", { actualMonthly: value });
  }

  function setLearningSavingFromInput(value: number) {
    setLearningSaving(value);
    updateFirstGoalByKind("learning", { actualMonthly: value });
  }

  function setPartnerSavingFromInput(value: number) {
    updateFirstGoalByKind("partner", { actualMonthly: value });
  }

  function setEmergencyAllocationFromInput(value: number) {
    updateFirstGoalByKind("emergency", { actualMonthly: value });
  }

  function addGoal() {
    setGoals((items) => [
      ...items,
      {
        id: `goal-${Date.now()}`,
        name: `新目标 ${items.length + 1}`,
        target: 0,
        current: 0,
        monthly: 0,
        actualMonthly: 0,
      },
    ]);
  }

  function deleteGoal(id: string) {
    setGoals((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateFutureCapability(id: string, patch: Partial<FutureCapability>) {
    setFutureCapabilities((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function toggleModule(id: ModuleId) {
    setActiveModules((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  function openAllModules() {
    setActiveModules(moduleList.map((item) => item.id));
  }

  const liabilitySummary = liabilities.length
    ? `${liabilities
        .slice(0, 3)
        .map((item) => `${item.name.trim() || "未命名负债"} ${money(item.amount)}`)
        .join(" / ")}${liabilities.length > 3 ? " / 更多" : ""}`
    : "暂无负债";

  const monthlyAssetAllocationSummary = [
    `旅游 ${money(totals.travelAllocation)}`,
    `学习 ${money(totals.learningAllocation)}`,
    `伴侣基金 ${money(totals.partnerAllocation)}`,
    `应急 ${money(totals.emergencyAllocation)}`,
    `投资储蓄 ${money(totals.investmentSavingAllocation)}`,
  ].join(" / ");
  const specialSavingsDetail = [
    `旅游 ${money(totals.travelSavings)}`,
    `学习 ${money(totals.learningSavings)}`,
    totals.otherSavings > 0 ? `其他 ${money(totals.otherSavings)}` : "",
  ]
    .filter(Boolean)
    .join(" / ");
  const familyFundBreakdown = {
    label: "家庭及伴侣储蓄",
    value: totals.familyFund,
    detail:
      totals.familyFund > 0 || totals.partnerAllocation > 0
        ? `伴侣基金 ${money(totals.familyFund)} / 本月家庭投入 ${money(totals.partnerAllocation)}`
        : "家庭共同资金单列，不计入个人总资产",
    color: palette[3],
    className: "family-fund-item",
  };
  const accountCashDetail = [
    totals.aShareInvestmentReserve > 0 ? `A股待投 ${money(totals.aShareInvestmentReserve)}` : "",
    totals.usShareInvestmentReserve > 0 ? `美股待投 ${money(totals.usShareInvestmentReserve)}` : "",
    totals.accountSpecialSavings > 0 ? `专项 ${money(totals.accountSpecialSavings)}` : "",
  ]
    .filter(Boolean)
    .join(" / ");
  const manualAssetDetail =
    balanceAssets
      .filter((item) => item.amount > 0)
      .slice(0, 3)
      .map((item) => `${item.name.trim() || "未命名资产"} ${money(item.amount)}`)
      .join(" / ") || "资产负债表补录资产";
  const totalAssetBreakdown: Array<{ label: string; value: number; detail: string; color: string; className?: string }> = [
    {
      label: "账户现金",
      value: totals.operatingAccountTotal,
      detail: accountCashDetail ? `不含 ${accountCashDetail}` : "日常账户余额",
      color: palette[0],
    },
    {
      label: "A股待投储蓄",
      value: totals.aShareInvestmentReserve,
      detail: "余额宝-8514，尚未进A股",
      color: palette[6],
    },
    {
      label: "美股待投储蓄",
      value: totals.usShareInvestmentReserve,
      detail: "中国银行8292，尚未进美股",
      color: palette[5],
    },
    {
      label: "已投资市值",
      value: totals.investmentValue,
      detail: `A股 ${money(totals.aShareValue)} / 美股 ${money(totals.usShareValue)} / 港股 ${money(totals.hkShareValue)}`,
      color: palette[1],
    },
    {
      label: "个人专项储蓄",
      value: totals.totalSavings,
      detail: specialSavingsDetail,
      color: palette[3],
    },
    familyFundBreakdown,
    ...(totals.manualAssetTotal > 0
      ? [
          {
            label: "补录资产",
            value: totals.manualAssetTotal,
            detail: manualAssetDetail,
            color: palette[5],
          },
        ]
      : []),
    {
      label: "应急金",
      value: emergencyFund,
      detail: `覆盖 ${totals.emergencyCoverage.toFixed(1)} 月 / 目标 ${emergencyMonths} 月`,
      color: palette[2],
    },
  ];

  const currentCashflowItems = accounts.map((item) => ({
    label: item.name.trim() || "未命名账户",
    value: money(item.balance),
    note: item.purpose.trim() || item.type.trim() || "账户",
  }));

  const overviewCards: Array<{
    title: string;
    value: string;
    detail: string;
    tone: Tone;
    items?: Array<{ label: string; value: string; note: string }>;
  }> = [
    {
      title: "本月实际收入",
      value: money(actualIncome),
      detail: `${activeMonth.label} / 工资 ${money(salary)} / 炒股 ${money(Math.max(stockIncome, 0))}`,
      tone: "blue" as Tone,
    },
    {
      title: "本月实际支出",
      value: money(totals.spendingActual),
      detail: `${activeMonth.label} / 预算 ${money(totals.spendingPlan)} / 固定支出率 ${percent(totals.fixedRatio)}`,
      tone: totals.fixedRatio > 0.5 ? ("red" as Tone) : totals.fixedRatio >= 0.35 ? ("amber" as Tone) : ("green" as Tone),
    },
    {
      title: "本月实际资产分配",
      value: money(totals.assetOutflow),
      detail: `${monthlyAssetAllocationSummary}${totals.customOutflow > 0 ? ` / 其他 ${money(totals.customOutflow)}` : ""}`,
      tone: "violet" as Tone,
    },
    {
      title: "当月余额",
      value: money(totals.monthlySurplus),
      detail: `收入 ${money(actualIncome)} - 支出 ${money(totals.spendingActual)} - 分配 ${money(totals.assetOutflow)}`,
      tone: totals.monthlySurplus < 0 ? ("red" as Tone) : totals.monthlySurplus < actualIncome * 0.1 ? ("amber" as Tone) : ("green" as Tone),
    },
    {
      title: "当前现金流",
      value: money(totals.accountTotal),
      detail: `${accounts.length} 个账户余额合计 / 可动用 ${money(totals.liquidAccountTotal)}`,
      tone: totals.liquidAccountTotal < totals.emergencyMonthlyNeed * 2 ? ("red" as Tone) : ("green" as Tone),
      items: currentCashflowItems,
    },
    {
      title: "目前总储蓄",
      value: money(totals.accountTotal),
      detail: `${accounts.length} 个账户 / A股待投 ${money(totals.aShareInvestmentReserve)} / 美股待投 ${money(totals.usShareInvestmentReserve)}`,
      tone: "green" as Tone,
    },
    {
      title: "目前总应急",
      value: money(emergencyFund),
      detail: `覆盖 ${totals.emergencyCoverage.toFixed(1)} 个月 / 目标 ${emergencyMonths} 个月`,
      tone: "amber" as Tone,
    },
    {
      title: "目前总负债",
      value: money(totals.totalDebt),
      detail: liabilitySummary,
      tone: totals.totalDebt > 0 ? ("red" as Tone) : ("green" as Tone),
    },
  ];

  const incomeChartData = [
    { label: "工资", value: salary, color: palette[0] },
    { label: "炒股月结", value: Math.max(stockIncome, 0), color: palette[1] },
    { label: "其他收入", value: otherIncome, color: palette[3] },
  ];
  const reportMonthRecords = monthlyRecords
    .filter((record) => record.id >= reportStartMonthId)
    .sort((a, b) => a.id.localeCompare(b.id));
  const monthlyIncomeTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordIncome(record),
    color: record.id === selectedMonth ? palette[0] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月" : "月度",
  }));
  const monthlySpendingTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordSpendingActual(record),
    color: record.id === selectedMonth ? palette[4] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月" : "月度",
  }));
  const monthlySurplusTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: Math.max(recordIncome(record) - recordSpendingActual(record), 0),
    color: record.id === selectedMonth ? palette[1] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月" : "月度",
  }));
  const accountChartData = accounts.map((item, index) => ({
    label: item.name.trim() || "未命名账户",
    value: item.balance,
    color: palette[index % palette.length],
    detail: item.type.trim() || "未分类",
  }));
  const spendingChartData = budgets.map((item, index) => ({
    label: item.name,
    value: item.actual,
    max: Math.max(item.plan, item.actual, 1),
    color: item.actual > item.plan ? palette[4] : palette[index % palette.length],
    detail: `${money(item.actual)} / ${money(item.plan)}`,
  }));
  const actualSpendingItems = budgets
    .map((item, index) => ({
      label: item.name.trim() || "未命名支出",
      value: item.actual,
      plan: item.plan,
      color: palette[index % palette.length],
      detail: `${item.required ? "必须" : "可取消"} / ${item.fixed ? "固定" : "弹性"}`,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
  const topSpendingData = actualSpendingItems.length
    ? actualSpendingItems.slice(0, 8).map((item) => ({
        label: item.label,
        value: item.value,
        color: item.color,
      }))
    : [{ label: "暂无实际支出", value: 0, max: 1, color: "#b8c4d4", detail: "本月未记录" }];
  const spendingShareData = actualSpendingItems.map((item) => ({
    label: item.label,
    value: item.value,
    color: item.color,
    detail: `${percent(item.value / Math.max(totals.spendingActual, 1))} / ${money(item.value)}`,
  }));
  const fixedFlexData = [
    { label: "固定支出", value: totals.fixedSpending, color: palette[2] },
    { label: "弹性支出", value: Math.max(totals.spendingPlan - totals.fixedSpending, 0), color: palette[0] },
  ];
  const requiredData = [
    { label: "必须支出", value: totals.requiredSpending, color: palette[1] },
    { label: "可取消支出", value: Math.max(totals.spendingPlan - totals.requiredSpending, 0), color: palette[2] },
  ];
  const cashflowBuiltinRows: CashflowTableRow[] = [
    {
      id: "builtin-salary",
      builtinId: "salary",
      name: "工资流入",
      amount: salary,
      direction: "inflow",
      source: "计入预测",
      onAmountChange: setSalary,
      onDelete: () => deleteCashflowBuiltinItem("salary"),
    },
    {
      id: "builtin-spending-plan",
      builtinId: "spendingPlan",
      name: "生活支出预算",
      amount: totals.spendingPlan,
      direction: "outflow",
      source: `${activeMonth.label}预算表动态汇总`,
      readonlyAmount: true,
      onDelete: () => deleteCashflowBuiltinItem("spendingPlan"),
    },
    {
      id: "calculated-budget-remaining",
      name: "本月预算剩余",
      amount: totals.budgetRemaining,
      direction: totals.budgetRemaining >= 0 ? "inflow" : "outflow",
      source: "预算 - 实际，可转储蓄，不计入预测",
      readonlyAmount: true,
      summaryOnly: true,
    },
    {
      id: "builtin-travel-saving",
      builtinId: "travelSaving",
      name: "旅游储蓄",
      amount: totals.travelAllocationSource,
      direction: "outflow",
      source: "来自目标实际投入",
      onAmountChange: setTravelSavingFromInput,
      onDelete: () => deleteCashflowBuiltinItem("travelSaving"),
    },
    {
      id: "builtin-learning-saving",
      builtinId: "learningSaving",
      name: "学习储蓄",
      amount: totals.learningAllocationSource,
      direction: "outflow",
      source: "来自目标实际投入",
      onAmountChange: setLearningSavingFromInput,
      onDelete: () => deleteCashflowBuiltinItem("learningSaving"),
    },
    {
      id: "builtin-partner-saving",
      builtinId: "partnerSaving",
      name: "伴侣基金",
      amount: totals.partnerAllocationSource,
      direction: "outflow",
      source: "来自目标实际投入",
      onAmountChange: setPartnerSavingFromInput,
      onDelete: () => deleteCashflowBuiltinItem("partnerSaving"),
    },
    {
      id: "builtin-emergency-fund",
      builtinId: "emergencyFund",
      name: "应急金投入",
      amount: totals.emergencyAllocationSource,
      direction: "outflow",
      source: "来自目标实际投入",
      onAmountChange: setEmergencyAllocationFromInput,
      onDelete: () => deleteCashflowBuiltinItem("emergencyFund"),
    },
    {
      id: "builtin-ashare-plan",
      builtinId: "aSharePlan",
      name: "A股计划",
      amount: aSharePlan,
      direction: "outflow",
      source: "现金流出",
      onAmountChange: setASharePlan,
      onDelete: () => deleteCashflowBuiltinItem("aSharePlan"),
    },
    {
      id: "builtin-usshare-plan",
      builtinId: "usSharePlan",
      name: "美股计划",
      amount: usSharePlan,
      direction: "outflow",
      source: "现金流出",
      onAmountChange: setUsSharePlan,
      onDelete: () => deleteCashflowBuiltinItem("usSharePlan"),
    },
    {
      id: "builtin-hkshare-plan",
      builtinId: "hkSharePlan",
      name: "港股计划",
      amount: hkSharePlan,
      direction: "outflow",
      source: "现金流出",
      onAmountChange: setHkSharePlan,
      onDelete: () => deleteCashflowBuiltinItem("hkSharePlan"),
    },
  ];
  const cashflowRows: CashflowTableRow[] = [
    ...cashflowBuiltinRows.filter((item) => !item.builtinId || !cashflowHiddenBuiltinIds.includes(item.builtinId)),
    ...cashflowCustomItems.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.amount,
      direction: item.direction,
      source: "自定义",
      onNameChange: (value: string) => updateCashflowCustomItem(item.id, { name: value }),
      onAmountChange: (value: number) => updateCashflowCustomItem(item.id, { amount: value }),
      onDirectionChange: (value: CashflowDirection) => updateCashflowCustomItem(item.id, { direction: value }),
      onDelete: () => deleteCashflowCustomItem(item.id),
    })),
  ];
  const outflowData = cashflowRows
    .filter((item) => item.direction === "outflow" && !item.summaryOnly)
    .map((item, index) => ({
      label: item.name,
      value: item.amount,
      color: palette[(index + 4) % palette.length],
      detail: item.source,
    }));
  const assetStructureData = totalAssetBreakdown.map((item) => ({
    label: item.label,
    value: item.value,
    color: item.color,
  }));
  const investmentChartData = [
    { label: "A股", value: totals.aShareValue, color: palette[0] },
    { label: "美股", value: totals.usShareValue, color: palette[1] },
    { label: "港股", value: totals.hkShareValue, color: palette[3] },
  ];
  const holdingRows = holdings.map((item) => {
    const valueCny = toCny(item.value, item.currency, fxUsd, fxHkd);
    const costCny = toCny(item.cost, item.currency, fxUsd, fxHkd);
    return {
      label: item.market,
      value: Math.abs(valueCny - costCny),
      color: valueCny >= costCny ? palette[1] : palette[4],
      detail: `${valueCny >= costCny ? "浮盈" : "浮亏"} ${money(valueCny - costCny)}`,
    };
  });
  const cashflowLine = forecast.map((item) => ({ label: item.month, value: item.balance }));
  const cashflowOutflowBars = forecast.map((item) => ({ label: item.month, value: item.outflow, color: palette[4] }));
  const waterfallData: WaterfallDatum[] = [
    { label: "期初现金", value: totals.accountTotal, kind: "start", color: palette[0] },
    { label: "工资", value: salary, kind: "positive", color: palette[1] },
    { label: "生活支出", value: -totals.spendingPlan, kind: "negative", color: palette[4] },
    { label: "资产分配", value: -totals.assetOutflow, kind: "negative", color: palette[2] },
    {
      label: "月末现金",
      value: totals.accountTotal + salary - totals.spendingPlan - totals.assetOutflow,
      kind: "end",
      color: palette[3],
    },
  ];
  const netWorthTrend = forecast.map((item) => ({
    label: item.month,
    value: item.balance + totals.investmentValue + totals.totalSavings + emergencyFund + totals.manualAssetTotal - totals.totalDebt,
  }));
  const balanceData = [
    { label: "总资产", value: totals.totalAssets, color: palette[0] },
    { label: "总负债", value: totals.totalDebt, color: palette[4] },
    { label: "净资产", value: Math.max(totals.netWorth, 0), color: palette[1] },
  ];
  const balanceAssetData = balanceAssets.map((item, index) => ({
    label: item.name.trim() || "未命名资产",
    value: item.amount,
    color: palette[index % palette.length],
    detail: item.note.trim() || money(item.amount),
  }));
  const debtData = liabilities.map((item, index) => ({
    label: item.name.trim() || "未命名负债",
    value: item.amount,
    color: palette[(index + 4) % palette.length],
  }));
  const goalProgress = goals.map((item, index) => ({
    label: item.name,
    value: item.current,
    max: item.target,
    color: palette[index % palette.length],
    detail: `预期 ${money(item.monthly)} / 实际 ${money(item.actualMonthly)}`,
  }));
  const totalGoalCurrent = goals.reduce((sum, item) => sum + item.current, 0);
  const totalGoalTarget = goals.reduce((sum, item) => sum + item.target, 0);
  const totalGoalExpectedInput = goals.reduce((sum, item) => sum + item.monthly, 0);
  const totalGoalActualInput = goals.reduce((sum, item) => sum + item.actualMonthly, 0);
  const selectedMonthIndex = Math.max(0, reportMonthRecords.findIndex((item) => item.id === selectedMonth));
  const monthlyGoalInputTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: record.id === selectedMonth ? totalGoalActualInput : totalGoalExpectedInput,
    color: record.id === selectedMonth ? palette[1] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "实际投入" : "预期准备",
  }));
  const monthlyGoalPressureTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordSpendingActual(record) + (record.id === selectedMonth ? totalGoalActualInput : totalGoalExpectedInput),
    color: record.id === selectedMonth ? palette[2] : palette[index % palette.length],
    detail: `支出 ${money(recordSpendingActual(record))}`,
  }));
  const monthlyGoalBalanceTrend = reportMonthRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: Math.min(
      totalGoalTarget,
      totalGoalCurrent +
        totalGoalActualInput +
        totalGoalExpectedInput * Math.max(0, index - selectedMonthIndex - 1),
    ),
  }));
  const reminderAmountData = reminders.map((item, index) => ({
    label: item.name,
    value: item.amount,
    color: palette[index % palette.length],
    detail: `${Math.max(0, dayDistance(item.date))} 天后`,
  }));
  const reminderDaysData = reminders.map((item, index) => ({
    label: item.kind,
    value: Math.max(0, dayDistance(item.date)),
    color: palette[index % palette.length],
    detail: item.date,
  }));
  const reportRows: ReportRow[] = [
    { id: "salary", name: "工资", amount: salary, flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "stock-income", name: "炒股月结", amount: Math.max(stockIncome, 0), flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "other-income", name: "其他收入", amount: otherIncome, flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "spending-actual", name: "生活实际支出", amount: totals.spendingActual, flow: "支出", source: "支出预算底表实际汇总" },
    { id: "spending-plan", name: "生活支出预算", amount: totals.spendingPlan, flow: "预算", source: "支出预算底表预算汇总" },
    { id: "budget-remaining", name: "本月预算剩余", amount: totals.budgetRemaining, flow: "可转储蓄", source: "生活支出预算 - 实际支出" },
    { id: "travel-saving", name: "旅游储蓄", amount: totals.travelAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "learning-saving", name: "学习储蓄", amount: totals.learningAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "partner-saving", name: "伴侣基金", amount: totals.partnerAllocationSource, flow: "家庭分配", source: "目标管理本月实际投入，不计入个人总资产" },
    { id: "emergency-saving", name: "应急金投入", amount: totals.emergencyAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "ashare-plan", name: "A股计划", amount: aSharePlan, flow: "资产分配", source: "投资计划 / 现金流预测" },
    { id: "usshare-plan", name: "美股计划", amount: usSharePlan, flow: "资产分配", source: "投资计划 / 现金流预测" },
    { id: "hkshare-plan", name: "港股计划", amount: hkSharePlan, flow: "资产分配", source: "投资计划 / 现金流预测" },
    { id: "monthly-surplus", name: "当月余额", amount: totals.monthlySurplus, flow: "结余", source: "收入 - 实际支出 - 实际资产分配" },
  ];
  const reportData = [
    { label: "收入", value: actualIncome, color: palette[0] },
    { label: "支出", value: totals.spendingActual, color: palette[4] },
    { label: "资产分配", value: totals.assetOutflow, color: palette[1] },
    { label: "月结余", value: Math.max(totals.monthlySurplus, 0), color: palette[3] },
  ];
  const budgetHeatData = budgets.map((item, index) => {
    const used = item.plan ? item.actual / item.plan : 0;
    return {
      label: item.name,
      value: used * 100,
      color: used > 1 ? palette[4] : used > 0.8 ? palette[2] : palette[index % palette.length],
      detail: `${Math.round(used * 100)}%`,
    };
  });
  const investmentScatter = holdings.map((item, index) => {
    const valueCny = toCny(item.value, item.currency, fxUsd, fxHkd);
    const costCny = toCny(item.cost, item.currency, fxUsd, fxHkd);
    const weight = totals.investmentValue ? (valueCny / totals.investmentValue) * 100 : 0;
    const returnRate = costCny ? ((valueCny - costCny) / costCny) * 100 : 0;
    return {
      label: item.market,
      x: clamp(weight),
      y: clamp(returnRate + 50),
      value: `${returnRate.toFixed(1)}% / ${weight.toFixed(0)}%`,
      color: palette[index % palette.length],
    };
  });
  const healthDimensions = [
    { label: "现金流健康", value: clamp(((totals.monthlySurplus / Math.max(actualIncome, 1)) + 0.2) * 180), color: palette[0] },
    { label: "抗风险能力", value: clamp((totals.emergencyCoverage / Math.max(emergencyMonths, 1)) * 100), color: palette[1] },
    { label: "负债风险", value: clamp(100 - totals.debtRatio * 100), color: palette[4] },
    { label: "增长能力", value: clamp((totals.savingsRate / 0.45) * 100), color: palette[3] },
    { label: "投资表现", value: totals.investmentValue >= totals.investmentCost ? 82 : 58, color: palette[2] },
  ];
  const riskMatrixData: MatrixPoint[] = [
    {
      label: "固定支出率",
      x: clamp(totals.fixedRatio * 120),
      y: clamp(totals.fixedRatio > 0.5 ? 86 : totals.fixedRatio > 0.35 ? 62 : 32),
      value: percent(totals.fixedRatio),
      color: totals.fixedRatio > 0.5 ? palette[4] : totals.fixedRatio > 0.35 ? palette[2] : palette[1],
    },
    {
      label: "应急金缺口",
      x: clamp(100 - (totals.emergencyCoverage / Math.max(emergencyMonths, 1)) * 100),
      y: clamp(80 - totals.emergencyCoverage * 10),
      value: `${totals.emergencyCoverage.toFixed(1)}月`,
      color: palette[2],
    },
    {
      label: "现金流末余额",
      x: clamp((totals.spendingPlan * 4 - (forecast[forecast.length - 1]?.balance ?? 0)) / Math.max(totals.spendingPlan * 4, 1) * 100),
      y: clamp((totals.spendingPlan * 3 - (forecast[forecast.length - 1]?.balance ?? 0)) / Math.max(totals.spendingPlan * 3, 1) * 100),
      value: money(forecast[forecast.length - 1]?.balance ?? 0),
      color: palette[0],
    },
    {
      label: "负债率",
      x: clamp(totals.debtRatio * 100),
      y: clamp(totals.debtRatio * 120),
      value: percent(totals.debtRatio),
      color: palette[4],
    },
    {
      label: "投资波动",
      x: clamp(Math.abs(totals.investmentPnL) / Math.max(totals.investmentCost, 1) * 100),
      y: totals.investmentPnL >= 0 ? 34 : 72,
      value: money(totals.investmentPnL),
      color: totals.investmentPnL >= 0 ? palette[1] : palette[4],
    },
  ];
  const futureCapabilityData = futureCapabilities.map((item, index) => ({
    label: item.name,
    value: item.score,
    color: palette[index % palette.length],
  }));

  return (
    <main className="finance-page">
      <aside className="side-nav">
        <div className="brand">
          <span className="brand-mark">PF</span>
          <div>
            <strong>个人财务系统</strong>
            <small>Sites 版 / 公开脱敏</small>
          </div>
        </div>
        <button className={activeModules.length === 0 ? "active" : ""} onClick={() => setActiveModules([])}>
          总览 / 清空
        </button>
        {moduleList.map((item) => (
          <button
            className={activeModules.includes(item.id) ? "active" : ""}
            key={item.id}
            onClick={() => toggleModule(item.id)}
          >
            {item.title}
          </button>
        ))}
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>长期个人财务管理系统</h1>
            <p>数据录入和图表分析分离；先看总览，再多选模块并排复盘。</p>
          </div>
          <div className="period-tabs" aria-label="时间视图">
            {(["周", "月", "季", "年"] as Period[]).map((item) => (
              <button className={period === item ? "active" : ""} key={item} onClick={() => setPeriod(item)}>
                {item}
              </button>
            ))}
          </div>
        </header>

        <section className="overview">
          <div className="section-title">
            <div>
              <h2>总览 Dashboard</h2>
              <p>八个指标给结论；下面的图表区用同一份数据做结构、趋势和风险判断。</p>
            </div>
            <span className="pill good">公开页已脱敏</span>
          </div>
          <article className="total-assets-hero">
            <div className="total-assets-main">
              <span>当前总资产</span>
              <strong>{money(totals.totalAssets)}</strong>
              <small>账户现金、A股待投、美股待投、已投资市值、个人专项储蓄和应急金合计；家庭及伴侣储蓄单列，不计入个人总资产。</small>
            </div>
            <div className="total-assets-breakdown" aria-label="总资产资金分布">
              {totalAssetBreakdown.map((item) => (
                <div
                  className={`asset-breakdown-item ${item.className ?? ""}`.trim()}
                  key={item.label}
                  style={{ "--asset-color": item.color } as CSSProperties}
                >
                  <span>{item.label}</span>
                  <strong>{money(item.value)}</strong>
                  <em>{item.detail}</em>
                </div>
              ))}
            </div>
          </article>
          <div className="overview-grid">
            {overviewCards.map((item) => (
              <article className={`overview-card ${item.tone} ${item.items ? "with-line-items" : ""}`.trim()} key={item.title}>
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                {item.items ? (
                  <div className="overview-detail-list">
                    <small>{item.detail}</small>
                    <div className="overview-line-items" aria-label={`${item.title}明细`}>
                      {item.items.map((line) => (
                        <div className="overview-line-item" key={line.label}>
                          <span>{line.label}</span>
                          <em>{line.value}</em>
                          <small>{line.note}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <small>{item.detail}</small>
                )}
              </article>
            ))}
          </div>

          <section className="analytics-section">
            <div className="section-title compact">
              <div>
                <h2>图表分析区</h2>
                <p>资产、支出、现金流、健康评分分开看，避免所有数字挤在同一屏。</p>
              </div>
            </div>
            <div className="chart-grid four">
              <ChartPanel title="资产结构" summary={`总资产 ${money(totals.totalAssets)}`}>
                <DonutChart data={assetStructureData} centerLabel="总资产" centerValue={money(totals.totalAssets)} />
              </ChartPanel>
              <ChartPanel title="未来现金流趋势" summary="6 个月余额曲线">
                <LineChart data={cashflowLine} valueFormatter={money} />
              </ChartPanel>
              <ChartPanel title="支出最高项" summary={`已花 ${money(totals.spendingActual)}`} className="spending-top-panel">
                <HorizontalBarChart data={topSpendingData} valueFormatter={money} />
              </ChartPanel>
              <ChartPanel title="健康维度" summary={`综合 ${totals.score} 分`}>
                <HorizontalBarChart data={healthDimensions} valueFormatter={(value) => `${value.toFixed(0)}分`} percentMode />
              </ChartPanel>
              <ChartPanel title="本月现金瀑布" summary="期初到月末">
                <WaterfallChart data={waterfallData} />
              </ChartPanel>
              <ChartPanel title="未来现金流日历" summary="关键流入流出">
                <CashflowCalendar events={cashflowEvents} />
              </ChartPanel>
              <ChartPanel title="风险矩阵" summary="影响 × 紧迫" className="wide risk-panel">
                <RiskMatrix data={riskMatrixData} />
              </ChartPanel>
              <ChartPanel title="资金分配流向" summary={`分配 ${money(totals.assetOutflow)}`}>
                <FlowMap data={outflowData} source="工资账户" valueFormatter={money} />
              </ChartPanel>
            </div>
          </section>

          <div className="module-grid">
            {moduleList.map((item) => (
              <button
                className={`module-card ${activeModules.includes(item.id) ? "selected" : ""}`}
                key={item.id}
                onClick={() => toggleModule(item.id)}
              >
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
                <em>{activeModules.includes(item.id) ? "已打开，点击关闭" : "打开详情"}</em>
              </button>
            ))}
          </div>
        </section>

        {activeModules.length > 0 && (
          <section className="selected-modules">
            <div className="section-title selected-title">
              <div>
                <h2>已打开模块</h2>
                <p>可以同时观看多个模块；每个模块左侧是数据，右侧是图表。</p>
              </div>
              <div className="panel-actions">
                <button onClick={openAllModules}>打开全部</button>
                <button onClick={() => setActiveModules([])}>全部收起</button>
              </div>
            </div>

            {activeModules.map((moduleId) => (
              <section className="detail-panel" key={moduleId}>
                {moduleId === "income" && (
                  <Module title="收入" desc="收入只看实际到账；炒股月结算单独记录，不进入现金流预测。">
                    <DataChartLayout
                      data={
                        <EditableMonthlyIncomeTable
                          records={monthlyRecords}
                          selectedMonth={selectedMonth}
                          onSelect={setSelectedMonth}
                          addMonthRecord={addMonthRecord}
                          deleteMonthRecord={deleteMonthRecord}
                          updateMonthRecord={updateMonthRecord}
                        />
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="收入结构" summary={`${activeMonth.label} ${money(actualIncome)}`}>
                            <DonutChart data={incomeChartData} centerLabel="实际收入" centerValue={money(actualIncome)} />
                          </ChartPanel>
                          <ChartPanel title="收入口径" summary="股票月结不进预测">
                            <StackedBar data={incomeChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度收入趋势" summary="按月份分开记录">
                            <VerticalBarChart data={monthlyIncomeTrend} valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "spending" && (
                  <Module title="支出" desc="支出与收入分开管理；预算、实际金额、必要性都能直接编辑。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector
                            records={monthlyRecords}
                            selectedMonth={selectedMonth}
                            onAddMonth={addMonthRecord}
                            onChange={setSelectedMonth}
                            onDeleteSelectedMonth={() => deleteMonthRecord(selectedMonth)}
                          />
                          <EditableBudgetTable budgets={budgets} deleteBudget={deleteBudget} addBudget={addBudget} updateBudget={updateBudget} />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="实际支出最高8项" summary={`已花 ${money(totals.spendingActual)}`} className="spending-top-panel">
                            <HorizontalBarChart data={topSpendingData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="全部实际支出占比" summary="按实际金额">
                            <DonutChart data={spendingShareData} centerLabel="实际" centerValue={money(totals.spendingActual)} />
                          </ChartPanel>
                          <ChartPanel title="分类预算执行" summary="实际 / 预算">
                            <HorizontalBarChart data={spendingChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="预算必要性结构" summary="必须 vs 可取消">
                            <DonutChart data={requiredData} centerLabel="预算" centerValue={money(totals.spendingPlan)} />
                          </ChartPanel>
                          <ChartPanel title="月度支出趋势" summary="每月实际支出">
                            <VerticalBarChart data={monthlySpendingTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度结余趋势" summary="收入 - 实际支出">
                            <VerticalBarChart data={monthlySurplusTrend} valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "cashflow" && (
                  <Module title="现金流预测" desc="未来 6 个月预测；资产分配作为现金流出，股票收入不计入预测。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector
                            records={monthlyRecords}
                            selectedMonth={selectedMonth}
                            onAddMonth={addMonthRecord}
                            onChange={setSelectedMonth}
                            onDeleteSelectedMonth={() => deleteMonthRecord(selectedMonth)}
                          />
                          <EditableCashflowInputsTable
                            accountTotal={totals.accountTotal}
                            addCashflowCustomItem={addCashflowCustomItem}
                            monthlyInflow={forecast[0]?.inflow ?? 0}
                            monthlyOutflow={totals.cashflowSpendingPlan + totals.assetOutflow}
                            rows={cashflowRows}
                          />
                          <EditableReminderTable
                            reminders={reminders}
                            addReminder={addReminder}
                            deleteReminder={deleteReminder}
                            updateReminder={updateReminder}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="余额趋势" summary="未来 6 个月">
                            <LineChart data={cashflowLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度流出压力" summary={`每月流出 ${money(totals.cashflowSpendingPlan + totals.assetOutflow)}`}>
                            <VerticalBarChart data={cashflowOutflowBars} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="现金瀑布" summary="本月资金变化">
                            <WaterfallChart data={waterfallData} />
                          </ChartPanel>
                          <ChartPanel title="现金流日历" summary="账单与工资联动">
                            <CashflowCalendar events={cashflowEvents} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "accounts" && (
                  <Module title="账户管理" desc="账户可以新增、删除、编辑和拖动排序，修改后会联动总资产、现金流和图表。">
                    <DataChartLayout
                      data={
                        <>
                          <EditableAccountsTable
                            accounts={accounts}
                            addAccount={addAccount}
                            deleteAccount={deleteAccount}
                            liquidAccountTotal={totals.liquidAccountTotal}
                            reorderAccount={reorderAccount}
                            total={totals.accountTotal}
                            updateAccount={updateAccount}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="账户余额分布" summary={`账户合计 ${money(totals.accountTotal)}`}>
                            <DonutChart data={accountChartData} centerLabel="账户" centerValue={money(totals.accountTotal)} />
                          </ChartPanel>
                          <ChartPanel title="可动用现金" summary={`可立即动用 ${money(totals.liquidAccountTotal)}`}>
                            <HorizontalBarChart data={accountChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="账户用途映射" summary="账户余额流向">
                            <FlowMap data={accountChartData} source="账户池" valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "budget" && (
                  <Module title="预算管理" desc="预算模块保留周/月/季/年视图，固定支出率阈值为 35% 和 50%。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <div className="stat-strip">
                            <Stat label="当前视图" value={`${period} / ${shortMonth(activeMonth.label)}`} />
                            <Stat label="预算总额" value={money(totals.spendingPlan)} />
                            <Stat label="固定支出率" value={percent(totals.fixedRatio)} />
                            <Stat label="预算剩余" value={money(totals.spendingPlan - totals.spendingActual)} />
                          </div>
                          <EditableBudgetTable budgets={budgets} deleteBudget={deleteBudget} addBudget={addBudget} updateBudget={updateBudget} />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="固定 / 弹性支出" summary={fixedRatioLabel(totals.fixedRatio)}>
                            <DonutChart data={fixedFlexData} centerLabel="固定率" centerValue={percent(totals.fixedRatio)} />
                          </ChartPanel>
                          <ChartPanel title="分类预算排行" summary="看哪里最容易超">
                            <HorizontalBarChart data={spendingChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="预算使用热力" summary="实际 / 预算">
                            <HeatmapGrid data={budgetHeatData} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "investment" && (
                  <Module title="投资管理" desc="投资理财单独成栏，A股 / 美股 / 港股分开看；计划投入和市值都能改。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="form-grid">
                            <EditableNumber label="美元兑人民币" value={fxUsd} onChange={setFxUsd} step={0.01} />
                            <EditableNumber label="港币兑人民币" value={fxHkd} onChange={setFxHkd} step={0.01} />
                            <EditableNumber label="A股月计划投入" value={aSharePlan} onChange={setASharePlan} />
                            <EditableNumber label="美股月计划投入" value={usSharePlan} onChange={setUsSharePlan} />
                            <EditableNumber label="港股月计划投入" value={hkSharePlan} onChange={setHkSharePlan} />
                          </div>
                          <EditableHoldingTable
                            holdings={holdings}
                            addHolding={addHolding}
                            deleteHolding={deleteHolding}
                            fxHkd={fxHkd}
                            fxUsd={fxUsd}
                            updateHolding={updateHolding}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="市场分布" summary={`投资市值 ${money(totals.investmentValue)}`}>
                            <DonutChart data={investmentChartData} centerLabel="投资" centerValue={money(totals.investmentValue)} />
                          </ChartPanel>
                          <ChartPanel title="盈亏绝对值" summary={`总盈亏 ${money(totals.investmentPnL)}`}>
                            <HorizontalBarChart data={holdingRows} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="收益率 / 仓位" summary="横轴仓位，纵轴收益">
                            <ScatterPlot data={investmentScatter} xLabel="仓位" yLabel="收益" />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "balance" && (
                  <Module title="资产负债表" desc="资产项和负债项都支持新增、删除和直接编辑。">
                    <DataChartLayout
                      data={
                        <>
                          <EditableBalanceAssetTable
                            addBalanceAsset={addBalanceAsset}
                            balanceAssets={balanceAssets}
                            deleteBalanceAsset={deleteBalanceAsset}
                            totalAssets={totals.totalAssets}
                            updateBalanceAsset={updateBalanceAsset}
                          />
                          <EditableDebtTable
                            addLiability={addLiability}
                            deleteLiability={deleteLiability}
                            liabilities={liabilities}
                            updateLiability={updateLiability}
                          />
                          <div className="stat-strip">
                            <Stat label="总资产" value={money(totals.totalAssets)} />
                            <Stat label="总负债" value={money(totals.totalDebt)} />
                            <Stat label="净资产" value={money(totals.netWorth)} />
                            <Stat label="负债率" value={percent(totals.debtRatio)} />
                          </div>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="资产负债对比" summary={`净资产 ${money(totals.netWorth)}`}>
                            <HorizontalBarChart data={balanceData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="负债结构" summary={totals.totalDebt ? `负债 ${money(totals.totalDebt)}` : "当前无负债"}>
                            <DonutChart data={debtData} centerLabel="负债" centerValue={money(totals.totalDebt)} />
                          </ChartPanel>
                          <ChartPanel title="资产项结构" summary={`补录资产 ${money(totals.manualAssetTotal)}`}>
                            <DonutChart data={balanceAssetData} centerLabel="资产项" centerValue={money(totals.manualAssetTotal)} />
                          </ChartPanel>
                          <ChartPanel title="净资产趋势" summary="按 6 个月现金预测推演">
                            <LineChart data={netWorthTrend} valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "emergency" && (
                  <Module title="应急金" desc="应急金单独管理，不混进普通储蓄目标。">
                    <DataChartLayout
                      data={
                        <>
                          <EditableEmergencyTable
                            emergencyFund={emergencyFund}
                            emergencyMonthlyNeed={emergencyMonthlyNeed}
                            emergencyMonths={emergencyMonths}
                            setEmergencyFund={setEmergencyFund}
                            setEmergencyMonthlyNeed={setEmergencyMonthlyNeed}
                            setEmergencyMonths={setEmergencyMonths}
                          />
                          <div className="stat-strip">
                            <Stat label="覆盖月数" value={`${totals.emergencyCoverage.toFixed(1)} 个月`} />
                            <Stat label="目标金额" value={money(totals.emergencyTarget)} />
                            <Stat label="缺口" value={money(Math.max(0, totals.emergencyTarget - emergencyFund))} />
                            <Stat label="当前进度" value={percent(totals.emergencyCoverage / Math.max(emergencyMonths, 1))} />
                          </div>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="应急金覆盖" summary={`${totals.emergencyCoverage.toFixed(1)} / ${emergencyMonths} 个月`}>
                            <ProgressList
                              data={[
                                {
                                  label: "应急金目标",
                                  value: emergencyFund,
                                  max: totals.emergencyTarget,
                                  color: palette[1],
                                  detail: `缺口 ${money(Math.max(0, totals.emergencyTarget - emergencyFund))}`,
                                },
                              ]}
                              valueFormatter={money}
                            />
                          </ChartPanel>
                          <ChartPanel title="必要支出压力" summary={`应急基准 ${money(totals.emergencyMonthlyNeed)}`}>
                            <HorizontalBarChart
                              data={[
                                { label: "应急月均支出", value: totals.emergencyMonthlyNeed, color: palette[1] },
                                { label: "预算必要支出", value: totals.requiredSpending, color: palette[2] },
                                { label: "预算总额", value: totals.spendingPlan, color: palette[4] },
                              ]}
                              valueFormatter={money}
                            />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "reminders" && (
                  <Module title="账单与提醒" desc="网页内提醒，默认提前 7 天；金额可先手动维护。">
                    <DataChartLayout
                      data={
                        <EditableReminderTable
                          reminders={reminders}
                          addReminder={addReminder}
                          deleteReminder={deleteReminder}
                          updateReminder={updateReminder}
                        />
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="提醒金额" summary="避免漏扣">
                            <HorizontalBarChart data={reminderAmountData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="距离到期" summary="以 2026-06-14 为当前日">
                            <VerticalBarChart data={reminderDaysData} valueFormatter={(value) => `${value.toFixed(0)}天`} />
                          </ChartPanel>
                          <ChartPanel title="提醒日历" summary="未来关键扣款">
                            <CashflowCalendar events={cashflowEvents} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "goals" && (
                  <Module title="目标管理" desc="旅游、学习、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <EditableGoalsTable
                            goals={goals}
                            addGoal={addGoal}
                            deleteGoal={deleteGoal}
                            updateGoal={updateGoal}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="目标进度" summary="当前 / 目标">
                            <ProgressList data={goalProgress} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="每月预期准备结构" summary={`预期 ${money(totalGoalExpectedInput)}`}>
                            <DonutChart
                              data={goals.map((item, index) => ({
                                label: item.name,
                                value: item.monthly,
                                color: palette[index % palette.length],
                              }))}
                              centerLabel="每月"
                              centerValue={money(totalGoalExpectedInput)}
                            />
                          </ChartPanel>
                          <ChartPanel title="月度实际目标投入" summary={`实际投入 ${money(totalGoalActualInput)}`}>
                            <VerticalBarChart data={monthlyGoalInputTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="支出与投入压力" summary="实际支出 + 实际投入">
                            <VerticalBarChart data={monthlyGoalPressureTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="累计准备变化" summary={`当前 ${money(totalGoalCurrent)}`}>
                            <LineChart data={monthlyGoalBalanceTrend} valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "reports" && (
                  <Module title="财务报表" desc="月度复盘先给关键结论，后续可以接历史数据做趋势。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="stat-strip">
                            <Stat label="收入" value={money(actualIncome)} />
                            <Stat label="支出" value={money(totals.spendingActual)} />
                            <Stat label="结余" value={money(totals.monthlySurplus)} />
                            <Stat label="储蓄率" value={percent(totals.savingsRate)} />
                          </div>
                          <ReportAutoSyncTable
                            allocation={totals.assetOutflow}
                            income={actualIncome}
                            rows={reportRows}
                            spending={totals.spendingActual}
                            surplus={totals.monthlySurplus}
                          />
                          <p className="review-copy">
                            {activeMonth.label} 实际收入 {money(actualIncome)}，已记录支出 {money(totals.spendingActual)}，
                            资产分配 {money(totals.assetOutflow)}。投资浮动盈亏 {money(totals.investmentPnL)}。
                            下月重点关注现金流预测、固定支出率和 7 天内提醒。
                          </p>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="本月资金流向" summary={`储蓄率 ${percent(totals.savingsRate)}`}>
                            <VerticalBarChart data={reportData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度收支对比" summary="收入和支出分月查看">
                            <VerticalBarChart data={[...monthlyIncomeTrend, ...monthlySpendingTrend]} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="现金流未来趋势" summary={`6个月末 ${money(forecast[forecast.length - 1]?.balance ?? 0)}`}>
                            <LineChart data={cashflowLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="资金瀑布复盘" summary="收入、支出、分配">
                            <WaterfallChart data={waterfallData} />
                          </ChartPanel>
                          <ChartPanel title="风险矩阵" summary="下月关注点">
                            <RiskMatrix data={riskMatrixData} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "health" && (
                  <Module title="财务健康评分" desc="100 分制，用现金流、应急金、负债、增长和趋势综合判断。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="health-score" style={{ "--score": `${totals.score}%` } as CSSProperties}>
                            <strong>{totals.score}</strong>
                            <span>财务健康分</span>
                          </div>
                          <EditableHealthInputsTable
                            emergencyMonthlyNeed={emergencyMonthlyNeed}
                            emergencyMonths={emergencyMonths}
                            addLiability={addLiability}
                            deleteLiability={deleteLiability}
                            liabilities={liabilities}
                            setEmergencyMonthlyNeed={setEmergencyMonthlyNeed}
                            setEmergencyMonths={setEmergencyMonths}
                            updateLiability={updateLiability}
                          />
                          <div className="stat-strip">
                            <Stat label="固定支出率" value={percent(totals.fixedRatio)} />
                            <Stat label="应急覆盖" value={`${totals.emergencyCoverage.toFixed(1)}个月`} />
                            <Stat label="负债率" value={percent(totals.debtRatio)} />
                            <Stat label="投资盈亏" value={money(totals.investmentPnL)} />
                          </div>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="健康维度拆解" summary="五项分数">
                            <HorizontalBarChart data={healthDimensions} valueFormatter={(value) => `${value.toFixed(0)}分`} percentMode />
                          </ChartPanel>
                          <ChartPanel title="资产抗风险结构" summary="账户 / 应急 / 负债">
                            <DonutChart data={assetStructureData} centerLabel="覆盖" centerValue={`${totals.emergencyCoverage.toFixed(1)}月`} />
                          </ChartPanel>
                          <ChartPanel title="风险矩阵" summary="影响 × 紧迫">
                            <RiskMatrix data={riskMatrixData} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "future" && (
                  <Module title="数据能力" desc="债务、保险、数据质量、规则引擎先放结构，等后续数据补齐再激活。">
                    <DataChartLayout
                      data={
                        <EditableCapabilityTable capabilities={futureCapabilities} updateCapability={updateFutureCapability} />
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="能力成熟度" summary="未来模块占位评分">
                            <HorizontalBarChart data={futureCapabilityData} valueFormatter={(value) => `${value.toFixed(0)}分`} percentMode />
                          </ChartPanel>
                          <ChartPanel title="规则覆盖路线" summary="自动分类 / 校验 / 提醒">
                            <StackedBar data={futureCapabilityData} valueFormatter={(value) => `${value.toFixed(0)}分`} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}
              </section>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

function toCny(value: number, currency: Holding["currency"], fxUsd: number, fxHkd: number) {
  if (currency === "USD") return value * fxUsd;
  if (currency === "HKD") return value * fxHkd;
  return value;
}

function fixedRatioLabel(value: number) {
  if (value < 0.35) return "低于 35%，健康";
  if (value <= 0.5) return "35%-50%，注意";
  return "高于 50%，风险";
}

function DataChartLayout({ data, charts }: { data: ReactNode; charts: ReactNode }) {
  return (
    <div className="data-chart-layout">
      <section className="data-pane">
        <div className="pane-label">数据区</div>
        {data}
      </section>
      <section className="chart-pane">
        <div className="pane-label">图表区</div>
        {charts}
      </section>
    </div>
  );
}

function Module({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <>
      <div className="section-title">
        <div>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>
      <div className="module-body">{children}</div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function MonthSelector({
  records,
  selectedMonth,
  onAddMonth,
  onChange,
  onDeleteSelectedMonth,
}: {
  records: MonthRecord[];
  selectedMonth: string;
  onAddMonth?: () => void;
  onChange: (month: string) => void;
  onDeleteSelectedMonth?: () => void;
}) {
  return (
    <div className="month-selector-shell">
      <div className="month-selector" aria-label="月份切换">
        {records.map((record) => (
          <button
            className={record.id === selectedMonth ? "active" : ""}
            key={record.id}
            type="button"
            onClick={() => onChange(record.id)}
          >
            <strong>{shortMonth(record.label)}</strong>
            <span>{record.id === selectedMonth ? "当前" : "切换"}</span>
          </button>
        ))}
      </div>
      {(onAddMonth || onDeleteSelectedMonth) && (
        <div className="month-selector-actions">
          {onAddMonth && (
            <button className="secondary-button" type="button" onClick={onAddMonth}>
              新增月份
            </button>
          )}
          {onDeleteSelectedMonth && (
            <button
              className="danger-button"
              disabled={records.length <= 1}
              type="button"
              onClick={onDeleteSelectedMonth}
            >
              删除当前月
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ChartPanel({ title, summary, children, className = "" }: { title: string; summary: string; children: ReactNode; className?: string }) {
  return (
    <article className={`chart-panel ${className}`.trim()}>
      <div className="chart-head">
        <strong>{title}</strong>
        <span>{summary}</span>
      </div>
      {children}
    </article>
  );
}

function TableNumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 100,
  ariaLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel: string;
}) {
  return (
    <input
      aria-label={ariaLabel}
      className="table-input"
      inputMode="decimal"
      max={max}
      min={min}
      step={step}
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => onChange(numberValue(event.target.value))}
    />
  );
}

function TableTextInput({
  value,
  onChange,
  ariaLabel,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
}) {
  return (
    <input
      aria-label={ariaLabel}
      className="table-input text"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function TableDateInput({
  value,
  onChange,
  ariaLabel,
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <input
      aria-label={ariaLabel}
      className="table-input"
      type="date"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function TableSelect({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <select className="table-input" aria-label={ariaLabel} value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function TableCheckbox({ checked, onChange, ariaLabel }: { checked: boolean; onChange: (checked: boolean) => void; ariaLabel: string }) {
  return (
    <input
      aria-label={ariaLabel}
      checked={checked}
      className="table-check"
      type="checkbox"
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}

function TableToolbar({ title, meta, action }: { title: string; meta: string; action?: ReactNode }) {
  return (
    <div className="table-toolbar">
      <div>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
      {action}
    </div>
  );
}

function EditableMonthlyIncomeTable({
  records,
  selectedMonth,
  onSelect,
  addMonthRecord,
  deleteMonthRecord,
  updateMonthRecord,
}: {
  records: MonthRecord[];
  selectedMonth: string;
  onSelect: (month: string) => void;
  addMonthRecord: () => void;
  deleteMonthRecord: (monthId: string) => void;
  updateMonthRecord: (monthId: string, patch: Partial<Omit<MonthRecord, "id" | "label" | "budgets">>) => void;
}) {
  const active = records.find((record) => record.id === selectedMonth) ?? records[0];
  return (
    <>
      <TableToolbar
        title="月度收入底表"
        meta={`${records.length} 个月 / 当前 ${active.label} / 实际收入 ${money(recordIncome(active))}`}
        action={<button className="secondary-button" type="button" onClick={addMonthRecord}>新增月份</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>月份</th>
              <th>工资</th>
              <th>到账日</th>
              <th>炒股月结</th>
              <th>其他收入</th>
              <th>实际收入</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr className={record.id === selectedMonth ? "selected-row" : ""} key={record.id}>
                <td>
                  <button className="row-select-button" type="button" onClick={() => onSelect(record.id)}>
                    {record.label}
                  </button>
                </td>
                <td>
                  <TableNumberInput ariaLabel={`${record.label} 工资`} value={record.salary} onChange={(value) => updateMonthRecord(record.id, { salary: value })} />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`${record.label} 到账日`}
                    max={31}
                    min={1}
                    step={1}
                    value={record.payday}
                    onChange={(value) => updateMonthRecord(record.id, { payday: value })}
                  />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`${record.label} 炒股月结`}
                    value={record.stockIncome}
                    onChange={(value) => updateMonthRecord(record.id, { stockIncome: value })}
                  />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`${record.label} 其他收入`}
                    value={record.otherIncome}
                    onChange={(value) => updateMonthRecord(record.id, { otherIncome: value })}
                  />
                </td>
                <td className="calculated-cell">{money(recordIncome(record))}</td>
                <td><span className={record.id === selectedMonth ? "pill good" : "pill"}>{record.id === selectedMonth ? "当前" : "可选"}</span></td>
                <td>
                  <button
                    className="danger-button compact"
                    disabled={records.length <= 1}
                    type="button"
                    onClick={() => deleteMonthRecord(record.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableCashflowInputsTable({
  accountTotal,
  addCashflowCustomItem,
  monthlyInflow,
  monthlyOutflow,
  rows,
}: {
  accountTotal: number;
  addCashflowCustomItem: () => void;
  monthlyInflow: number;
  monthlyOutflow: number;
  rows: CashflowTableRow[];
}) {
  return (
    <>
      <TableToolbar
        title="现金流参数底表"
        meta={`月流入 ${money(monthlyInflow)} / 月流出 ${money(monthlyOutflow)} / 期初现金 ${money(accountTotal)}`}
        action={<button className="secondary-button" type="button" onClick={addCashflowCustomItem}>新增现金流</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>项目</th>
              <th>数值</th>
              <th>口径</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td className="calculated-cell" colSpan={4}>暂无现金流行，点击新增现金流开始录入。</td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.onNameChange ? (
                    <TableTextInput ariaLabel={`${row.name} 项目`} value={row.name} onChange={row.onNameChange} />
                  ) : (
                    row.name
                  )}
                </td>
                <td>
                  {row.readonlyAmount || !row.onAmountChange ? (
                    <span className="calculated-cell">{money(row.amount)}</span>
                  ) : (
                    <TableNumberInput ariaLabel={`${row.name} 数值`} value={row.amount} onChange={row.onAmountChange} />
                  )}
                </td>
                <td>
                  {row.onDirectionChange ? (
                    <TableSelect
                      ariaLabel={`${row.name} 口径`}
                      options={["现金流出", "计入预测"]}
                      value={row.direction === "inflow" ? "计入预测" : "现金流出"}
                      onChange={(value) => row.onDirectionChange?.(value === "计入预测" ? "inflow" : "outflow")}
                    />
                  ) : (
                    row.source
                  )}
                </td>
                <td>
                  {row.onDelete ? (
                    <button className="danger-button compact" type="button" onClick={row.onDelete}>
                      删除
                    </button>
                  ) : (
                    <span className="calculated-cell">自动同步</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableAccountsTable({
  accounts,
  total,
  liquidAccountTotal,
  updateAccount,
  addAccount,
  deleteAccount,
  reorderAccount,
}: {
  accounts: Account[];
  total: number;
  liquidAccountTotal: number;
  updateAccount: (id: string, patch: Partial<Account>) => void;
  addAccount: () => void;
  deleteAccount: (id: string) => void;
  reorderAccount: (draggedId: string, targetId: string) => void;
}) {
  const [draggedAccountId, setDraggedAccountId] = useState<string | null>(null);

  return (
    <>
      <TableToolbar
        title="账户底表"
        meta={`${accounts.length} 个账户 / 合计 ${money(total)} / 可动用 ${money(liquidAccountTotal)}`}
        action={<button className="secondary-button" type="button" onClick={addAccount}>新增账户</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th className="drag-column">排序</th>
              <th>账户名称</th>
              <th>类型</th>
              <th>余额</th>
              <th>用途</th>
              <th>可动用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((item, index) => (
              <tr
                className={draggedAccountId === item.id ? "dragging" : ""}
                key={item.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (draggedAccountId) reorderAccount(draggedAccountId, item.id);
                  setDraggedAccountId(null);
                }}
                onMouseEnter={() => {
                  if (draggedAccountId && draggedAccountId !== item.id) reorderAccount(draggedAccountId, item.id);
                }}
                onMouseUp={() => setDraggedAccountId(null)}
              >
                <td className="drag-column">
                  <span
                    aria-label={`${item.name} 拖动排序`}
                    className="drag-handle"
                    draggable
                    role="button"
                    tabIndex={0}
                    title="拖动排序"
                    onDragEnd={() => setDraggedAccountId(null)}
                    onDragStart={(event) => {
                      setDraggedAccountId(item.id);
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", item.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowUp" && index > 0) {
                        event.preventDefault();
                        reorderAccount(item.id, accounts[index - 1].id);
                      }
                      if (event.key === "ArrowDown" && index < accounts.length - 1) {
                        event.preventDefault();
                        reorderAccount(item.id, accounts[index + 1].id);
                      }
                    }}
                    onMouseDown={() => setDraggedAccountId(item.id)}
                  >
                    ⋮⋮
                  </span>
                </td>
                <td><TableTextInput ariaLabel={`${item.name} 账户名称`} value={item.name} onChange={(value) => updateAccount(item.id, { name: value })} /></td>
                <td><TableTextInput ariaLabel={`${item.name} 类型`} value={item.type} onChange={(value) => updateAccount(item.id, { type: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 余额`} value={item.balance} onChange={(value) => updateAccount(item.id, { balance: value })} /></td>
                <td><TableTextInput ariaLabel={`${item.name} 用途`} value={item.purpose} onChange={(value) => updateAccount(item.id, { purpose: value })} /></td>
                <td><TableCheckbox ariaLabel={`${item.name} 可动用`} checked={item.liquid} onChange={(value) => updateAccount(item.id, { liquid: value })} /></td>
                <td>
                  <button className="danger-button compact" disabled={accounts.length <= 1} type="button" onClick={() => deleteAccount(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableHoldingTable({
  holdings,
  fxUsd,
  fxHkd,
  updateHolding,
  addHolding,
  deleteHolding,
}: {
  holdings: Holding[];
  fxUsd: number;
  fxHkd: number;
  updateHolding: (id: string, patch: Partial<Holding>) => void;
  addHolding: () => void;
  deleteHolding: (id: string) => void;
}) {
  const totalValue = holdings.reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
  return (
    <>
      <TableToolbar
        title="投资持仓底表"
        meta={`持仓 ${holdings.length} 项 / 市值 ${money(totalValue)}`}
        action={<button className="secondary-button" type="button" onClick={addHolding}>新增持仓</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>名称</th>
              <th>市场</th>
              <th>币种</th>
              <th>成本</th>
              <th>当前市值</th>
              <th>折人民币</th>
              <th>盈亏</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((item) => {
              const valueCny = toCny(item.value, item.currency, fxUsd, fxHkd);
              const costCny = toCny(item.cost, item.currency, fxUsd, fxHkd);
              return (
                <tr key={item.id}>
                  <td><TableTextInput ariaLabel={`${item.name} 名称`} value={item.name} onChange={(value) => updateHolding(item.id, { name: value })} /></td>
                  <td>
                    <TableSelect
                      ariaLabel={`${item.name} 市场`}
                      options={["A股", "美股", "港股"]}
                      value={item.market}
                      onChange={(value) => updateHolding(item.id, { market: value as Holding["market"] })}
                    />
                  </td>
                  <td>
                    <TableSelect
                      ariaLabel={`${item.name} 币种`}
                      options={["CNY", "USD", "HKD"]}
                      value={item.currency}
                      onChange={(value) => updateHolding(item.id, { currency: value as Holding["currency"] })}
                    />
                  </td>
                  <td><TableNumberInput ariaLabel={`${item.name} 成本`} value={item.cost} onChange={(value) => updateHolding(item.id, { cost: value })} /></td>
                  <td><TableNumberInput ariaLabel={`${item.name} 当前市值`} value={item.value} onChange={(value) => updateHolding(item.id, { value })} /></td>
                  <td className="calculated-cell">{money(valueCny)}</td>
                  <td className={valueCny >= costCny ? "positive" : "negative"}>{money(valueCny - costCny)}</td>
                  <td>
                    <button className="danger-button compact" disabled={holdings.length <= 1} type="button" onClick={() => deleteHolding(item.id)}>
                      删除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableBalanceAssetTable({
  balanceAssets,
  totalAssets,
  updateBalanceAsset,
  addBalanceAsset,
  deleteBalanceAsset,
}: {
  balanceAssets: BalanceAsset[];
  totalAssets: number;
  updateBalanceAsset: (id: string, patch: Partial<BalanceAsset>) => void;
  addBalanceAsset: () => void;
  deleteBalanceAsset: (id: string) => void;
}) {
  const manualTotal = balanceAssets.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <TableToolbar
        title="资产底表"
        meta={`${balanceAssets.length} 项 / 补录资产 ${money(manualTotal)} / 总资产 ${money(totalAssets)}`}
        action={<button className="secondary-button" type="button" onClick={addBalanceAsset}>新增资产</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>资产项</th>
              <th>金额</th>
              <th>说明</th>
              <th>占总资产</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {balanceAssets.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableTextInput
                    ariaLabel={`${item.name} 资产项`}
                    value={item.name}
                    onChange={(value) => updateBalanceAsset(item.id, { name: value })}
                  />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`${item.name} 资产金额`}
                    value={item.amount}
                    onChange={(value) => updateBalanceAsset(item.id, { amount: value })}
                  />
                </td>
                <td>
                  <TableTextInput
                    ariaLabel={`${item.name} 资产说明`}
                    value={item.note}
                    onChange={(value) => updateBalanceAsset(item.id, { note: value })}
                  />
                </td>
                <td className="calculated-cell">{percent(totalAssets ? item.amount / totalAssets : 0)}</td>
                <td>
                  <button className="danger-button compact" disabled={balanceAssets.length <= 1} type="button" onClick={() => deleteBalanceAsset(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableDebtTable({
  liabilities,
  updateLiability,
  addLiability,
  deleteLiability,
}: {
  liabilities: Liability[];
  updateLiability: (id: string, patch: Partial<Liability>) => void;
  addLiability: () => void;
  deleteLiability: (id: string) => void;
}) {
  const total = liabilities.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <TableToolbar
        title="负债底表"
        meta={`${liabilities.length} 项 / 总负债 ${money(total)}`}
        action={<button className="secondary-button" type="button" onClick={addLiability}>新增负债</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>负债项</th>
              <th>金额</th>
              <th>占比</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {liabilities.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableTextInput
                    ariaLabel={`${item.name} 负债项`}
                    value={item.name}
                    onChange={(value) => updateLiability(item.id, { name: value })}
                  />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`${item.name} 金额`}
                    value={item.amount}
                    onChange={(value) => updateLiability(item.id, { amount: value })}
                  />
                </td>
                <td className="calculated-cell">{percent(total ? item.amount / total : 0)}</td>
                <td>
                  <button className="danger-button compact" disabled={liabilities.length <= 1} type="button" onClick={() => deleteLiability(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableEmergencyTable({
  emergencyFund,
  setEmergencyFund,
  emergencyMonths,
  setEmergencyMonths,
  emergencyMonthlyNeed,
  setEmergencyMonthlyNeed,
}: {
  emergencyFund: number;
  setEmergencyFund: (value: number) => void;
  emergencyMonths: number;
  setEmergencyMonths: (value: number) => void;
  emergencyMonthlyNeed: number;
  setEmergencyMonthlyNeed: (value: number) => void;
}) {
  const target = emergencyMonthlyNeed * emergencyMonths;
  return (
    <>
      <TableToolbar title="应急金底表" meta={`目标 ${money(target)} / 当前 ${money(emergencyFund)}`} />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>项目</th>
              <th>数值</th>
              <th>结果</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>当前应急金</td>
              <td><TableNumberInput ariaLabel="当前应急金" value={emergencyFund} onChange={setEmergencyFund} /></td>
              <td className="calculated-cell">覆盖 {emergencyMonthlyNeed ? (emergencyFund / emergencyMonthlyNeed).toFixed(1) : "0.0"} 月</td>
            </tr>
            <tr>
              <td>目标覆盖月数</td>
              <td><TableNumberInput ariaLabel="目标覆盖月数" step={1} value={emergencyMonths} onChange={setEmergencyMonths} /></td>
              <td className="calculated-cell">{emergencyMonths} 个月</td>
            </tr>
            <tr>
              <td>月均必要支出</td>
              <td><TableNumberInput ariaLabel="月均必要支出" value={emergencyMonthlyNeed} onChange={setEmergencyMonthlyNeed} /></td>
              <td className="calculated-cell">缺口 {money(Math.max(0, target - emergencyFund))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableReminderTable({
  reminders,
  updateReminder,
  addReminder,
  deleteReminder,
}: {
  reminders: Reminder[];
  updateReminder: (id: string, patch: Partial<Reminder>) => void;
  addReminder: () => void;
  deleteReminder: (id: string) => void;
}) {
  const total = reminders.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <TableToolbar
        title="提醒底表"
        meta={`${reminders.length} 条 / 金额 ${money(total)}`}
        action={<button className="secondary-button" type="button" onClick={addReminder}>新增提醒</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>事项</th>
              <th>日期</th>
              <th>金额</th>
              <th>类型</th>
              <th>距离</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((item) => (
              <tr key={item.id}>
                <td><TableTextInput ariaLabel={`${item.name} 事项`} value={item.name} onChange={(value) => updateReminder(item.id, { name: value })} /></td>
                <td><TableDateInput ariaLabel={`${item.name} 日期`} value={item.date} onChange={(value) => updateReminder(item.id, { date: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 金额`} value={item.amount} onChange={(value) => updateReminder(item.id, { amount: value })} /></td>
                <td><TableTextInput ariaLabel={`${item.name} 类型`} value={item.kind} onChange={(value) => updateReminder(item.id, { kind: value })} /></td>
                <td className="calculated-cell">{Math.max(0, dayDistance(item.date))} 天</td>
                <td>
                  <button className="danger-button compact" disabled={reminders.length <= 1} type="button" onClick={() => deleteReminder(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableGoalsTable({
  goals,
  updateGoal,
  addGoal,
  deleteGoal,
}: {
  goals: Goal[];
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  addGoal: () => void;
  deleteGoal: (id: string) => void;
}) {
  const totalTarget = goals.reduce((sum, item) => sum + item.target, 0);
  const totalCurrent = goals.reduce((sum, item) => sum + item.current, 0);
  const totalActualMonthly = goals.reduce((sum, item) => sum + item.actualMonthly, 0);
  return (
    <>
      <TableToolbar
        title="目标底表"
        meta={`当前 ${money(totalCurrent)} / 目标 ${money(totalTarget)} / 本月实际投入 ${money(totalActualMonthly)}`}
        action={<button className="secondary-button" type="button" onClick={addGoal}>新增目标</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>目标</th>
              <th>目标金额</th>
              <th>当前金额</th>
              <th>每月预期准备</th>
              <th>本月实际投入</th>
              <th>进度</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((item) => (
              <tr key={item.id}>
                <td><TableTextInput ariaLabel={`${item.name} 名称`} value={item.name} onChange={(value) => updateGoal(item.id, { name: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 目标金额`} value={item.target} onChange={(value) => updateGoal(item.id, { target: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 当前金额`} value={item.current} onChange={(value) => updateGoal(item.id, { current: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 每月预期准备`} value={item.monthly} onChange={(value) => updateGoal(item.id, { monthly: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 本月实际投入`} value={item.actualMonthly} onChange={(value) => updateGoal(item.id, { actualMonthly: value })} /></td>
                <td className="calculated-cell">{percent(item.target ? item.current / item.target : 0)}</td>
                <td>
                  <button className="danger-button compact" disabled={goals.length <= 1} type="button" onClick={() => deleteGoal(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ReportAutoSyncTable({
  rows,
  income,
  spending,
  allocation,
  surplus,
}: {
  rows: ReportRow[];
  income: number;
  spending: number;
  allocation: number;
  surplus: number;
}) {
  return (
    <>
      <TableToolbar
        title="报表自动同步表"
        meta={`收入 ${money(income)} / 支出 ${money(spending)} / 分配 ${money(allocation)} / 余额 ${money(surplus)}`}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>项目</th>
              <th>数值</th>
              <th>流向</th>
              <th>来源</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  <span className={`calculated-cell ${row.amount < 0 ? "negative" : ""}`.trim()}>{money(row.amount)}</span>
                </td>
                <td>{row.flow}</td>
                <td>{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableHealthInputsTable({
  emergencyMonths,
  setEmergencyMonths,
  emergencyMonthlyNeed,
  setEmergencyMonthlyNeed,
  liabilities,
  updateLiability,
  addLiability,
  deleteLiability,
}: {
  emergencyMonths: number;
  setEmergencyMonths: (value: number) => void;
  emergencyMonthlyNeed: number;
  setEmergencyMonthlyNeed: (value: number) => void;
  liabilities: Liability[];
  updateLiability: (id: string, patch: Partial<Liability>) => void;
  addLiability: () => void;
  deleteLiability: (id: string) => void;
}) {
  const totalDebt = liabilities.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <TableToolbar
        title="健康评分输入底表"
        meta={`目标覆盖 ${emergencyMonths} 月 / 负债 ${money(totalDebt)}`}
        action={<button className="secondary-button" type="button" onClick={addLiability}>新增负债</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>项目</th>
              <th>数值</th>
              <th>影响</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>目标覆盖月数</td>
              <td><TableNumberInput ariaLabel="健康目标覆盖月数" step={1} value={emergencyMonths} onChange={setEmergencyMonths} /></td>
              <td>抗风险能力</td>
              <td className="calculated-cell">固定项</td>
            </tr>
            <tr>
              <td>月均必要支出</td>
              <td><TableNumberInput ariaLabel="健康月均必要支出" value={emergencyMonthlyNeed} onChange={setEmergencyMonthlyNeed} /></td>
              <td>应急覆盖</td>
              <td className="calculated-cell">固定项</td>
            </tr>
            {liabilities.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableTextInput
                    ariaLabel={`健康 ${item.name} 负债项`}
                    value={item.name}
                    onChange={(value) => updateLiability(item.id, { name: value })}
                  />
                </td>
                <td>
                  <TableNumberInput
                    ariaLabel={`健康 ${item.name} 金额`}
                    value={item.amount}
                    onChange={(value) => updateLiability(item.id, { amount: value })}
                  />
                </td>
                <td>负债率</td>
                <td>
                  <button className="danger-button compact" disabled={liabilities.length <= 1} type="button" onClick={() => deleteLiability(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EditableCapabilityTable({
  capabilities,
  updateCapability,
}: {
  capabilities: FutureCapability[];
  updateCapability: (id: string, patch: Partial<FutureCapability>) => void;
}) {
  const average = capabilities.reduce((sum, item) => sum + item.score, 0) / Math.max(capabilities.length, 1);
  return (
    <>
      <TableToolbar title="数据能力底表" meta={`平均成熟度 ${average.toFixed(0)} 分`} />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>能力</th>
              <th>成熟度</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {capabilities.map((item) => (
              <tr key={item.id}>
                <td><TableTextInput ariaLabel={`${item.name} 名称`} value={item.name} onChange={(value) => updateCapability(item.id, { name: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 成熟度`} max={100} step={1} value={item.score} onChange={(value) => updateCapability(item.id, { score: clamp(value) })} /></td>
                <td><span className={item.score >= 70 ? "pill good" : item.score >= 40 ? "pill warn" : "pill"}>{item.score >= 70 ? "可用" : item.score >= 40 ? "建设中" : "待补齐"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function DonutChart({
  data,
  centerLabel,
  centerValue,
}: {
  data: ChartDatum[];
  centerLabel: string;
  centerValue: string;
}) {
  const rows = data.filter((item) => item.value > 0);
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;

  return (
    <div className="donut-layout">
      <svg className="donut-chart" viewBox="0 0 100 100" role="img" aria-label={`${centerLabel} ${centerValue}`}>
        <circle cx="50" cy="50" r="37" fill="none" stroke="#e5edf5" strokeWidth="13" />
        {total > 0 &&
          rows.map((item, index) => {
            const share = (item.value / total) * 100;
            const strokeDashoffset = -offset;
            offset += share;
            return (
              <circle
                cx="50"
                cy="50"
                fill="none"
                key={item.label}
                pathLength={100}
                r="37"
                stroke={item.color ?? palette[index % palette.length]}
                strokeDasharray={`${share} ${100 - share}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                strokeWidth="13"
                transform="rotate(-90 50 50)"
              />
            );
          })}
        <text className="donut-value" x="50" y="47">
          {centerValue}
        </text>
        <text className="donut-label" x="50" y="60">
          {centerLabel}
        </text>
      </svg>
      <Legend data={rows.length ? rows : [{ label: "暂无数据", value: 1, color: "#b8c4d4" }]} valueFormatter={money} />
    </div>
  );
}

function Legend({ data, valueFormatter }: { data: ChartDatum[]; valueFormatter: (value: number) => string }) {
  return (
    <div className="legend">
      {data.map((item, index) => (
        <div className="legend-item" key={item.label}>
          <span style={{ backgroundColor: item.color ?? palette[index % palette.length] }} />
          <strong>{item.label}</strong>
          <em>{item.detail ?? valueFormatter(item.value)}</em>
        </div>
      ))}
    </div>
  );
}

function HorizontalBarChart({
  data,
  valueFormatter,
  percentMode = false,
}: {
  data: ChartDatum[];
  valueFormatter: (value: number) => string;
  percentMode?: boolean;
}) {
  const max = Math.max(...data.map((item) => item.max ?? item.value), percentMode ? 100 : 1);
  return (
    <div className="horizontal-bars">
      {data.map((item, index) => {
        const denominator = item.max ?? max;
        const width = clamp((item.value / Math.max(denominator, 1)) * 100);
        return (
          <div className="bar-row" key={item.label}>
            <div className="bar-meta">
              <span>{item.label}</span>
              <strong>{item.detail ?? valueFormatter(item.value)}</strong>
            </div>
            <div className="bar-track" aria-label={`${item.label} ${valueFormatter(item.value)}`}>
              <span
                className="bar-fill"
                style={{ width: `${width}%`, backgroundColor: item.color ?? palette[index % palette.length] }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VerticalBarChart({ data, valueFormatter }: { data: ChartDatum[]; valueFormatter: (value: number) => string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="vertical-bars">
      {data.map((item, index) => {
        const height = clamp((item.value / max) * 100, 4, 100);
        return (
          <div className="vbar" key={item.label}>
            <div className="vbar-frame" aria-label={`${item.label} ${valueFormatter(item.value)}`}>
              <span
                className="vbar-fill"
                style={{ height: `${height}%`, backgroundColor: item.color ?? palette[index % palette.length] }}
              />
            </div>
            <strong>{item.label}</strong>
            <em>{item.detail ?? valueFormatter(item.value)}</em>
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ data, valueFormatter }: { data: LinePoint[]; valueFormatter: (value: number) => string }) {
  const width = 320;
  const height = 176;
  const padX = 26;
  const padY = 22;
  const values = data.map((item) => item.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 1);
  const span = Math.max(max - min, 1);
  const points = data.map((item, index) => {
    const x = padX + (index / Math.max(data.length - 1, 1)) * (width - padX * 2);
    const y = height - padY - ((item.value - min) / span) * (height - padY * 2);
    return { x, y, ...item };
  });
  const pointString = points.map((item) => `${item.x},${item.y}`).join(" ");
  const areaPath = `M ${points[0]?.x ?? padX} ${height - padY} L ${pointString} L ${points[points.length - 1]?.x ?? width - padX} ${height - padY} Z`;

  return (
    <div className="line-chart-wrap">
      <svg className="line-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="趋势折线图">
        <path d={areaPath} fill="rgba(31, 95, 191, 0.12)" />
        <polyline fill="none" points={pointString} stroke="#1f5fbf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        {points.map((item) => (
          <g key={item.label}>
            <circle cx={item.x} cy={item.y} fill="#ffffff" r="4" stroke="#1f5fbf" strokeWidth="2" />
            <text className="line-label" x={item.x} y={height - 5}>
              {item.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="chart-caption">
        <span>最低 {valueFormatter(min)}</span>
        <span>最高 {valueFormatter(max)}</span>
      </div>
    </div>
  );
}

function StackedBar({ data, valueFormatter }: { data: ChartDatum[]; valueFormatter: (value: number) => string }) {
  const rows = data.filter((item) => item.value > 0);
  const total = rows.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="stacked-wrap">
      <div className="stacked-bar" aria-label={`合计 ${valueFormatter(total)}`}>
        {rows.length ? (
          rows.map((item, index) => (
            <span
              key={item.label}
              style={{
                width: `${(item.value / Math.max(total, 1)) * 100}%`,
                backgroundColor: item.color ?? palette[index % palette.length],
              }}
              title={`${item.label} ${valueFormatter(item.value)}`}
            />
          ))
        ) : (
          <span style={{ width: "100%", backgroundColor: "#d8e2ee" }} />
        )}
      </div>
      <Legend data={rows.length ? rows : [{ label: "暂无数据", value: 0, color: "#b8c4d4" }]} valueFormatter={valueFormatter} />
    </div>
  );
}

function ProgressList({ data, valueFormatter }: { data: ChartDatum[]; valueFormatter: (value: number) => string }) {
  return (
    <div className="progress-list">
      {data.map((item, index) => {
        const width = clamp((item.value / Math.max(item.max ?? item.value, 1)) * 100);
        return (
          <div className="progress-row" key={item.label}>
            <div className="bar-meta">
              <span>{item.label}</span>
              <strong>
                {valueFormatter(item.value)}
                {item.max ? ` / ${valueFormatter(item.max)}` : ""}
              </strong>
            </div>
            <div className="progress-track">
              <span
                className="progress-fill"
                style={{ width: `${width}%`, backgroundColor: item.color ?? palette[index % palette.length] }}
              />
            </div>
            {item.detail && <em>{item.detail}</em>}
          </div>
        );
      })}
    </div>
  );
}

function CashflowCalendar({ events }: { events: CashflowEvent[] }) {
  return (
    <div className="cashflow-calendar">
      {events.map((event) => (
        <article className="calendar-event" key={`${event.date}-${event.item}`}>
          <span>{event.date.slice(5)}</span>
          <strong>{event.item}</strong>
          <div>
            {event.inflow > 0 && <em className="positive">+{money(event.inflow)}</em>}
            {event.outflow > 0 && <em className="negative">-{money(event.outflow)}</em>}
          </div>
          <small>余额 {money(event.balance)}</small>
        </article>
      ))}
    </div>
  );
}

function WaterfallChart({ data }: { data: WaterfallDatum[] }) {
  const width = 360;
  const height = 190;
  const pad = 24;
  const bars = data.reduce<Array<WaterfallDatum & { before: number; after: number }>>((items, item) => {
    const running = items.at(-1)?.after ?? 0;
    const before = item.kind === "start" || item.kind === "end" ? 0 : running;
    const after = item.kind === "start" || item.kind === "end" ? item.value : running + item.value;
    return [...items, { ...item, before, after }];
  }, []);
  const values = bars.flatMap((item) => [item.before, item.after, 0]);
  const min = Math.min(...values);
  const max = Math.max(...values, 1);
  const span = Math.max(max - min, 1);
  const scaleY = (value: number) => height - pad - ((value - min) / span) * (height - pad * 2);
  const barWidth = (width - pad * 2) / Math.max(bars.length, 1) * 0.58;

  return (
    <div className="waterfall-wrap">
      <svg className="waterfall-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="现金瀑布图">
        <line className="axis-line" x1={pad} x2={width - pad} y1={scaleY(0)} y2={scaleY(0)} />
        {bars.map((item, index) => {
          const x = pad + index * ((width - pad * 2) / Math.max(bars.length - 1, 1)) - barWidth / 2;
          const y = Math.min(scaleY(item.before), scaleY(item.after));
          const rectHeight = Math.max(4, Math.abs(scaleY(item.before) - scaleY(item.after)));
          return (
            <g key={item.label}>
              <rect
                fill={item.color ?? (item.value >= 0 ? palette[1] : palette[4])}
                height={rectHeight}
                rx="4"
                width={barWidth}
                x={x}
                y={y}
              />
              <text className="waterfall-label" x={x + barWidth / 2} y={height - 6}>
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-caption">
        <span>流入 {money(data.filter((item) => item.value > 0 && item.kind !== "start" && item.kind !== "end").reduce((sum, item) => sum + item.value, 0))}</span>
        <span>流出 {money(Math.abs(data.filter((item) => item.value < 0).reduce((sum, item) => sum + item.value, 0)))}</span>
      </div>
    </div>
  );
}

function RiskMatrix({ data }: { data: MatrixPoint[] }) {
  const size = 320;
  const pad = 44;
  return (
    <div className="matrix-layout">
      <svg className="risk-matrix" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="风险矩阵">
        <rect className="matrix-zone low" height={(size - pad * 2) / 2} width={(size - pad * 2) / 2} x={pad} y={pad + (size - pad * 2) / 2} />
        <rect className="matrix-zone mid" height={(size - pad * 2) / 2} width={(size - pad * 2) / 2} x={pad + (size - pad * 2) / 2} y={pad + (size - pad * 2) / 2} />
        <rect className="matrix-zone mid" height={(size - pad * 2) / 2} width={(size - pad * 2) / 2} x={pad} y={pad} />
        <rect className="matrix-zone high" height={(size - pad * 2) / 2} width={(size - pad * 2) / 2} x={pad + (size - pad * 2) / 2} y={pad} />
        <line className="axis-line" x1={pad} x2={size - pad} y1={size - pad} y2={size - pad} />
        <line className="axis-line" x1={pad} x2={pad} y1={pad} y2={size - pad} />
        <text className="matrix-axis" x={size / 2} y={size - 5}>影响</text>
        <text className="matrix-axis vertical" x="12" y={size / 2}>紧迫</text>
        {data.map((item) => {
          const x = pad + (clamp(item.x) / 100) * (size - pad * 2);
          const y = size - pad - (clamp(item.y) / 100) * (size - pad * 2);
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} fill={item.color ?? palette[0]} r="8" />
              <text className="matrix-point-label" x={x} y={y - 13}>{item.label}</text>
            </g>
          );
        })}
      </svg>
      <Legend data={data.map((item) => ({ label: item.label, value: 0, detail: item.value, color: item.color }))} valueFormatter={() => ""} />
    </div>
  );
}

function FlowMap({ data, source, valueFormatter }: { data: ChartDatum[]; source: string; valueFormatter: (value: number) => string }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="flow-map">
      <div className="flow-source">{source}</div>
      <div className="flow-lines">
        {data.map((item, index) => (
          <div className="flow-row" key={item.label}>
            <span
              style={{
                width: `${clamp((item.value / max) * 100, 4, 100)}%`,
                backgroundColor: item.color ?? palette[index % palette.length],
              }}
            />
            <strong>{item.label}</strong>
            <em>{valueFormatter(item.value)}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatmapGrid({ data }: { data: ChartDatum[] }) {
  return (
    <div className="heatmap-grid">
      {data.map((item, index) => (
        <div
          className="heat-cell"
          key={item.label}
          style={{
            backgroundColor: item.color ?? palette[index % palette.length],
            opacity: 0.22 + clamp(item.value, 0, 120) / 160,
          }}
        >
          <strong>{item.label}</strong>
          <span>{item.detail ?? `${item.value.toFixed(0)}%`}</span>
        </div>
      ))}
    </div>
  );
}

function ScatterPlot({ data, xLabel, yLabel }: { data: ScatterPoint[]; xLabel: string; yLabel: string }) {
  const size = 220;
  const pad = 28;
  return (
    <div className="matrix-layout">
      <svg className="risk-matrix" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${xLabel} 和 ${yLabel} 散点图`}>
        <rect className="matrix-zone low" height={size - pad * 2} width={size - pad * 2} x={pad} y={pad} />
        <line className="axis-line" x1={pad} x2={size - pad} y1={size - pad} y2={size - pad} />
        <line className="axis-line" x1={pad} x2={pad} y1={pad} y2={size - pad} />
        <text className="matrix-axis" x={size / 2} y={size - 5}>{xLabel}</text>
        <text className="matrix-axis vertical" x="12" y={size / 2}>{yLabel}</text>
        {data.map((item) => {
          const x = pad + (clamp(item.x) / 100) * (size - pad * 2);
          const y = size - pad - (clamp(item.y) / 100) * (size - pad * 2);
          return (
            <g key={item.label}>
              <circle cx={x} cy={y} fill={item.color ?? palette[0]} r="7" />
              <text className="matrix-point-label" x={x} y={y - 10}>{item.label}</text>
            </g>
          );
        })}
      </svg>
      <Legend data={data.map((item) => ({ label: item.label, value: 0, detail: item.value, color: item.color }))} valueFormatter={() => ""} />
    </div>
  );
}

function EditableBudgetTable({
  budgets,
  updateBudget,
  addBudget,
  deleteBudget,
}: {
  budgets: Budget[];
  updateBudget: (id: string, patch: Partial<Budget>) => void;
  addBudget: () => void;
  deleteBudget: (id: string) => void;
}) {
  const plan = budgets.reduce((sum, item) => sum + item.plan, 0);
  const actual = budgets.reduce((sum, item) => sum + item.actual, 0);
  return (
    <>
      <TableToolbar
        title="预算支出底表"
        meta={`预算 ${money(plan)} / 实际 ${money(actual)} / 剩余 ${money(plan - actual)}`}
        action={<button className="secondary-button" type="button" onClick={addBudget}>新增分类</button>}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table">
          <thead>
            <tr>
              <th>分类</th>
              <th>预算</th>
              <th>实际</th>
              <th>剩余</th>
              <th>必须</th>
              <th>固定</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((item) => (
              <tr key={item.id}>
                <td>
                  <TableTextInput ariaLabel={`${item.name} 分类`} value={item.name} onChange={(value) => updateBudget(item.id, { name: value })} />
                </td>
                <td>
                  <TableNumberInput ariaLabel={`${item.name} 预算`} value={item.plan} onChange={(value) => updateBudget(item.id, { plan: value })} />
                </td>
                <td>
                  <TableNumberInput ariaLabel={`${item.name} 实际`} value={item.actual} onChange={(value) => updateBudget(item.id, { actual: value })} />
                </td>
                <td className="calculated-cell">{money(item.plan - item.actual)}</td>
                <td><TableCheckbox ariaLabel={`${item.name} 必须`} checked={item.required} onChange={(value) => updateBudget(item.id, { required: value })} /></td>
                <td><TableCheckbox ariaLabel={`${item.name} 固定`} checked={item.fixed} onChange={(value) => updateBudget(item.id, { fixed: value })} /></td>
                <td>
                  <button className="danger-button compact" disabled={budgets.length <= 1} type="button" onClick={() => deleteBudget(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
