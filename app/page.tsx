"use client";

import { useEffect, useEffectEvent, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { initialMonthlyCashPlan, normalizeMonthlyCashPlan, type MonthlyCashPlan } from "./monthly-cash-plan";
import AnnualBudgetPlanner, {AnnualBudgetAllocationTable} from "./annual-budget-plan";
import { calculateAnnualBudgetPlan, calculateCashflowScenario, initialAnnualBudgetPlan, normalizeAnnualBudgetPlan, type AnnualBudgetPlan } from "./annual-budget-model";
import {calculateLiquidity} from "./liquidity-model";
import FinanceReviewPanel from "./finance-review-panel";
import {parseFinanceReviews, reviewDayDistance, reviewDeadlineLabel, reviewMoney, reviewToday, type FinanceReview} from "./finance-review-model";
import {useFinanceToday} from "./use-finance-today";
import {financeBackupSignature, financeDataOnly, financeSaveConflict, hasPendingFinanceSave, markFinanceCloudSaved, writeLocalFinanceData} from "./finance-save-model";
import {applySalaryFromMonth, confirmedMonthlySalary, migrateSalarySettings, salarySettingsVersion} from "./salary-model";
import {addSpendingDetailPresets, getSpendingGroup, nextMonthSpendingRows, spendingGroups, summarizeLearning, type SpendingBudget as Budget} from "./spending-detail-model";

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
  | "fundBuckets"
  | "reports"
  | "periodReview"
  | "monthlyArchive"
  | "cloudSync"
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
  | "parentSaving"
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

type FundBucketKind = "应急" | "旅行" | "搬家" | "分期" | "投资" | "家庭" | "其他";

type FundBucket = {
  id: string;
  name: string;
  kind: FundBucketKind;
  target: number;
  current: number;
  dueDate: string;
  locked: boolean;
  note: string;
  fundingAccountId?: string;
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
  salarySettingsVersion?: number;
  annualBudgetPlan?: AnnualBudgetPlan;
  financeReviews?: FinanceReview[];
  monthlyCashPlan?: MonthlyCashPlan;
  period?: Period;
  selectedMonth?: string;
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
  fundBuckets: FundBucket[];
  futureCapabilities: FutureCapability[];
  cashflowHiddenBuiltinIds: CashflowBuiltinId[];
  cashflowCustomItems: CashflowCustomItem[];
};

type FinanceSnapshot = {
  id: string;
  createdAt: string;
  data: PersistedFinanceData;
};

type MonthlyArchiveAccount = Pick<Account, "id" | "name" | "type" | "balance" | "purpose" | "liquid">;

type MonthlyArchive = {
  id: string;
  monthId: string;
  label: string;
  savedAt: string;
  income: number;
  spending: number;
  allocation: number;
  surplus: number;
  accountTotal: number;
  totalAssets: number;
  netWorth: number;
  totalDebt: number;
  emergencyFund: number;
  savings: number;
  accounts: MonthlyArchiveAccount[];
};

type CloudSyncSettings = {
  gistId: string;
  token: string;
  autoSync: boolean;
  rememberPassphrase: boolean;
  lastPushedAt?: string;
  lastPulledAt?: string;
};

type CloudSyncBackup = {
  version: 1;
  exportedAt: string;
  data: PersistedFinanceData;
  snapshots: FinanceSnapshot[];
  monthlyArchives: MonthlyArchive[];
};

type CloudSyncEnvelope = {
  version: 1;
  app: "personal-finance-management";
  encryptedAt: string;
  kdf: {
    name: "PBKDF2";
    hash: "SHA-256";
    iterations: number;
    salt: string;
  };
  cipher: {
    name: "AES-GCM";
    iv: string;
    data: string;
  };
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

type GoalKind = "travel" | "learning" | "parent" | "partner" | "emergency" | "other";

const palette = ["#1f5fbf", "#07835f", "#b7791f", "#6852bd", "#c53030", "#2b6cb0", "#0f766e", "#805ad5"];

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
    salary: confirmedMonthlySalary,
    payday: 10,
    stockIncome: 0,
    otherIncome: 0,
    budgets: initialBudgets.map((item) => ({ ...item })),
  },
  { id: "2026-07", label: "2026年7月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-08", label: "2026年8月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-09", label: "2026年9月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-10", label: "2026年10月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-11", label: "2026年11月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
  { id: "2026-12", label: "2026年12月", salary: confirmedMonthlySalary, payday: 10, stockIncome: 0, otherIncome: 0, budgets: monthBudgets() },
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
  { id: "parent-saving", name: "父母储蓄", target: 0, current: 0, monthly: 0, actualMonthly: 0 },
  { id: "partner", name: "伴侣基金", target: 0, current: 0, monthly: 0, actualMonthly: 0 },
  { id: "emergency-goal", name: "应急储备", target: 13500, current: 2000, monthly: 2000, actualMonthly: 0 },
];

const fundBucketKinds: FundBucketKind[] = ["应急", "旅行", "搬家", "分期", "投资", "家庭", "其他"];

const initialFundBuckets: FundBucket[] = [
  {
    id: "hard-emergency",
    name: "硬应急金",
    kind: "应急",
    target: 4500,
    current: 0,
    dueDate: "2026-07-31",
    locked: true,
    note: "最低 1 个月必要支出，禁止挪作投资",
  },
  {
    id: "moving-2026-08",
    name: "8月搬家",
    kind: "搬家",
    target: 1000,
    current: 0,
    dueDate: "2026-08-15",
    locked: true,
    note: "8月中旬预计支出",
  },
  {
    id: "travel-2026-10",
    name: "10月大旅行",
    kind: "旅行",
    target: 8000,
    current: 0,
    dueDate: "2026-10-01",
    locked: true,
    note: "总共两次大旅行之一",
  },
  {
    id: "travel-2026-12",
    name: "12月大旅行",
    kind: "旅行",
    target: 8000,
    current: 0,
    dueDate: "2026-12-01",
    locked: true,
    note: "总共两次大旅行之一",
  },
  {
    id: "phone-installment",
    name: "手机三期分期",
    kind: "分期",
    target: 2490,
    current: 0,
    dueDate: "2026-10-31",
    locked: true,
    note: "8-10月，每期约 830",
  },
  {
    id: "small-trips",
    name: "小旅行上限",
    kind: "旅行",
    target: 3000,
    current: 0,
    dueDate: "2026-12-31",
    locked: false,
    note: "最多两次，每次约 1500；现金紧张时取消",
  },
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
  "parentSaving",
  "partnerSaving",
  "emergencyFund",
  "aSharePlan",
  "usSharePlan",
  "hkSharePlan",
];

const reportStartMonthId = "2026-06";
const financeStorageKey = "personal-finance-management-data-v2";
const financeSnapshotsKey = "personal-finance-management-snapshots-v1";
const financeMonthlyArchiveKey = "personal-finance-management-monthly-archives-v1";
const financeCloudSyncKey = "personal-finance-management-cloud-sync-v1";
const financeCloudPassphraseKey = "personal-finance-management-cloud-passphrase-v1";
const cloudSyncFileName = "personal-finance-management-sync.json";
const maxSnapshots = 20;
const maxMonthlyArchives = 48;

const moduleList: Array<{ id: ModuleId; title: string; desc: string }> = [
  { id: "income", title: "收入", desc: "税后工资、实际到账、炒股月结算记录" },
  { id: "spending", title: "支出", desc: "实际花费、必要支出、可取消支出" },
  { id: "cashflow", title: "现金流预测", desc: "当前预算与可自由动用现金" },
  { id: "accounts", title: "账户管理", desc: "银行卡、支付宝、微信、现金余额可编辑" },
  { id: "budget", title: "预算管理", desc: "完整月度与年度分配、月份现金流" },
  { id: "investment", title: "投资管理", desc: "A股、美股、港股市值和投入计划" },
  { id: "balance", title: "资产负债表", desc: "总资产、负债项可增删编辑" },
  { id: "emergency", title: "应急&学习金", desc: "应急储备覆盖与每月学习用途分开核算" },
  { id: "reminders", title: "账单与提醒", desc: "提前 7 天提醒账单和到期事项" },
  { id: "goals", title: "目标管理", desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标" },
  { id: "fundBuckets", title: "大花费项目", desc: "旅行、搬家、分期、应急金和待投资金隔离" },
  { id: "reports", title: "财务报表", desc: "收入、支出、结余、投资表现" },
  { id: "periodReview", title: "周期复盘", desc: "九类数据更新、周月季度对比和下期动作" },
  { id: "monthlyArchive", title: "月度存档", desc: "保存每月收入、支出、账户余额和净资产变化" },
  { id: "cloudSync", title: "云同步", desc: "用加密 GitHub Gist 跨电脑保存和恢复数据" },
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

function ratioPercent(value: number) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${(value * 100).toFixed(1)}%`;
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

function cashReservePurpose(account: Account): string | null {
  if (isInvestmentReserveAccount(account)) return "投资待投金";
  const text = `${account.name} ${account.type} ${account.purpose}`;
  if (/应急|紧急/.test(text)) return "应急储备";
  if (isTravelSavingsAccount(account)) return "旅游专项";
  if (isLearningSavingsAccount(account)) return "学习专项";
  if (/伴侣|情侣|共同|父母|家用|家庭/.test(text)) return "家庭专项";
  return null;
}

function isTotalSavingsAccount(account: Account) {
  const text = `${account.name} ${account.type} ${account.purpose}`.toLowerCase();
  const compactText = text.replace(/\s+/g, "");
  const isSalaryMainAccount = account.id === "icbc2616" || compactText.includes("工行2616");
  const isExcludedWallet = compactText.includes("微信") || compactText.includes("现金");
  const isBankCard = compactText.includes("银行卡") || compactText.includes("银行") || compactText.includes("工行");
  const isYuEBao = compactText.includes("余额宝");
  return !isSalaryMainAccount && !isExcludedWallet && (isBankCard || isYuEBao);
}

function goalKind(goal: Goal): GoalKind {
  const text = goal.name.toLowerCase();
  if (text.includes("旅游") || text.includes("旅行")) return "travel";
  if (text.includes("学习") || text.includes("教育") || text.includes("成长")) return "learning";
  if (text.includes("父母") || text.includes("爸妈") || text.includes("孝敬")) return "parent";
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
    parentCurrent: 0,
    parentMonthly: 0,
    parentActualMonthly: 0,
    partnerCurrent: 0,
    partnerMonthly: 0,
    partnerActualMonthly: 0,
    emergencyCurrent: 0,
    emergencyMonthly: 0,
    emergencyActualMonthly: 0,
    otherCurrent: 0,
    otherMonthly: 0,
    otherActualMonthly: 0,
    hasTravel: false,
    hasLearning: false,
    hasParent: false,
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
    } else if (kind === "parent") {
      summary.parentCurrent += goal.current;
      summary.parentMonthly += goal.monthly;
      summary.parentActualMonthly += goal.actualMonthly;
      summary.hasParent = true;
    } else if (kind === "partner") {
      summary.partnerCurrent += goal.current;
      summary.partnerMonthly += goal.monthly;
      summary.partnerActualMonthly += goal.actualMonthly;
      summary.hasPartner = true;
    } else if (kind === "emergency") {
      summary.emergencyCurrent += goal.current;
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

function goalsWithEmergencyBudget(goals: Goal[], plan: AnnualBudgetPlan) {
  const firstEmergencyId = goals.find(goal => goalKind(goal) === "emergency")?.id;
  const monthly = plan.rows.find(row => row.id === "emergency")?.[plan.mode] ?? 0;
  return goals.map(goal => goalKind(goal) === "emergency" ? {...goal, monthly: goal.id === firstEmergencyId ? monthly : 0} : goal);
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
  const goalsWithParent = goals.some((item) => goalKind(item) === "parent")
    ? goals
    : (() => {
        const parentGoal = initialGoals.find((item) => item.id === "parent-saving");
        return parentGoal ? [...goals, parentGoal] : goals;
      })();
  if (goalsWithParent.some((item) => goalKind(item) === "partner")) return goalsWithParent;
  const partnerGoal = initialGoals.find((item) => item.id === "partner");
  return partnerGoal ? [...goalsWithParent, partnerGoal] : goalsWithParent;
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

function normalizeFundBuckets(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index): FundBucket | null => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<FundBucket>;
      const kind = fundBucketKinds.includes(raw.kind as FundBucketKind) ? (raw.kind as FundBucketKind) : "其他";
      return {
        id: typeof raw.id === "string" && raw.id ? raw.id : `fund-bucket-${index + 1}`,
        name: typeof raw.name === "string" && raw.name.trim() ? raw.name : `大花费项目 ${index + 1}`,
        kind,
        target: typeof raw.target === "number" ? raw.target : 0,
        current: typeof raw.current === "number" ? raw.current : 0,
        dueDate: typeof raw.dueDate === "string" && raw.dueDate ? raw.dueDate : "2026-12-31",
        locked: typeof raw.locked === "boolean" ? raw.locked : true,
        note: typeof raw.note === "string" ? raw.note : "",
        fundingAccountId: typeof raw.fundingAccountId === "string" ? raw.fundingAccountId : "",
      };
    })
    .filter((item): item is FundBucket => item !== null);
}

function normalizeMonthlyArchiveAccounts(value: unknown): MonthlyArchiveAccount[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<MonthlyArchiveAccount>;
      return {
        id: typeof raw.id === "string" && raw.id ? raw.id : `archive-account-${index + 1}`,
        name: typeof raw.name === "string" && raw.name.trim() ? raw.name : `账户 ${index + 1}`,
        type: typeof raw.type === "string" ? raw.type : "",
        balance: typeof raw.balance === "number" ? raw.balance : 0,
        purpose: typeof raw.purpose === "string" ? raw.purpose : "",
        liquid: typeof raw.liquid === "boolean" ? raw.liquid : true,
      };
    })
    .filter((item): item is MonthlyArchiveAccount => item !== null);
}

function normalizeMonthlyArchives(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const raw = item as Partial<MonthlyArchive>;
      const monthId = typeof raw.monthId === "string" && raw.monthId ? raw.monthId : "";
      if (!monthId) return null;
      return {
        id: typeof raw.id === "string" && raw.id ? raw.id : `${monthId}-${index}`,
        monthId,
        label: typeof raw.label === "string" && raw.label ? raw.label : monthLabelFromId(monthId),
        savedAt: typeof raw.savedAt === "string" && raw.savedAt ? raw.savedAt : new Date().toISOString(),
        income: typeof raw.income === "number" ? raw.income : 0,
        spending: typeof raw.spending === "number" ? raw.spending : 0,
        allocation: typeof raw.allocation === "number" ? raw.allocation : 0,
        surplus: typeof raw.surplus === "number" ? raw.surplus : 0,
        accountTotal: typeof raw.accountTotal === "number" ? raw.accountTotal : 0,
        totalAssets: typeof raw.totalAssets === "number" ? raw.totalAssets : 0,
        netWorth: typeof raw.netWorth === "number" ? raw.netWorth : 0,
        totalDebt: typeof raw.totalDebt === "number" ? raw.totalDebt : 0,
        emergencyFund: typeof raw.emergencyFund === "number" ? raw.emergencyFund : 0,
        savings: typeof raw.savings === "number" ? raw.savings : 0,
        accounts: normalizeMonthlyArchiveAccounts(raw.accounts),
      };
    })
    .filter((item): item is MonthlyArchive => item !== null)
    .sort((a, b) => b.monthId.localeCompare(a.monthId) || b.savedAt.localeCompare(a.savedAt))
    .slice(0, maxMonthlyArchives);
}

function normalizeCloudSyncSettings(value: unknown): CloudSyncSettings {
  if (!value || typeof value !== "object") {
    return { gistId: "", token: "", autoSync: false, rememberPassphrase: false };
  }
  const raw = value as Partial<CloudSyncSettings>;
  return {
    gistId: typeof raw.gistId === "string" ? raw.gistId : "",
    token: typeof raw.token === "string" ? raw.token : "",
    autoSync: Boolean(raw.autoSync),
    rememberPassphrase: Boolean(raw.rememberPassphrase),
    lastPushedAt: typeof raw.lastPushedAt === "string" ? raw.lastPushedAt : undefined,
    lastPulledAt: typeof raw.lastPulledAt === "string" ? raw.lastPulledAt : undefined,
  };
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

function monthsBetweenMonthIdAndDate(monthId: string, date: string) {
  const [baseYearText, baseMonthText] = monthId.split("-");
  const [targetYearText, targetMonthText] = date.split("-");
  const baseYear = Number(baseYearText);
  const baseMonth = Number(baseMonthText);
  const targetYear = Number(targetYearText);
  const targetMonth = Number(targetMonthText);
  if (![baseYear, baseMonth, targetYear, targetMonth].every(Number.isFinite)) return 1;
  return Math.max(1, (targetYear - baseYear) * 12 + targetMonth - baseMonth + 1);
}

function formatSnapshotTime(value: string) {
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function signedMoney(value: number) {
  if (value > 0) return `+${money(value)}`;
  if (value < 0) return `-${money(Math.abs(value))}`;
  return money(0);
}

function changeClassName(value: number) {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "calculated-cell";
}

function sortMonthlyArchivesAsc(archives: MonthlyArchive[]) {
  return [...archives].sort((a, b) => a.monthId.localeCompare(b.monthId) || a.savedAt.localeCompare(b.savedAt));
}

function previousMonthlyArchive(archives: MonthlyArchive[], monthId: string) {
  return sortMonthlyArchivesAsc(archives)
    .filter((archive) => archive.monthId < monthId)
    .at(-1);
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  return window.btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = window.atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

async function deriveCloudSyncKey(passphrase: string, salt: Uint8Array, iterations: number) {
  const passphraseBytes = new TextEncoder().encode(passphrase);
  const baseKey = await window.crypto.subtle.importKey("raw", passphraseBytes, "PBKDF2", false, ["deriveKey"]);
  return window.crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function encryptCloudSyncBackup(backup: CloudSyncBackup, passphrase: string): Promise<CloudSyncEnvelope> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const iterations = 180000;
  const key = await deriveCloudSyncKey(passphrase, salt, iterations);
  const plaintext = new TextEncoder().encode(JSON.stringify(backup));
  const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return {
    version: 1,
    app: "personal-finance-management",
    encryptedAt: new Date().toISOString(),
    kdf: {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations,
      salt: bytesToBase64(salt),
    },
    cipher: {
      name: "AES-GCM",
      iv: bytesToBase64(iv),
      data: bytesToBase64(new Uint8Array(encrypted)),
    },
  };
}

async function decryptCloudSyncBackup(envelope: CloudSyncEnvelope, passphrase: string): Promise<CloudSyncBackup> {
  if (envelope.app !== "personal-finance-management" || envelope.version !== 1) {
    throw new Error("invalid cloud backup");
  }
  const key = await deriveCloudSyncKey(passphrase, base64ToBytes(envelope.kdf.salt), envelope.kdf.iterations);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(envelope.cipher.iv) },
    key,
    base64ToBytes(envelope.cipher.data),
  );
  return JSON.parse(new TextDecoder().decode(decrypted)) as CloudSyncBackup;
}

async function githubGistRequest<T>(path: string, token: string, init: RequestInit = {}) {
  const response = await window.fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `GitHub request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

async function pushCloudSyncBackup({
  backup,
  gistId,
  passphrase,
  token,
}: {
  backup: CloudSyncBackup;
  gistId: string;
  passphrase: string;
  token: string;
}) {
  const envelope = await encryptCloudSyncBackup(backup, passphrase);
  const body = {
    description: "Personal Finance Management encrypted sync data",
    public: false,
    files: {
      [cloudSyncFileName]: {
        content: JSON.stringify(envelope, null, 2),
      },
    },
  };

  if (gistId.trim()) {
    return githubGistRequest<{ id: string; html_url: string }>(`/gists/${gistId.trim()}`, token, {
      method: "PATCH",
      body: JSON.stringify({ files: body.files }),
    });
  }
  return githubGistRequest<{ id: string; html_url: string }>("/gists", token, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function pullCloudSyncBackup(gistId: string, token: string, passphrase: string) {
  const gist = await githubGistRequest<{ files?: Record<string, { content?: string; raw_url?: string }> }>(
    `/gists/${gistId.trim()}`,
    token,
  );
  const file = gist.files?.[cloudSyncFileName] ?? Object.values(gist.files ?? {})[0];
  if (!file?.content) throw new Error("cloud sync file not found");
  const envelope = JSON.parse(file.content) as CloudSyncEnvelope;
  return decryptCloudSyncBackup(envelope, passphrase);
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
  const currentDate = useFinanceToday();
  const [annualBudgetPlan, setAnnualBudgetPlan] = useState<AnnualBudgetPlan>(initialAnnualBudgetPlan);
  const [financeReviews, setFinanceReviews] = useState<FinanceReview[]>([]);
  const [monthlyCashPlan, setMonthlyCashPlan] = useState<MonthlyCashPlan>(initialMonthlyCashPlan);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [activeModules, setActiveModules] = useState<ModuleId[]>([]);
  const [navigationTarget, setNavigationTarget] = useState<{ id: ModuleId | "overview" } | null>(null);
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
  const emergencyMonths = annualBudgetPlan.emergencyTargetMonths;
  const emergencyMonthlyNeed = annualBudgetPlan.emergencyMonthlyNeed;
  const setEmergencyMonths = (value: number) => setAnnualBudgetPlan(plan => normalizeAnnualBudgetPlan({...plan, emergencyTargetMonths: value}));
  const setEmergencyMonthlyNeed = (value: number) => setAnnualBudgetPlan(plan => normalizeAnnualBudgetPlan({...plan, emergencyMonthlyNeed: value}));
  const [balanceAssets, setBalanceAssets] = useState<BalanceAsset[]>(initialBalanceAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(initialLiabilities);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const plannedGoals = goalsWithEmergencyBudget(goals, annualBudgetPlan);
  const [fundBuckets, setFundBuckets] = useState<FundBucket[]>(initialFundBuckets);
  const [futureCapabilities, setFutureCapabilities] = useState<FutureCapability[]>(initialFutureCapabilities);
  const [cashflowHiddenBuiltinIds, setCashflowHiddenBuiltinIds] = useState<CashflowBuiltinId[]>([]);
  const [cashflowCustomItems, setCashflowCustomItems] = useState<CashflowCustomItem[]>([]);
  const [snapshots, setSnapshots] = useState<FinanceSnapshot[]>([]);
  const [monthlyArchives, setMonthlyArchives] = useState<MonthlyArchive[]>([]);
  const [cloudSyncSettings, setCloudSyncSettings] = useState<CloudSyncSettings>({
    gistId: "",
    token: "",
    autoSync: false,
    rememberPassphrase: false,
  });
  const [cloudPassphrase, setCloudPassphrase] = useState("");
  const [cloudStatus, setCloudStatus] = useState("未连接云同步");
  const [cloudSyncing, setCloudSyncing] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState("正在读取本地数据…");
  const [reportCopyStatus, setReportCopyStatus] = useState("报告随数据自动更新");
  const [savedDataReady, setSavedDataReady] = useState(false);
  const cloudAutoSyncTimerRef = useRef<number | null>(null);
  const cloudOperationRef = useRef(false);
  const cloudAutoUploadBlockedRef = useRef(false);
  const lastCloudSignatureRef = useRef("");
  const lastLocalDataRef = useRef<string | undefined>(undefined);
  const importInputRef = useRef<HTMLInputElement>(null);

  function getPersistedFinanceData(): PersistedFinanceData {
    return {
      salarySettingsVersion,
      annualBudgetPlan,
      financeReviews,
      monthlyCashPlan,
      period,
      selectedMonth,
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
      goals: goalsWithEmergencyBudget(goals, annualBudgetPlan),
      fundBuckets,
      futureCapabilities,
      cashflowHiddenBuiltinIds,
      cashflowCustomItems,
    };
  }

  function persistLocalFinanceData(data: PersistedFinanceData = getPersistedFinanceData(), cloudClean = false) {
    const metadata = writeLocalFinanceData(window.localStorage, financeStorageKey, data, cloudClean, undefined, lastLocalDataRef.current);
    lastLocalDataRef.current = JSON.stringify(financeDataOnly(data));
    return metadata;
  }

  function getCloudSyncBackup(overrides: Partial<Pick<CloudSyncBackup, "data" | "snapshots" | "monthlyArchives">> = {}): CloudSyncBackup {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: overrides.data ?? getPersistedFinanceData(),
      snapshots: overrides.snapshots ?? snapshots,
      monthlyArchives: overrides.monthlyArchives ?? monthlyArchives,
    };
  }

  function persistCloudSyncSettings(nextSettings: CloudSyncSettings, passphrase = cloudPassphrase) {
    setCloudSyncSettings(nextSettings);
    window.localStorage.setItem(financeCloudSyncKey, JSON.stringify(nextSettings));
    if (!nextSettings.rememberPassphrase) {
      window.localStorage.removeItem(financeCloudPassphraseKey);
    } else if (passphrase.trim()) {
      window.localStorage.setItem(financeCloudPassphraseKey, passphrase);
    }
  }

  function applyPersistedFinanceData(saved: Partial<PersistedFinanceData>) {
    const restoredReviews = saved.financeReviews === undefined ? undefined : parseFinanceReviews(saved.financeReviews);
    const restoredPlan = normalizeAnnualBudgetPlan(saved.annualBudgetPlan);
    const salaryData = migrateSalarySettings(Array.isArray(saved.monthlyRecords) ? saved.monthlyRecords : initialMonthRecords, restoredPlan.salary, saved.salarySettingsVersion);
    setAnnualBudgetPlan({...restoredPlan, salary: salaryData.salary});
    if (restoredReviews) setFinanceReviews(restoredReviews);
    setMonthlyCashPlan({...normalizeMonthlyCashPlan(saved.monthlyCashPlan), income: salaryData.salary});
    if (saved.period) setPeriod(saved.period);
    if (saved.selectedMonth) setSelectedMonth(saved.selectedMonth);
    setMonthlyRecords(salaryData.records);
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
    if (Array.isArray(saved.fundBuckets)) {
      const savedFundBuckets = normalizeFundBuckets(saved.fundBuckets);
      if (savedFundBuckets.length > 0) setFundBuckets(savedFundBuckets);
    }
    if (Array.isArray(saved.futureCapabilities)) setFutureCapabilities(saved.futureCapabilities);
    if (Array.isArray(saved.cashflowHiddenBuiltinIds)) {
      setCashflowHiddenBuiltinIds(saved.cashflowHiddenBuiltinIds.filter((id) => cashflowBuiltinIds.includes(id)));
    }
    if (Array.isArray(saved.cashflowCustomItems)) setCashflowCustomItems(saved.cashflowCustomItems);
  }

  // Runs before autosave starts so a fresh browser cannot upload default data over the cloud backup.
  useEffect(() => {
    let cancelled = false;
    const loadSavedData = window.setTimeout(() => {
      void (async () => {
        let hasLocalData = false;
        let pendingLocalChanges = false;
        let savedCloudSync = normalizeCloudSyncSettings(null);
        let rememberedPassphrase = "";

        try {
          const raw = window.localStorage.getItem(financeStorageKey);
          const rawSnapshots = window.localStorage.getItem(financeSnapshotsKey);
          const rawMonthlyArchives = window.localStorage.getItem(financeMonthlyArchiveKey);
          const rawCloudSync = window.localStorage.getItem(financeCloudSyncKey);
          rememberedPassphrase = window.localStorage.getItem(financeCloudPassphraseKey) ?? "";
          if (raw) {
            const saved = JSON.parse(raw) as Partial<PersistedFinanceData>;
            lastLocalDataRef.current = JSON.stringify(financeDataOnly(saved));
            applyPersistedFinanceData(saved);
            hasLocalData = true;
            pendingLocalChanges = hasPendingFinanceSave(saved);
          }
          if (rawSnapshots) {
            const savedSnapshots = JSON.parse(rawSnapshots) as FinanceSnapshot[];
            if (Array.isArray(savedSnapshots)) setSnapshots(savedSnapshots.slice(0, maxSnapshots));
          }
          if (rawMonthlyArchives) setMonthlyArchives(normalizeMonthlyArchives(JSON.parse(rawMonthlyArchives)));
          if (rawCloudSync) {
            savedCloudSync = normalizeCloudSyncSettings(JSON.parse(rawCloudSync));
            setCloudSyncSettings(savedCloudSync);
            if (savedCloudSync.rememberPassphrase && rememberedPassphrase) setCloudPassphrase(rememberedPassphrase);
            setCloudStatus(savedCloudSync.gistId ? "已读取云同步配置，准备连接云端" : "未连接云同步");
          }
        } catch {
          setSaveStatus("本地数据读取失败，原数据已保留；已暂停自动保存，请先恢复有效备份后刷新。");
          return;
        }

        const canAutoPullCloud =
          savedCloudSync.gistId.trim() &&
          savedCloudSync.token.trim() &&
          savedCloudSync.rememberPassphrase &&
          Boolean(rememberedPassphrase.trim());

        cloudAutoUploadBlockedRef.current = pendingLocalChanges && Boolean(savedCloudSync.gistId.trim());

        if (canAutoPullCloud && pendingLocalChanges) {
          cloudAutoUploadBlockedRef.current = true;
          setSaveStatus("已恢复本机修改，尚未同步云端");
          setCloudStatus("本机有未同步修改，已保留；请保存到云端，或核对后手动拉取。");
        } else if (canAutoPullCloud) {
          cloudOperationRef.current = true;
          setCloudSyncing(true);
          setCloudStatus("正在打开时自动拉取云端数据…");
          try {
            const backup = await pullCloudSyncBackup(
              savedCloudSync.gistId,
              savedCloudSync.token,
              rememberedPassphrase,
            );
            if (cancelled) return;
            applyCloudSyncBackup(backup);
            const pulledAt = new Date().toISOString();
            persistCloudSyncSettings({ ...savedCloudSync, lastPulledAt: pulledAt }, rememberedPassphrase);
            setSaveStatus("已从云端自动恢复最新数据");
            setCloudStatus(`云端数据已自动拉取 · ${formatSnapshotTime(pulledAt)}`);
          } catch {
            cloudAutoUploadBlockedRef.current = true;
            if (!cancelled) {
              setSaveStatus(hasLocalData ? "已恢复本机数据，云端自动拉取失败" : "已启用自动保存，云端自动拉取失败");
              setCloudStatus("打开时自动拉取失败，请检查同步密码、Token 和 Gist ID。");
            }
          } finally {
            cloudOperationRef.current = false;
            if (!cancelled) setCloudSyncing(false);
          }
        } else {
          setSaveStatus(hasLocalData ? "已恢复上次保存的数据" : "已启用自动保存");
          if (!hasLocalData) persistLocalFinanceData(getPersistedFinanceData(), true);
        }

        if (!cancelled) setSavedDataReady(true);
      })();
    }, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(loadSavedData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoSaveToCloud = useEffectEvent(() => {
    if (!savedDataReady || cloudAutoUploadBlockedRef.current || cloudOperationRef.current || !cloudSyncSettings.autoSync ||
        !cloudSyncSettings.gistId.trim() || !cloudSyncSettings.token.trim() || !cloudPassphrase.trim()) return;
    const backup = getCloudSyncBackup();
    if (financeBackupSignature(backup) !== lastCloudSignatureRef.current) void uploadCloudSync(true, backup);
  });
  const flushLocalSave = useEffectEvent(() => {
    if (!savedDataReady) return;
    try {
      persistLocalFinanceData();
      setSaveStatus(`本机已自动保存 · ${new Date().toLocaleTimeString("zh-CN", {hour: "2-digit", minute: "2-digit", second: "2-digit"})}`);
    } catch (error) {
      setSaveStatus(error instanceof Error && error.message === financeSaveConflict ? financeSaveConflict : "本机保存失败，请立即导出备份");
    }
  });

  useEffect(() => {
    if (!savedDataReady) return;
    const timer = window.setInterval(() => {flushLocalSave(); autoSaveToCloud();}, 30000);
    const flushPage = () => flushLocalSave();
    const flushHidden = () => {if (document.visibilityState === "hidden") flushLocalSave();};
    window.addEventListener("pagehide", flushPage);
    document.addEventListener("visibilitychange", flushHidden);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pagehide", flushPage);
      document.removeEventListener("visibilitychange", flushHidden);
    };
  }, [savedDataReady]);

  // Edits debounce locally; periodic and lifecycle saves use the latest committed values.
  useEffect(() => {
    if (!savedDataReady) return;
    const timer = window.setTimeout(() => {
      flushLocalSave();
      if (cloudAutoSyncTimerRef.current) window.clearTimeout(cloudAutoSyncTimerRef.current);
      cloudAutoSyncTimerRef.current = window.setTimeout(() => autoSaveToCloud(), 3500);
    }, 300);
    return () => {
      window.clearTimeout(timer);
      if (cloudAutoSyncTimerRef.current) window.clearTimeout(cloudAutoSyncTimerRef.current);
    };
  }, [
    savedDataReady,
    annualBudgetPlan,
    financeReviews,
    monthlyCashPlan,
    period,
    selectedMonth,
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
    fundBuckets,
    futureCapabilities,
    cashflowHiddenBuiltinIds,
    cashflowCustomItems,
    cloudSyncSettings.autoSync,
    cloudSyncSettings.gistId,
    cloudSyncSettings.token,
    cloudPassphrase,
  ]);

  async function saveCurrentData() {
    if (!savedDataReady || cloudOperationRef.current) return;
    try {
      const backup = getCloudSyncBackup();
      persistLocalFinanceData(backup.data);
      setSaveStatus(`本机已保存 · ${formatSnapshotTime(new Date().toISOString())}`);
      if (cloudSyncSettings.token.trim() && cloudPassphrase.trim()) {
        const uploaded = await uploadCloudSync(false, backup);
        setSaveStatus(uploaded ? "当前数据已保存到本机和云端" : "本机已保存，云端未更新");
      } else {
        setCloudStatus("未连接云同步，仅保存到本机");
      }
    } catch (error) {
      setSaveStatus(error instanceof Error && error.message === financeSaveConflict ? financeSaveConflict : "保存失败，请立即导出备份；本次修改尚未确认保存");
    }
  }

  async function saveSnapshot() {
    const snapshot: FinanceSnapshot = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      data: getPersistedFinanceData(),
    };
    const nextSnapshots = [snapshot, ...snapshots].slice(0, maxSnapshots);
    setSnapshots(nextSnapshots);
    window.localStorage.setItem(financeSnapshotsKey, JSON.stringify(nextSnapshots));
    persistLocalFinanceData(snapshot.data);
    setHistoryOpen(true);
    setSaveStatus("历史版本已保存，正在同步云端…");
    const uploaded = await uploadCloudSync(false, getCloudSyncBackup({ data: snapshot.data, snapshots: nextSnapshots }));
    setSaveStatus(uploaded ? "完整版本已保存并上传云端" : "完整版本已保存到本机，云端未更新");
  }

  function restoreSnapshot(snapshot: FinanceSnapshot) {
    if (!window.confirm(`确定恢复 ${formatSnapshotTime(snapshot.createdAt)} 的版本吗？当前数据会被该版本覆盖。`)) return;
    applyPersistedFinanceData(snapshot.data);
    persistLocalFinanceData(snapshot.data);
    setSaveStatus("历史版本已恢复并自动保存");
  }

  function deleteSnapshot(id: string) {
    const nextSnapshots = snapshots.filter((snapshot) => snapshot.id !== id);
    setSnapshots(nextSnapshots);
    window.localStorage.setItem(financeSnapshotsKey, JSON.stringify(nextSnapshots));
  }

  function exportBackup() {
    const backup = getCloudSyncBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `personal-finance-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setSaveStatus("备份文件已导出");
  }

  async function importBackup(file: File) {
    try {
      const backup = JSON.parse(await file.text()) as {
        data?: Partial<PersistedFinanceData>;
        snapshots?: FinanceSnapshot[];
        monthlyArchives?: MonthlyArchive[];
      };
      if (!backup.data || !Array.isArray(backup.data.accounts) || !Array.isArray(backup.data.monthlyRecords)) {
        throw new Error("invalid backup");
      }
      applyPersistedFinanceData(backup.data);
      persistLocalFinanceData(backup.data as PersistedFinanceData);
      if (Array.isArray(backup.snapshots)) {
        const importedSnapshots = backup.snapshots.slice(0, maxSnapshots);
        setSnapshots(importedSnapshots);
        window.localStorage.setItem(financeSnapshotsKey, JSON.stringify(importedSnapshots));
      }
      if (Array.isArray(backup.monthlyArchives)) {
        const importedMonthlyArchives = normalizeMonthlyArchives(backup.monthlyArchives);
        setMonthlyArchives(importedMonthlyArchives);
        window.localStorage.setItem(financeMonthlyArchiveKey, JSON.stringify(importedMonthlyArchives));
      }
      setSaveStatus("备份已导入并自动保存");
    } catch {
      window.alert("无法导入：请选择由本网页导出的 JSON 备份文件。");
    } finally {
      if (importInputRef.current) importInputRef.current.value = "";
    }
  }

  function updateCloudSyncSettings(patch: Partial<CloudSyncSettings>) {
    persistCloudSyncSettings({ ...cloudSyncSettings, ...patch });
  }

  function updateCloudPassphrase(value: string) {
    setCloudPassphrase(value);
    if (!cloudSyncSettings.rememberPassphrase) return;
    if (value.trim()) {
      window.localStorage.setItem(financeCloudPassphraseKey, value);
    } else {
      window.localStorage.removeItem(financeCloudPassphraseKey);
    }
  }

  function clearCloudSyncSettings() {
    const nextSettings = { gistId: "", token: "", autoSync: false, rememberPassphrase: false };
    persistCloudSyncSettings(nextSettings);
    setCloudPassphrase("");
    setCloudStatus("已断开云同步配置");
  }

  function applyCloudSyncBackup(backup: CloudSyncBackup) {
    applyPersistedFinanceData(backup.data);
    const importedSnapshots = Array.isArray(backup.snapshots) ? backup.snapshots.slice(0, maxSnapshots) : [];
    const importedMonthlyArchives = normalizeMonthlyArchives(backup.monthlyArchives);
    setSnapshots(importedSnapshots);
    setMonthlyArchives(importedMonthlyArchives);
    persistLocalFinanceData(backup.data, true);
    window.localStorage.setItem(financeSnapshotsKey, JSON.stringify(importedSnapshots));
    window.localStorage.setItem(financeMonthlyArchiveKey, JSON.stringify(importedMonthlyArchives));
    lastCloudSignatureRef.current = financeBackupSignature(backup);
    cloudAutoUploadBlockedRef.current = false;
  }

  async function uploadCloudSync(silent = false, backup: CloudSyncBackup = getCloudSyncBackup()) {
    if (!savedDataReady || cloudOperationRef.current) return false;
    if (!cloudSyncSettings.token.trim()) {
      if (!silent) {
        setActiveModules((items) => (items.includes("cloudSync") ? items : [...items, "cloudSync"]));
        window.alert("请先填写 GitHub Token。");
      }
      return false;
    }
    if (!cloudPassphrase.trim()) {
      if (!silent) {
        setActiveModules((items) => (items.includes("cloudSync") ? items : [...items, "cloudSync"]));
        window.alert("请先填写同步密码。这个密码用于加密云端数据。");
      }
      return false;
    }

    cloudOperationRef.current = true;
    setCloudSyncing(true);
    if (!silent) setCloudStatus("正在加密并上传到 GitHub Gist…");
    try {
      persistLocalFinanceData(backup.data);
      const gist = await pushCloudSyncBackup({
        backup,
        gistId: cloudSyncSettings.gistId,
        passphrase: cloudPassphrase,
        token: cloudSyncSettings.token,
      });
      const pushedAt = new Date().toISOString();
      const nextSettings = {
        ...cloudSyncSettings,
        gistId: gist.id,
        lastPushedAt: pushedAt,
      };
      persistCloudSyncSettings(nextSettings);
      lastCloudSignatureRef.current = financeBackupSignature(backup);
      cloudAutoUploadBlockedRef.current = false;
      const synchronized = markFinanceCloudSaved(window.localStorage, financeStorageKey, backup.data);
      setCloudStatus(synchronized ? `${silent ? "已自动云同步" : "云端保存完成"} · ${formatSnapshotTime(pushedAt)}` : "上一版已上传，最新本机修改待同步");
      return synchronized;
    } catch (error) {
      setCloudStatus("云端保存失败，请检查 Token、Gist ID 和网络。");
      if (!silent) window.alert(error instanceof Error ? error.message : "云端保存失败");
      return false;
    } finally {
      cloudOperationRef.current = false;
      setCloudSyncing(false);
    }
  }

  async function downloadCloudSync() {
    if (cloudOperationRef.current) return;
    if (!cloudSyncSettings.gistId.trim()) {
      window.alert("请先填写 Gist ID，或先上传一次创建云端存档。");
      return;
    }
    if (!cloudSyncSettings.token.trim()) {
      window.alert("请先填写 GitHub Token。");
      return;
    }
    if (!cloudPassphrase.trim()) {
      window.alert("请先填写同步密码。");
      return;
    }
    if (!window.confirm("确定从云端覆盖当前本机数据吗？建议覆盖前先导出备份。")) return;

    cloudOperationRef.current = true;
    setCloudSyncing(true);
    setCloudStatus("正在从 GitHub Gist 拉取并解密…");
    try {
      const backup = await pullCloudSyncBackup(cloudSyncSettings.gistId, cloudSyncSettings.token, cloudPassphrase);
      applyCloudSyncBackup(backup);
      const pulledAt = new Date().toISOString();
      persistCloudSyncSettings({ ...cloudSyncSettings, lastPulledAt: pulledAt });
      setSaveStatus("已从云端恢复并自动保存到本机");
      setCloudStatus(`云端数据已拉取 · ${formatSnapshotTime(pulledAt)}`);
    } catch (error) {
      setCloudStatus("云端拉取失败，请检查同步密码、Token 和 Gist ID。");
      window.alert(error instanceof Error ? error.message : "云端拉取失败");
    } finally {
      cloudOperationRef.current = false;
      setCloudSyncing(false);
    }
  }

  const activeMonth = monthlyRecords.find((item) => item.id === selectedMonth) ?? monthlyRecords[0];
  const salary = activeMonth.salary;
  const stockIncome = activeMonth.stockIncome;
  const otherIncome = activeMonth.otherIncome;
  const budgets = activeMonth.budgets;
  const actualIncome = salary + Math.max(stockIncome, 0) + otherIncome;
  const annualPlanTotals = calculateAnnualBudgetPlan(annualBudgetPlan);
  const cashPlanTotals = annualPlanTotals[annualBudgetPlan.mode];
  const budgetModeName = annualBudgetPlan.mode === "normal" ? "普通月" : "出差月";
  const cashflowScenario = calculateCashflowScenario(annualBudgetPlan, cashflowCustomItems);
  const liquidity = calculateLiquidity(accounts.map(account => ({...account, reserve: cashReservePurpose(account)})), fundBuckets);
  const emergencyAccounts = accounts.filter(account => cashReservePurpose(account) === "应急储备");

  const totals = (() => {
    const accountTotal = accounts.reduce((sum, item) => sum + item.balance, 0);
    const totalSavingsAccounts = accounts.filter(isTotalSavingsAccount);
    const totalSavingsAccountTotal = totalSavingsAccounts.reduce((sum, item) => sum + item.balance, 0);
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
    const goalSummary = summarizeGoals(plannedGoals);
    const travelSavings = accounts.some(isTravelSavingsAccount) ? accountTravelSavings : goalSummary.hasTravel ? goalSummary.travelCurrent : travelSaving;
    const learningSavings =
      accounts.some(isLearningSavingsAccount) ? accountLearningSavings : goalSummary.hasLearning ? goalSummary.learningCurrent : learningSaving;
    const currentEmergencyFund = emergencyAccounts.length ? emergencyAccounts.reduce((sum, account) => sum + account.balance, 0) : goalSummary.hasEmergency ? goalSummary.emergencyCurrent : emergencyFund;
    const parentSavings = goalSummary.parentCurrent;
    const partnerSavings = goalSummary.partnerCurrent;
    const otherSavings = goalSummary.otherCurrent;
    const familyFund = partnerSavings;
    const totalSavings = travelSavings + learningSavings + otherSavings;
    const savingsOutsideAccounts = Math.max(0, totalSavings - accountSpecialSavings);
    const operatingAccountTotal = accountTotal - investmentReserve - accountSpecialSavings - (emergencyAccounts.length ? currentEmergencyFund : 0);
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
    const totalAssets = accountTotal + investmentValue + savingsOutsideAccounts + (emergencyAccounts.length ? 0 : currentEmergencyFund) + manualAssetTotal;
    const customOutflow = cashflowCustomItems
      .filter((item) => item.direction === "outflow")
      .reduce((sum, item) => sum + item.amount, 0);
    const enabledCashflowValue = (id: CashflowBuiltinId, value: number) => (cashflowHiddenBuiltinIds.includes(id) ? 0 : value);
    const cashflowSpendingPlan = enabledCashflowValue("spendingPlan", spendingPlan);
    const travelAllocationSource = goalSummary.hasTravel ? goalSummary.travelActualMonthly : travelSaving;
    const learningAllocationSource = goalSummary.hasLearning ? goalSummary.learningActualMonthly : learningSaving;
    const parentAllocationSource = goalSummary.hasParent ? goalSummary.parentActualMonthly : 0;
    const partnerAllocationSource = goalSummary.hasPartner ? goalSummary.partnerActualMonthly : 0;
    const emergencyAllocationSource = goalSummary.hasEmergency ? goalSummary.emergencyActualMonthly : 0;
    const travelExpectedSource = goalSummary.hasTravel ? goalSummary.travelMonthly : travelSaving;
    const learningExpectedSource = goalSummary.hasLearning ? goalSummary.learningMonthly : learningSaving;
    const parentExpectedSource = goalSummary.hasParent ? goalSummary.parentMonthly : 0;
    const partnerExpectedSource = goalSummary.hasPartner ? goalSummary.partnerMonthly : 0;
    const emergencyExpectedSource = annualBudgetPlan.rows.find(row => row.id === "emergency")?.[annualBudgetPlan.mode] ?? 0;
    const travelAllocation = enabledCashflowValue("travelSaving", travelAllocationSource);
    const learningAllocation = enabledCashflowValue("learningSaving", learningAllocationSource);
    const parentAllocation = enabledCashflowValue("parentSaving", parentAllocationSource);
    const partnerAllocation = enabledCashflowValue("partnerSaving", partnerAllocationSource);
    const emergencyAllocation = enabledCashflowValue("emergencyFund", emergencyAllocationSource);
    const investmentSavingAllocation =
      enabledCashflowValue("aSharePlan", aSharePlan) +
      enabledCashflowValue("usSharePlan", usSharePlan) +
      enabledCashflowValue("hkSharePlan", hkSharePlan);
    const assetOutflow =
      travelAllocation +
      learningAllocation +
      parentAllocation +
      partnerAllocation +
      emergencyAllocation +
      investmentSavingAllocation +
      customOutflow;
    const monthlySurplus = actualIncome - spendingActual - assetOutflow;
    const fixedRatio = actualIncome ? fixedSpending / actualIncome : 0;
    const savingsRate = actualIncome ? assetOutflow / actualIncome : 0;
    const emergencyNeed = Math.max(0, emergencyMonthlyNeed);
    const emergencyTarget = emergencyNeed * emergencyMonths;
    const emergencyCoverage = emergencyNeed ? currentEmergencyFund / emergencyNeed : 0;
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
      totalSavingsAccountTotal,
      totalSavingsAccountCount: totalSavingsAccounts.length,
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
      parentAllocation,
      partnerAllocation,
      emergencyAllocation,
      investmentSavingAllocation,
      customOutflow,
      travelAllocationSource,
      learningAllocationSource,
      parentAllocationSource,
      partnerAllocationSource,
      emergencyAllocationSource,
      travelExpectedSource,
      learningExpectedSource,
      parentExpectedSource,
      partnerExpectedSource,
      emergencyExpectedSource,
      travelSavings,
      learningSavings,
      parentSavings,
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
      currentEmergencyFund,
      debtRatio,
      score,
      emergencyMonthlyNeed: emergencyNeed,
      emergencyTarget,
    };
  })();

  function createMonthlyArchive(savedAt: string, id: string): MonthlyArchive {
    return {
      id,
      monthId: selectedMonth,
      label: activeMonth.label,
      savedAt,
      income: actualIncome,
      spending: totals.spendingActual,
      allocation: totals.assetOutflow,
      surplus: totals.monthlySurplus,
      accountTotal: totals.accountTotal,
      totalAssets: totals.totalAssets,
      netWorth: totals.netWorth,
      totalDebt: totals.totalDebt,
      emergencyFund: totals.currentEmergencyFund,
      savings: totals.totalSavingsAccountTotal,
      accounts: accounts.map((account) => ({
        id: account.id,
        name: account.name,
        type: account.type,
        balance: account.balance,
        purpose: account.purpose,
        liquid: account.liquid,
      })),
    };
  }

  async function saveMonthlyArchive() {
    const savedAt = new Date().toISOString();
    const archive = createMonthlyArchive(savedAt, `${selectedMonth}-${savedAt}`);
    const nextArchives = normalizeMonthlyArchives([
      archive,
      ...monthlyArchives.filter((item) => item.monthId !== selectedMonth),
    ]);
    setMonthlyArchives(nextArchives);
    window.localStorage.setItem(financeMonthlyArchiveKey, JSON.stringify(nextArchives));
    setActiveModules((items) => (items.includes("monthlyArchive") ? items : [...items, "monthlyArchive"]));
    persistLocalFinanceData();
    setSaveStatus(`${activeMonth.label} 月报已保存，正在同步云端…`);
    const uploaded = await uploadCloudSync(false, getCloudSyncBackup({ monthlyArchives: nextArchives }));
    setSaveStatus(uploaded ? `${activeMonth.label} 月报已保存并上传云端` : `${activeMonth.label} 月报已保存到本机，云端未更新`);
  }

  function deleteMonthlyArchive(id: string) {
    const nextArchives = monthlyArchives.filter((archive) => archive.id !== id);
    setMonthlyArchives(nextArchives);
    window.localStorage.setItem(financeMonthlyArchiveKey, JSON.stringify(nextArchives));
  }

  const currentMonthlyArchive = createMonthlyArchive("current-preview", `current-${selectedMonth}`);
  const savedSelectedMonthlyArchive = monthlyArchives.find((archive) => archive.monthId === selectedMonth);
  const monthlyArchiveForComparison = savedSelectedMonthlyArchive ?? currentMonthlyArchive;
  const previousSelectedMonthlyArchive = previousMonthlyArchive(monthlyArchives, selectedMonth);
  const monthlyArchiveTimeline = sortMonthlyArchivesAsc(
    normalizeMonthlyArchives([
      currentMonthlyArchive,
      ...monthlyArchives.filter((archive) => archive.monthId !== selectedMonth),
    ]),
  );

  const forecast = (() => {
    const rows: Array<{ month: string; inflow: number; outflow: number; balance: number }> = [];
    let balance = liquidity.available;
    for (let index = 0; index < 6; index += 1) {
      const forecastMonthId = addMonthsToId(reviewToday().slice(0, 7), index + 1);
      const {inflow, outflow} = cashflowScenario;
      balance += inflow - outflow;
      rows.push({
        month: shortMonth(monthLabelFromId(forecastMonthId)),
        inflow,
        outflow,
        balance,
      });
    }
    return rows;
  })();

  const cashflowEvents = (() => {
    const month = reviewToday().slice(0, 7);
    const events = [
      ...reminders.map((item) => ({
        date: item.date,
        item: item.name,
        inflow: item.kind === "定存" ? item.amount : 0,
        outflow: item.kind === "定存" ? 0 : item.amount,
        kind: item.kind,
      })),
      { date: `${month}-${String(Math.min(Math.max(monthlyRecords.find(record => record.id === month)?.payday ?? 10, 1), new Date(Number(month.slice(0,4)), Number(month.slice(5)), 0).getDate())).padStart(2,"0")}`, item: "工资计划", inflow: annualBudgetPlan.salary, outflow: 0, kind: "收入" },
    ].filter(event => event.date >= reviewToday()).sort((a, b) => a.date.localeCompare(b.date));
    return events;
  })();

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
        salary: annualBudgetPlan.salary,
        payday: lastRecord.payday,
        stockIncome: 0,
        otherIncome: 0,
        budgets: nextMonthSpendingRows(templateBudgets),
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

  function updateAnnualBudgetPlan(plan: AnnualBudgetPlan) {
    if (plan.salary !== annualBudgetPlan.salary) {
      setMonthlyRecords(records => applySalaryFromMonth(records, plan.salary, reviewToday().slice(0,7)));
      setMonthlyCashPlan(current => ({...current, income: plan.salary}));
    }
    setAnnualBudgetPlan(plan);
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

  function addDetailedBudgets() {
    setMonthlyRecords(records => records.map(record => record.id === selectedMonth ? {...record, budgets: addSpendingDetailPresets(record.budgets)} : record));
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
    if (patch.monthly !== undefined && goals.some(goal => goal.id === id && goalKind(goal) === "emergency")) {
      updateAnnualBudgetPlan({...annualBudgetPlan, rows: annualBudgetPlan.rows.map(row => row.id === "emergency" ? {...row, normal: patch.monthly!, trip: patch.monthly!} : row)});
    }
    setGoals((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function updateFirstGoalByKind(kind: GoalKind, patch: Partial<Goal>) {
    setGoals((items) => {
      const target = items.find((item) => goalKind(item) === kind);
      if (!target) return items;
      return items.map((item) => (item.id === target.id ? { ...item, ...patch } : item));
    });
  }

  function setEmergencyFundFromInput(value: number) {
    if (emergencyAccounts.length === 1) {
      updateAccount(emergencyAccounts[0].id, {balance: value});
      return;
    }
    if (emergencyAccounts.length > 1) return;
    setEmergencyFund(value);
    updateFirstGoalByKind("emergency", { current: value });
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

  function updateFundBucket(id: string, patch: Partial<FundBucket>) {
    setFundBuckets((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addFundBucket() {
    setFundBuckets((items) => [
      ...items,
      {
        id: `fund-bucket-${Date.now()}`,
        name: `新大花费项目 ${items.length + 1}`,
        kind: "其他",
        target: 0,
        current: 0,
        dueDate: selectedMonth.length >= 7 ? `${selectedMonth}-28` : "2026-12-31",
        locked: true,
        note: "待分配",
      },
    ]);
  }

  function deleteFundBucket(id: string) {
    setFundBuckets((items) => (items.length > 1 ? items.filter((item) => item.id !== id) : items));
  }

  function updateFutureCapability(id: string, patch: Partial<FutureCapability>) {
    setFutureCapabilities((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function toggleModule(id: ModuleId) {
    setLedgerOpen(true);
    setActiveModules((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  function navigateToSection(id: ModuleId | "overview") {
    setLedgerOpen(true);
    if (id !== "overview") {
      setActiveModules((items) => (items.includes(id) ? items : [...items, id]));
    }
    setNavigationTarget({ id });
  }

  useEffect(() => {
    if (!navigationTarget) return;
    // Wait until the ledger and the requested module have been rendered before scrolling.
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(`finance-${navigationTarget.id}`);
      if (!target) return;
      const stickyHeight = Array.from(document.querySelectorAll<HTMLElement>(".topbar, .selected-title"))
        .reduce((height, header) => window.getComputedStyle(header).position === "sticky"
          ? Math.max(height, header.getBoundingClientRect().height) : height, 0);
      target.style.scrollMarginTop = `${stickyHeight + 16}px`;
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [navigationTarget]);

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
    ...annualPlanTotals.rows.filter(row => row.kind !== "consumption").map(row => `${row.name} ${money(row[annualBudgetPlan.mode])}`),
  ].join(" / ");
  const specialSavingsDetail = [
    `旅游 ${money(totals.travelSavings)}`,
    `学习 ${money(totals.learningSavings)}`,
    totals.otherSavings > 0 ? `其他 ${money(totals.otherSavings)}` : "",
  ]
    .filter(Boolean)
    .join(" / ");
  const parentSavingsBreakdown = {
    label: "父母储蓄",
    value: totals.parentSavings,
    detail:
      totals.parentSavings > 0 || totals.parentAllocation > 0
        ? `当前 ${money(totals.parentSavings)} / 本月投入 ${money(totals.parentAllocation)}`
        : "目标管理父母储蓄，单独列示",
    color: palette[5],
  };
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
  const debtBreakdown = {
    label: "总负债",
    value: totals.totalDebt,
    detail: liabilitySummary,
    color: palette[4],
    className: "debt-breakdown-item",
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
      .join(" / ") || "来自资产负债表资产项";
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
    parentSavingsBreakdown,
    {
      label: "实物资产",
      value: totals.manualAssetTotal,
      detail: manualAssetDetail,
      color: palette[5],
    },
    {
      label: "应急金",
      value: totals.currentEmergencyFund,
      detail: `覆盖 ${totals.emergencyCoverage.toFixed(1)} 月 / 目标 ${emergencyMonths} 月`,
      color: palette[2],
    },
  ];
  const assetLiabilityBreakdown = [
    ...totalAssetBreakdown.slice(0, 7),
    debtBreakdown,
    ...totalAssetBreakdown.slice(7),
    familyFundBreakdown,
  ];

  const currentCashflowItems = accounts
    .filter((item) => item.balance !== 0)
    .map((item) => ({
      label: item.name.trim() || "未命名账户",
      value: money(item.balance),
      note: item.purpose.trim() || item.type.trim() || "账户",
    }));

  const overviewCards: Array<{
    id?: string;
    title: string;
    value: string;
    detail: string;
    tone: Tone;
    items?: Array<{ label: string; value: string; note: string }>;
  }> = [
    {
      id: "monthly-overview-income",
      title: `${budgetModeName}可分配资金`,
      value: money(cashPlanTotals.income),
      detail: `工资 ${money(annualBudgetPlan.salary)} + 出差净结余 ${money(cashPlanTotals.tripNet)} / ${annualBudgetPlan.mode === "trip" ? "出差结余按全年平均分摊" : "不预支出差结余"}`,
      tone: "blue" as Tone,
    },
    {
      id: "monthly-overview-living",
      title: `${budgetModeName}生活与消费预留`,
      value: money(cashPlanTotals.consumption),
      detail: "含房租、家用、学习、旅游与伴侣预留 / 完整明细见上方预算表",
      tone: "green" as Tone,
    },
    {
      id: "monthly-overview-allocation",
      title: `${budgetModeName}投资与应急储备`,
      value: money(cashPlanTotals.saving),
      detail: monthlyAssetAllocationSummary,
      tone: "violet" as Tone,
    },
    {
      id: "monthly-overview-surplus",
      title: `${budgetModeName}预算现金余量`,
      value: money(cashPlanTotals.surplus),
      detail: `可分配 ${money(cashPlanTotals.income)} - 生活消费 ${money(cashPlanTotals.consumption)} - 投资应急 ${money(cashPlanTotals.saving)}`,
      tone: cashPlanTotals.surplus < 0 ? ("red" as Tone) : cashPlanTotals.surplus < cashPlanTotals.income * 0.1 ? ("amber" as Tone) : ("green" as Tone),
    },
    {
      title: "当前账户余额",
      value: money(totals.accountTotal),
      detail: `${currentCashflowItems.length} 个非零账户 / 可提取 ${money(liquidity.liquidCash)} / 扣除专项后可自由动用 ${money(liquidity.available)}`,
      tone: liquidity.available < 0 ? ("red" as Tone) : ("green" as Tone),
      items: currentCashflowItems,
    },
    {
      title: "目前总储蓄",
      value: money(totals.totalSavingsAccountTotal),
      detail: `${totals.totalSavingsAccountCount} 个储蓄账户 / 不含工行2616、微信、现金 / A股待投 ${money(totals.aShareInvestmentReserve)} / 美股待投 ${money(totals.usShareInvestmentReserve)}`,
      tone: "green" as Tone,
    },
    {
      title: "目前总应急",
      value: money(totals.currentEmergencyFund),
      detail: `覆盖 ${totals.emergencyCoverage.toFixed(1)} 个月 / 目标 ${emergencyMonths} 个月`,
      tone: "amber" as Tone,
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
  const accountChartData = accounts
    .map((item, index) => ({ item, index }))
    .sort((left, right) => right.item.balance - left.item.balance || left.index - right.index)
    .map(({ item }, index) => ({
      label: item.name.trim() || "未命名账户",
      value: item.balance,
      color: palette[index % palette.length],
      detail: item.type.trim() || "未分类",
    }));
  const spendingChartData = budgets
    .map((item, index) => ({ item, index }))
    .sort((left, right) => right.item.actual - left.item.actual || right.item.plan - left.item.plan || left.index - right.index)
    .map(({ item }, index) => ({
      label: item.name.trim() || "未命名支出",
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
  const requiredData = [
    { label: "必须支出", value: totals.requiredSpending, color: palette[1] },
    { label: "可取消支出", value: Math.max(totals.spendingPlan - totals.requiredSpending, 0), color: palette[2] },
  ];
  const cashflowMonthlyInflow = cashflowScenario.inflow;
  const cashflowMonthlyOutflow = cashflowScenario.outflow;
  const cashflowExpectedIncrease = cashflowMonthlyInflow - cashflowMonthlyOutflow;
  const cashflowBuiltinRows: CashflowTableRow[] = [
    {
      id: "builtin-salary",
      name: "工资流入",
      amount: annualBudgetPlan.salary,
      direction: "inflow",
      source: "与年度工资规划同步；历史实际收入单独保留",
      onAmountChange: value => updateAnnualBudgetPlan({...annualBudgetPlan, salary: value}),
    },
    ...annualBudgetPlan.rows.map(row => ({
      id: `plan-${row.id}`, name: row.name, amount: row[annualBudgetPlan.mode], direction: "outflow" as const,
      source: `${budgetModeName}统一预算${row.kind !== "consumption" ? "，划拨后仍属个人资产" : ""}`,
      onAmountChange: (value: number) => updateAnnualBudgetPlan({...annualBudgetPlan,
        rows: annualBudgetPlan.rows.map(item => item.id === row.id ? {...item, [annualBudgetPlan.mode]: value} : item)}),
    })),
  ];
  const cashflowRows: CashflowTableRow[] = [
    ...cashflowBuiltinRows,
    ...cashflowCustomItems.map((item) => ({
      id: item.id,
      name: item.name,
      amount: item.amount,
      direction: item.direction,
      source: "预算外追加（不得重复预算内费用）",
      onNameChange: (value: string) => updateCashflowCustomItem(item.id, { name: value }),
      onAmountChange: (value: number) => updateCashflowCustomItem(item.id, { amount: value }),
      onDirectionChange: (value: CashflowDirection) => updateCashflowCustomItem(item.id, { direction: value }),
      onDelete: () => deleteCashflowCustomItem(item.id),
    })),
    {
      id: "calculated-cashflow-expected-increase",
      name: "现金流预计增加",
      amount: cashflowExpectedIncrease,
      direction: cashflowExpectedIncrease >= 0 ? "inflow" : "outflow",
      source: "月流入 - 月流出，自动同步",
      readonlyAmount: true,
      summaryOnly: true,
    },
  ];
  const outflowData = cashflowRows
    .filter((item) => item.direction === "outflow" && !item.summaryOnly)
    .map((item, index) => ({ item, index }))
    .sort((left, right) => right.item.amount - left.item.amount || left.index - right.index)
    .map(({ item }, index) => ({
      label: item.name,
      value: item.amount,
      color: palette[(index + 4) % palette.length],
      detail: item.source,
    }));
  const assetStructureData = totalAssetBreakdown
    .map((item, index) => ({ item, index }))
    .sort((left, right) => right.item.value - left.item.value || left.index - right.index)
    .map(({ item }) => ({
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
    { label: "可动用起点", value: liquidity.available, kind: "start", color: palette[0] },
    { label: "预测收入", value: cashflowMonthlyInflow, kind: "positive", color: palette[1] },
    { label: "消费与预留", value: -cashflowScenario.consumption, kind: "negative", color: palette[4] },
    { label: "投资与应急", value: -cashflowScenario.saving, kind: "negative", color: palette[2] },
    { label: "预算外追加", value: -cashflowScenario.extraOutflow, kind: "negative", color: palette[4] },
    {
      label: "一期后余量",
      value: liquidity.available + cashflowExpectedIncrease,
      kind: "end",
      color: palette[3],
    },
  ];
  const cashPlanWaterfall: WaterfallDatum[] = [
    {label: "工资", value: annualBudgetPlan.salary, kind: "positive", color: palette[0]},
    {label: "出差净结余", value: cashPlanTotals.tripNet, kind: cashPlanTotals.tripNet < 0 ? "negative" : "positive", color: palette[1]},
    {label: "生活消费", value: -cashPlanTotals.consumption, kind: "negative", color: palette[4]},
    {label: "投资应急", value: -cashPlanTotals.saving, kind: "negative", color: palette[2]},
    {label: "现金余量", value: cashPlanTotals.surplus, kind: "end", color: cashPlanTotals.surplus < 0 ? palette[4] : palette[1]},
  ];
  const cashPlanFlow = annualPlanTotals.allocationRows.map(row => ({label: row.name, value: row[annualBudgetPlan.mode]}))
    .filter(item => item.value > 0).map((item, index) => ({...item, color: palette[index % palette.length]}));
  const annualPlanDistribution = [
    {label: "生活与消费预留", value: annualPlanTotals.annualConsumption, color: palette[0]},
    {label: "投资本金", value: annualPlanTotals.annualInvestment, color: palette[1]},
    {label: "新增应急现金", value: annualPlanTotals.annualEmergency, color: palette[2]},
    {label: "额外现金余量", value: Math.max(0, annualPlanTotals.annualSurplus), color: palette[3]},
  ];
  const netWorthTrend = forecast.map((item, index) => ({
    label: item.month,
    value: totals.netWorth + (index + 1) * (cashflowScenario.inflow - cashflowScenario.consumption - cashflowScenario.extraOutflow),
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
  const totalGoalExpectedInput = plannedGoals.reduce((sum, item) => sum + item.monthly, 0);
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
  const fundBucketRows = fundBuckets.map((item, index) => {
    const gap = Math.max(0, item.target - item.current);
    const pastDue = item.dueDate < reviewToday();
    const monthsLeft = monthsBetweenMonthIdAndDate(reviewToday().slice(0, 7), item.dueDate);
    return {
      ...item,
      index,
      gap,
      monthsLeft,
      monthlyNeed: pastDue ? 0 : gap / monthsLeft,
      status: gap <= 0 ? "已覆盖" : pastDue ? "日期已过，状态待核实" : monthsLeft <= 2 ? "紧急补齐" : "持续准备",
    };
  });
  const fundBucketPreparedTotal = fundBucketRows.reduce((sum, item) => sum + item.current, 0);
  const fundBucketTargetTotal = fundBucketRows.reduce((sum, item) => sum + item.target, 0);
  const fundBucketGapTotal = fundBucketRows.reduce((sum, item) => sum + item.gap, 0);
  const urgentFundBucketGap = fundBucketRows
    .filter((item) => item.gap > 0 && item.dueDate >= reviewToday() && item.monthsLeft <= 2)
    .reduce((sum, item) => sum + item.gap, 0);
  const monthlyFundBucketNeed = fundBucketRows.reduce((sum, item) => sum + item.monthlyNeed, 0);
  const liquidAfterBuckets = liquidity.available;
  const monthlyInvestmentPlan = annualBudgetPlan.rows.find(row => row.id === "investment")?.[annualBudgetPlan.mode] ?? 0;
  const investmentReserveCoverage = monthlyInvestmentPlan ? totals.investmentReserve / monthlyInvestmentPlan : 0;
  const cashAfterFamily = actualIncome - totals.spendingActual - totals.parentAllocation - totals.partnerAllocation;
  const cashAfterFamilyAndInvestment = cashAfterFamily - totals.investmentSavingAllocation;
  const fundBucketChartData = liquidity.deductions.map((item, index) => ({label: item.name, value: item.amount, color: palette[index % palette.length], detail: item.source}));
  const fundBucketGapData = fundBucketRows
    .filter((item) => item.gap > 0)
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
    .map((item, index) => ({
      label: item.name,
      value: item.gap,
      color: item.monthsLeft <= 2 ? palette[4] : palette[(index + 2) % palette.length],
      detail: `${item.dueDate} / 每月需 ${money(item.monthlyNeed)}`,
    }));
  const fundBucketMonthlyNeedData = fundBucketRows
    .filter((item) => item.gap > 0)
    .map((item, index) => ({
      label: item.name,
      value: item.monthlyNeed,
      color: item.monthsLeft <= 2 ? palette[4] : palette[index % palette.length],
      detail: `${item.monthsLeft} 个月内`,
    }));
  const monthlyAnalysisSections = [
    {
      title: "现金流安全",
      tone:
        totals.monthlySurplus < 0
          ? ("red" as Tone)
          : cashAfterFamilyAndInvestment < monthlyFundBucketNeed
            ? ("amber" as Tone)
            : ("green" as Tone),
      summary: `当月余额 ${money(totals.monthlySurplus)}，家庭与投资后可用 ${money(cashAfterFamilyAndInvestment)}`,
      detail: `收入 ${money(actualIncome)}，生活支出 ${money(totals.spendingActual)}，家庭责任 ${money(totals.parentAllocation + totals.partnerAllocation)}，投资计划 ${money(totals.investmentSavingAllocation)}。`,
      action:
        totals.monthlySurplus < 0
          ? "先把当月余额转正，暂停非必要小旅行和新增非刚性支出。"
          : cashAfterFamilyAndInvestment < monthlyFundBucketNeed
            ? "未来大花费项目每月需求高于可用现金，优先压缩可调整项目或生活支出。"
            : "现金流可以覆盖当前安排，继续保持每月复盘。",
    },
    {
      title: "大花费项目覆盖",
      tone: liquidAfterBuckets < 0 ? ("red" as Tone) : urgentFundBucketGap > 0 ? ("amber" as Tone) : ("green" as Tone),
      summary: `大花费项目缺口 ${money(fundBucketGapTotal)}，未分配现金 ${money(liquidAfterBuckets)}`,
      detail: `手动项目已准备 ${money(fundBucketPreparedTotal)} / 目标 ${money(fundBucketTargetTotal)}；投资待投金 ${money(totals.investmentReserve)} 单独锁定。`,
      action:
        liquidAfterBuckets < 0
          ? "资金标签超过可动用现金，需要减少已锁定金额或重新分配账户用途。"
          : urgentFundBucketGap > 0
            ? "两个月内到期的大花费项目仍有缺口，优先补齐搬家、分期和近期旅行。"
            : "大花费项目结构健康，按截止日期继续补齐缺口。",
    },
    {
      title: "投资纪律",
      tone: investmentReserveCoverage >= 2 ? ("green" as Tone) : investmentReserveCoverage >= 1 ? ("amber" as Tone) : ("red" as Tone),
      summary: `待投资金可覆盖 ${investmentReserveCoverage.toFixed(1)} 个月计划`,
      detail: `A股待投 ${money(totals.aShareInvestmentReserve)}，美股待投 ${money(totals.usShareInvestmentReserve)}，当前每月投资预算 ${money(monthlyInvestmentPlan)}。`,
      action:
        investmentReserveCoverage >= 2
          ? "不需要额外加速投入；保持只用待投资金，不动应急、旅行和家庭责任资金。"
          : "待投资金覆盖不足，新增投入前先确认应急金和大花费项目不被挤占。",
    },
    {
      title: "应急与负债",
      tone: totals.emergencyCoverage >= 3 && totals.totalDebt <= actualIncome * 0.2 ? ("green" as Tone) : ("amber" as Tone),
      summary: `应急覆盖 ${totals.emergencyCoverage.toFixed(1)} 个月，负债 ${money(totals.totalDebt)}`,
      detail: `应急目标 ${money(totals.emergencyTarget)}，当前 ${money(totals.currentEmergencyFund)}；总负债率 ${percent(totals.debtRatio)}。`,
      action:
        totals.emergencyCoverage < 1
          ? "先把硬应急金做到 1 个月必要支出，再追求更高投资速度。"
          : `应急金继续向 ${emergencyMonths} 个月、${money(totals.emergencyTarget)} 的统一目标推进；分期余额按实际核对。`,
    },
  ];
  const monthlyLearning = summarizeLearning(budgets);
  const monthlyAnalysisReportText = [
    `${activeMonth.label}财务分析报告`,
    "",
    `1. 净资产与现金：总资产 ${money(totals.totalAssets)}，净资产 ${money(totals.netWorth)}，可提取现金 ${money(liquidity.liquidCash)}，扣除专项后可自由动用 ${money(liquidAfterBuckets)}。`,
    `2. 收支：收入 ${money(actualIncome)}，生活支出 ${money(totals.spendingActual)}，资产/责任分配 ${money(totals.assetOutflow)}，当月余额 ${money(totals.monthlySurplus)}。`,
    `3. 家庭责任：父母 ${money(totals.parentAllocation)}，伴侣 ${money(totals.partnerAllocation)}，合计占收入 ${percent((totals.parentAllocation + totals.partnerAllocation) / Math.max(actualIncome, 1))}。`,
    `4. 大花费项目：目标 ${money(fundBucketTargetTotal)}，已准备 ${money(fundBucketPreparedTotal)}，缺口 ${money(fundBucketGapTotal)}，其中两个月内缺口 ${money(urgentFundBucketGap)}。`,
    `5. 投资：投资市值 ${money(totals.investmentValue)}，待投资金 ${money(totals.investmentReserve)}，计划覆盖 ${investmentReserveCoverage.toFixed(1)} 个月，浮动盈亏 ${money(totals.investmentPnL)}。`,
    `6. 应急与负债：应急覆盖 ${totals.emergencyCoverage.toFixed(1)} 个月，总负债 ${money(totals.totalDebt)}，负债率 ${percent(totals.debtRatio)}。`,
    `7. 学习用途：已归类学习净支出 ${reviewMoney(monthlyLearning.total)}；${monthlyLearning.rows.length ? monthlyLearning.rows.map(row => `${row.name} ${reviewMoney(row.actual)}（${row.note?.trim() || "用途待补"}）`).join("；") : "暂无已归类明细，不能据此判断没有学习支出"}。${monthlyLearning.unassigned !== 0 ? `另有 ${reviewMoney(monthlyLearning.unassigned)} 支出待归类。` : ""}`,
    "",
    "行动建议：",
    ...monthlyAnalysisSections.map((section, index) => `${index + 1}. ${section.title}：${section.action}`),
  ].join("\n");
  const reminderAmountData = reminders.map((item, index) => ({
    label: item.name,
    value: item.amount,
    color: palette[index % palette.length],
    detail: reviewDeadlineLabel(item.date, currentDate),
  }));
  const reminderDaysData = reminders.flatMap((item, index) => {
    const days = reviewDayDistance(item.date, currentDate);
    return days === null || days < 0 ? [] : [{label: item.name, value: days,
      color: palette[index % palette.length], detail: `${item.date} / ${reviewDeadlineLabel(item.date, currentDate)}`}];
  });
  const reportRows: ReportRow[] = [
    { id: "salary", name: "工资", amount: salary, flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "stock-income", name: "炒股月结", amount: Math.max(stockIncome, 0), flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "other-income", name: "其他收入", amount: otherIncome, flow: "收入", source: `${activeMonth.label}收入底表` },
    { id: "spending-actual", name: "生活实际支出", amount: totals.spendingActual, flow: "支出", source: "支出预算底表实际汇总" },
    { id: "spending-plan", name: "生活支出预算", amount: totals.spendingPlan, flow: "预算", source: "支出预算底表预算汇总" },
    { id: "budget-remaining", name: "本月预算剩余", amount: totals.budgetRemaining, flow: "可转储蓄", source: "生活支出预算 - 实际支出" },
    { id: "travel-saving", name: "旅游储蓄", amount: totals.travelAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "learning-saving", name: "学习储蓄", amount: totals.learningAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "parent-saving", name: "父母储蓄", amount: totals.parentAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "partner-saving", name: "伴侣基金", amount: totals.partnerAllocationSource, flow: "家庭分配", source: "目标管理本月实际投入，不计入个人总资产" },
    { id: "emergency-saving", name: "应急金投入", amount: totals.emergencyAllocationSource, flow: "资产分配", source: "目标管理本月实际投入" },
    { id: "ashare-plan", name: "A股账本分配", amount: aSharePlan, flow: "资产分配", source: "账本投资分配，非当前预测预算" },
    { id: "usshare-plan", name: "美股账本分配", amount: usSharePlan, flow: "资产分配", source: "账本投资分配，非当前预测预算" },
    { id: "hkshare-plan", name: "港股账本分配", amount: hkSharePlan, flow: "资产分配", source: "账本投资分配，非当前预测预算" },
    { id: "investment-reserve", name: "投资待投金", amount: totals.investmentReserve, flow: "大花费项目", source: "账户用途自动识别：A股待投 + 美股待投" },
    { id: "fund-bucket-gap", name: "大花费项目缺口", amount: fundBucketGapTotal, flow: "大花费项目", source: "大花费项目目标 - 已准备金额" },
    { id: "liquid-after-buckets", name: "可自由动用现金", amount: liquidAfterBuckets, flow: "安全垫", source: "可提取账户 - 专项账户占用 - 项目追加锁定（关联后去重）" },
    { id: "monthly-surplus", name: "当月余额", amount: totals.monthlySurplus, flow: "结余", source: "收入 - 实际支出 - 实际资产分配" },
  ];
  const reportData = [
    { label: "收入", value: actualIncome, color: palette[0] },
    { label: "支出", value: totals.spendingActual, color: palette[4] },
    { label: "资产分配", value: totals.assetOutflow, color: palette[1] },
    { label: "月结余", value: Math.max(totals.monthlySurplus, 0), color: palette[3] },
  ];
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
  const monthlyArchiveIncomeTrend = monthlyArchiveTimeline.map((archive, index) => ({
    label: shortMonth(archive.label),
    value: archive.income,
    color: archive.monthId === selectedMonth ? palette[0] : palette[index % palette.length],
    detail: archive.monthId === selectedMonth && !savedSelectedMonthlyArchive ? "当前预览" : "已存档",
  }));
  const monthlyArchiveSpendingTrend = monthlyArchiveTimeline.map((archive, index) => ({
    label: shortMonth(archive.label),
    value: archive.spending,
    color: archive.monthId === selectedMonth ? palette[4] : palette[(index + 4) % palette.length],
    detail: archive.monthId === selectedMonth && !savedSelectedMonthlyArchive ? "当前预览" : "已存档",
  }));
  const monthlyArchiveNetWorthLine = monthlyArchiveTimeline.map((archive) => ({
    label: shortMonth(archive.label),
    value: archive.netWorth,
  }));
  const monthlyArchiveAccountLine = monthlyArchiveTimeline.map((archive) => ({
    label: shortMonth(archive.label),
    value: archive.accountTotal,
  }));
  const monthlyArchiveSurplusLine = monthlyArchiveTimeline.map((archive) => ({
    label: shortMonth(archive.label),
    value: archive.surplus,
  }));
  const selectedArchiveIncomeDelta = monthlyArchiveForComparison.income - (previousSelectedMonthlyArchive?.income ?? 0);
  const selectedArchiveSpendingDelta = monthlyArchiveForComparison.spending - (previousSelectedMonthlyArchive?.spending ?? 0);
  const selectedArchiveAccountDelta = monthlyArchiveForComparison.accountTotal - (previousSelectedMonthlyArchive?.accountTotal ?? 0);
  const selectedArchiveNetWorthDelta = monthlyArchiveForComparison.netWorth - (previousSelectedMonthlyArchive?.netWorth ?? 0);

  async function copyMonthlyAnalysisReport() {
    try {
      await navigator.clipboard.writeText(monthlyAnalysisReportText);
      setReportCopyStatus("报告已复制到剪贴板");
    } catch {
      setReportCopyStatus("复制失败，可以直接选中文本复制");
    }
  }

  return (
    <main className="finance-page">
      <nav className="side-nav" aria-label="财务模块导航">
        <div className="brand">
          <span className="brand-mark">PF</span>
          <div>
            <strong>个人财务系统</strong>
            <small>年度预算 / 财务账本</small>
          </div>
        </div>
        <button
          className={!navigationTarget || navigationTarget.id === "overview" ? "active" : ""}
          aria-current={!navigationTarget || navigationTarget.id === "overview" ? "location" : undefined}
          type="button"
          onClick={() => navigateToSection("overview")}
        >
          总览
        </button>
        {moduleList.map((item) => (
          <button
            className={navigationTarget?.id === item.id ? "active" : ""}
            aria-current={navigationTarget?.id === item.id ? "location" : undefined}
            key={item.id}
            type="button"
            onClick={() => navigateToSection(item.id)}
          >
            {item.title}
          </button>
        ))}
      </nav>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>长期个人财务管理系统</h1>
            <p>先核对全年安排与月份周转，再查看账本、账户与资产。</p>
          </div>
          <div className="period-tabs" aria-label="时间视图">
            {(["周", "月", "季", "年"] as Period[]).map((item) => (
              <button className={period === item ? "active" : ""} key={item} onClick={() => setPeriod(item)}>
                {item}
              </button>
            ))}
          </div>
        </header>

        <section className="data-safety-bar" aria-label="数据保存与备份">
          <div className="save-indicator">
            <span className={savedDataReady ? "save-dot ready" : "save-dot"} />
            <div>
              <strong>{saveStatus}</strong>
              <small>本机自动保存 · 每 30 秒检查 · {cloudStatus}</small>
            </div>
          </div>
          <div className="data-actions">
            <button className="primary-button" disabled={!savedDataReady || cloudSyncing} type="button" onClick={() => void saveCurrentData()}>保存当前数据</button>
            <button className="secondary-button" disabled={!savedDataReady || cloudSyncing} type="button" onClick={() => void saveMonthlyArchive()}>保存本月月报</button>
            <button className="secondary-button" disabled={!savedDataReady || cloudSyncing} type="button" onClick={() => void saveSnapshot()}>保存完整版本</button>
            <button className="secondary-button" type="button" onClick={() => setActiveModules((items) => (items.includes("cloudSync") ? items : [...items, "cloudSync"]))}>
              打开云同步
            </button>
            <button className="secondary-button" type="button" onClick={() => setHistoryOpen((open) => !open)}>
              历史版本 {snapshots.length > 0 ? `(${snapshots.length})` : ""}
            </button>
            <button className="secondary-button" type="button" onClick={exportBackup}>导出备份</button>
            <button className="secondary-button" type="button" onClick={() => importInputRef.current?.click()}>导入备份</button>
            <input
              ref={importInputRef}
              className="visually-hidden"
              accept="application/json,.json"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void importBackup(file);
              }}
            />
          </div>
        </section>

        {historyOpen && (
          <section className="history-panel">
            <div className="history-heading">
              <div>
                <h2>历史版本</h2>
                <p>最多保留最近 {maxSnapshots} 个手动快照。恢复前可以先保存当前版本。</p>
              </div>
              <button className="secondary-button" type="button" onClick={() => setHistoryOpen(false)}>关闭</button>
            </div>
            {snapshots.length === 0 ? (
              <div className="history-empty">还没有历史版本。点击“保存历史版本”即可创建第一个快照。</div>
            ) : (
              <div className="history-list">
                {snapshots.map((snapshot) => (
                  <article className="history-item" key={snapshot.id}>
                    <div>
                      <strong>{formatSnapshotTime(snapshot.createdAt)}</strong>
                      <span>{snapshot.data.selectedMonth ?? selectedMonth} · {snapshot.data.accounts.length} 个账户</span>
                    </div>
                    <div className="history-actions">
                      <button className="secondary-button" type="button" onClick={() => restoreSnapshot(snapshot)}>恢复</button>
                      <button className="danger-button" type="button" onClick={() => deleteSnapshot(snapshot.id)}>删除</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <AnnualBudgetPlanner plan={annualBudgetPlan} onChange={updateAnnualBudgetPlan}
          saveAction={<button type="button" disabled={!savedDataReady || cloudSyncing} onClick={() => void saveCurrentData()}>保存分配预算</button>}
          saveStatus={`${saveStatus} · ${cloudStatus}`} />
        <details className="finance-ledger" open={ledgerOpen} onToggle={event => setLedgerOpen(event.currentTarget.open)}>
          <summary>查看账本、资产与历史记录 <span>按已保存的月份查看实际数据</span></summary>
          <p className="ledger-context">预算汇总与上方年度方案和所选月份类型同步。账户余额、资产和历史收支按已录入数据计算；核算当前净资产前，请更新公司借款及各账户余额。</p>
        <section className="overview" id="finance-overview" tabIndex={-1} aria-labelledby="finance-overview-title">
          <div className="section-title">
            <div>
              <h2 id="finance-overview-title">账户与预算总览</h2>
              <p>前四项是{budgetModeName}预算；账户与资产按实际余额统计，历史收支可在对应模块查看。</p>
            </div>
            <span className="pill good">公开页已脱敏</span>
          </div>
          <article className="total-assets-hero">
            <div className="total-assets-main">
              <span>当前总资产与负债</span>
              <strong>{money(totals.totalAssets)}</strong>
              <small>资产合计 {money(totals.totalAssets)} / 总负债 {money(totals.totalDebt)} / 净资产 {money(totals.netWorth)}；家庭及伴侣储蓄单列，不计入个人总资产。</small>
            </div>
            <div className="total-assets-breakdown" aria-label="总资产和负债资金分布">
              {assetLiabilityBreakdown.map((item) => (
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
              <article data-testid={item.id} className={`overview-card ${item.tone} ${item.items ? "with-line-items" : ""}`.trim()} key={item.title}>
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
                <p>年度资金分布、现金瀑布和资金流向使用同一份年度方案；账本图表注明所选月份。</p>
              </div>
            </div>
            <div className="chart-grid four">
              <ChartPanel title="资产结构" summary={`总资产 ${money(totals.totalAssets)}`}>
                <DonutChart data={assetStructureData} centerLabel="总资产" centerValue={money(totals.totalAssets)} />
              </ChartPanel>
              <ChartPanel title="年度资金分布" summary={`全年全部安排 ${money(annualPlanTotals.annualOutflow)}`}>
                <DonutChart data={annualPlanDistribution} centerLabel={annualPlanTotals.annualSurplus >= 0 ? "可分配资金" : "年度安排"} centerValue={money(annualPlanTotals.annualSurplus >= 0 ? annualPlanTotals.annualIncome : annualPlanTotals.annualOutflow)} />
              </ChartPanel>
              <ChartPanel title="账本支出最高项" summary={`${activeMonth.label} / 已花 ${money(totals.spendingActual)}`} className="spending-top-panel">
                <HorizontalBarChart data={topSpendingData} valueFormatter={money} />
              </ChartPanel>
              <ChartPanel title="账本健康维度" summary={`${activeMonth.label} / 综合 ${totals.score} 分`}>
                <HorizontalBarChart data={healthDimensions} valueFormatter={(value) => `${value.toFixed(0)}分`} percentMode />
              </ChartPanel>
              <ChartPanel title={`${budgetModeName}预算现金瀑布`} summary={`全部安排 ${money(cashPlanTotals.totalOutflow)}`}>
                <WaterfallChart data={cashPlanWaterfall} />
              </ChartPanel>
              <ChartPanel title="账本现金流日历" summary={`${activeMonth.label}账本及提醒记录`}>
                <CashflowCalendar events={cashflowEvents} />
              </ChartPanel>
              <ChartPanel title="账本风险矩阵" summary={`${activeMonth.label}账本模型`} className="wide risk-panel">
                <RiskMatrix data={riskMatrixData} />
              </ChartPanel>
              <ChartPanel title={`${budgetModeName}预算流向`} summary={`全部安排 ${money(cashPlanTotals.totalOutflow)}`}>
                <FlowMap data={cashPlanFlow} source="工资账户" valueFormatter={money} />
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
              <section className="detail-panel" id={`finance-${moduleId}`} tabIndex={-1} aria-label={moduleList.find(item => item.id === moduleId)?.title} key={moduleId}>
                {moduleId === "income" && (
                  <Module title="收入" desc="收入只看实际到账；炒股月结算单独记录，不进入现金流预测。">
                    <EditableNumber label="每月工资规划（元）" value={annualBudgetPlan.salary} onChange={value => updateAnnualBudgetPlan({...annualBudgetPlan, salary:value})}/>
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
                  <Module title="支出" desc="细项支出按大类归属；学习单列用途，日常使用可按咔皮记账报告核对。">
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
                          <EditableBudgetTable budgets={budgets} deleteBudget={deleteBudget} addBudget={addBudget} addDetailedBudgets={addDetailedBudgets} updateBudget={updateBudget} />
                          <LearningUsage budgets={budgets} monthLabel={activeMonth.label} allowance={annualBudgetPlan.rows.find(row => row.id === "learning")?.[annualBudgetPlan.mode] ?? 0}/>
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
                          <ChartPanel title="分类预算执行" summary="实际 / 预算 / 按实际金额降序">
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
                  <Module title="当前现金流预测" desc="当前余额扣除专项占用，再测算六个完整月预算周期；不是本月剩余天数的到账预测。出差补贴未确认到账，不预支；历史账本不参与当前预算。">
                    <DataChartLayout
                      data={
                        <>
                          <LiquiditySummary liquidity={liquidity}/>
                          <label className="field"><span>预测月份类型</span><select aria-label="预测月份类型" value={annualBudgetPlan.mode} onChange={event => updateAnnualBudgetPlan({...annualBudgetPlan, mode: event.target.value as "normal" | "trip"})}><option value="normal">普通月</option><option value="trip" disabled={annualBudgetPlan.awayMonths === 0}>出差月（不预支补贴）</option></select></label>
                          <EditableCashflowInputsTable
                            accountTotal={liquidity.available}
                            addCashflowCustomItem={addCashflowCustomItem}
                            monthlyInflow={cashflowMonthlyInflow}
                            monthlyOutflow={cashflowMonthlyOutflow}
                            rows={cashflowRows}
                          />
                          <EditableReminderTable
                            baseDate={currentDate}
                            reminders={reminders}
                            addReminder={addReminder}
                            deleteReminder={deleteReminder}
                            updateReminder={updateReminder}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="可动用余量情景" summary={`${budgetModeName} × 6 个完整周期`}>
                            <LineChart data={cashflowLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度流出压力" summary={`每月流出 ${money(cashflowMonthlyOutflow)}`}>
                            <VerticalBarChart data={cashflowOutflowBars} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="现金瀑布" summary="一个完整预算周期">
                            <WaterfallChart data={waterfallData} />
                          </ChartPanel>
                          <ChartPanel title="现金流日历" summary="事项提醒，不重复扣预算">
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
                          <ChartPanel title="账户余额分布" summary={`账户合计 ${money(totals.accountTotal)} / 按余额降序`}>
                            <DonutChart data={accountChartData} centerLabel="账户" centerValue={money(totals.accountTotal)} />
                          </ChartPanel>
                          <ChartPanel title="可提取账户余额" summary={`含专项 ${money(liquidity.liquidCash)} / 自由动用 ${money(liquidity.available)}`}>
                            <HorizontalBarChart data={accountChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="账户用途映射" summary="账户余额流向 / 按余额降序">
                            <FlowMap data={accountChartData} source="账户池" valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "budget" && (
                  <Module title="预算管理" desc="与首页完整分配表同步，按不出差月份、出差月份及全年预算计算。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="button-row">
                            <button type="button" className="ghost-button" aria-pressed={annualBudgetPlan.mode === "normal"} onClick={() => setAnnualBudgetPlan({...annualBudgetPlan, mode:"normal"})}>不出差月份</button>
                            <button type="button" className="ghost-button" aria-pressed={annualBudgetPlan.mode === "trip"} disabled={annualBudgetPlan.awayMonths === 0} onClick={() => setAnnualBudgetPlan({...annualBudgetPlan, mode:"trip"})}>出差月份</button>
                          </div>
                          <div className="stat-strip">
                            <Stat label={`${budgetModeName}可分配资金`} value={money(cashPlanTotals.income)} />
                            <Stat label={`${budgetModeName}全部分配`} value={money(cashPlanTotals.totalOutflow)} />
                            <Stat label={`${budgetModeName}现金余量`} value={money(cashPlanTotals.surplus)} />
                            <Stat label="全年全部分配" value={money(annualPlanTotals.annualOutflow)} />
                          </div>
                          <AnnualBudgetAllocationTable plan={annualBudgetPlan} onChange={updateAnnualBudgetPlan} titleId="module-annual-allocation-title"
                            saveAction={<button type="button" disabled={!savedDataReady || cloudSyncing} onClick={() => void saveCurrentData()}>保存分配预算</button>}
                            saveStatus={`${saveStatus} · ${cloudStatus}`}/>
                          <details>
                            <summary>查看历史月份预算与实际支出</summary>
                            <p className="ledger-context">以下是已保存月份的账本数据，年度分配表用于当前计划；历史预算金额可在这里单独维护。</p>
                            <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                            <EditableBudgetTable budgets={budgets} deleteBudget={deleteBudget} addBudget={addBudget} addDetailedBudgets={addDetailedBudgets} updateBudget={updateBudget} />
                          </details>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="年度资金分布" summary={`可分配 ${money(annualPlanTotals.annualIncome)} / 全部分配 ${money(annualPlanTotals.annualOutflow)}`}>
                            <DonutChart data={annualPlanDistribution} centerLabel={annualPlanTotals.annualSurplus >= 0 ? "可分配资金" : "年度安排"} centerValue={money(annualPlanTotals.annualSurplus >= 0 ? annualPlanTotals.annualIncome : annualPlanTotals.annualOutflow)} />
                          </ChartPanel>
                          <ChartPanel title={`${budgetModeName}分类分配`} summary={`合计 ${money(cashPlanTotals.totalOutflow)}`}>
                            <HorizontalBarChart data={cashPlanFlow} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title={`${budgetModeName}现金流核对`} summary={`余量 ${money(cashPlanTotals.surplus)}`}>
                            <WaterfallChart data={cashPlanWaterfall} />
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
                  <Module title="应急&学习金" desc="预算合并显示，应急储备与学习实际支出分开核算；学习额度不计为应急余额。">
                    <div className="stat-strip">
                      <Stat label="每月应急划拨预算" value={money(annualBudgetPlan.rows.find(row => row.id === "emergency")?.[annualBudgetPlan.mode] ?? 0)} />
                      <Stat label="每月学习消费预算" value={money(annualBudgetPlan.rows.find(row => row.id === "learning")?.[annualBudgetPlan.mode] ?? 0)} />
                    </div>
                    <DataChartLayout
                      data={
                        <>
                          <EditableEmergencyTable
                            saveAction={<button className="primary-button" disabled={!savedDataReady || cloudSyncing} type="button" onClick={() => void saveCurrentData()}>保存应急设置</button>}
                            emergencyFund={totals.currentEmergencyFund}
                            accountCount={emergencyAccounts.length}
                            emergencyMonthlyNeed={emergencyMonthlyNeed}
                            emergencyMonths={emergencyMonths}
                            setEmergencyFund={setEmergencyFundFromInput}
                            setEmergencyMonthlyNeed={setEmergencyMonthlyNeed}
                            setEmergencyMonths={setEmergencyMonths}
                          />
                          <p className="review-caption" role="status">{saveStatus} · {cloudStatus}</p>
                          <div className="stat-strip">
                            <Stat label="覆盖月数" value={`${totals.emergencyCoverage.toFixed(1)} 个月`} />
                            <Stat label="目标金额" value={money(totals.emergencyTarget)} />
                            <Stat label="缺口" value={money(Math.max(0, totals.emergencyTarget - totals.currentEmergencyFund))} />
                            <Stat label="当前进度" value={percent(totals.emergencyCoverage / Math.max(emergencyMonths, 1))} />
                          </div>
                          <label className="field"><span>学习统计月份</span><select aria-label="学习统计月份" value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}>{monthlyRecords.map(record => <option key={record.id} value={record.id}>{record.label}</option>)}</select></label>
                          <LearningUsage budgets={budgets} monthLabel={activeMonth.label} allowance={annualBudgetPlan.rows.find(row => row.id === "learning")?.[annualBudgetPlan.mode] ?? 0}/>
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="应急金覆盖" summary={`${totals.emergencyCoverage.toFixed(1)} / ${emergencyMonths} 个月`}>
                            <ProgressList
                              data={[
                                {
                                  label: "应急金目标",
                                  value: totals.currentEmergencyFund,
                                  max: totals.emergencyTarget,
                                  color: palette[1],
                                  detail: `缺口 ${money(Math.max(0, totals.emergencyTarget - totals.currentEmergencyFund))}`,
                                },
                              ]}
                              valueFormatter={money}
                            />
                          </ChartPanel>
                          <ChartPanel title="必要支出压力" summary={`应急基准 ${money(totals.emergencyMonthlyNeed)}`}>
                            <HorizontalBarChart
                              data={[
                                { label: "应急月均支出", value: totals.emergencyMonthlyNeed, color: palette[1] },
                                { label: "当前消费预留", value: cashPlanTotals.consumption, color: palette[2] },
                                { label: "当前全部安排", value: cashPlanTotals.totalOutflow, color: palette[4] },
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
                          baseDate={currentDate}
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
                          <ChartPanel title="距离到期" summary={`北京时间 ${currentDate} / 仅今日及未来事项`}>
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
                  <Module title="目标管理" desc="旅游、学习、父母储蓄、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <EditableGoalsTable
                            goals={plannedGoals}
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
                              data={plannedGoals.map((item, index) => ({
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

                {moduleId === "fundBuckets" && (
                  <Module title="大花费项目" desc="把旅行、搬家、手机分期、应急金和投资待投金拆开，避免同一笔钱被重复占用。">
                    <DataChartLayout
                      data={
                        <>
                          <LiquiditySummary liquidity={liquidity}/>
                          <EditableFundBucketTable
                            accounts={accounts}
                            buckets={fundBucketRows}
                            addFundBucket={addFundBucket}
                            deleteFundBucket={deleteFundBucket}
                            investmentReserve={totals.investmentReserve}
                            liquidAfterBuckets={liquidAfterBuckets}
                            monthlyNeed={monthlyFundBucketNeed}
                            updateFundBucket={updateFundBucket}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="已锁定资金" summary="可提取现金中的占用，已去重">
                            <DonutChart data={fundBucketChartData} centerLabel="已锁定" centerValue={money(liquidity.reserved)} />
                          </ChartPanel>
                          <ChartPanel title="大花费项目缺口" summary={`总缺口 ${money(fundBucketGapTotal)}`}>
                            <HorizontalBarChart data={fundBucketGapData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="每月补齐压力" summary={`每月需 ${money(monthlyFundBucketNeed)}`}>
                            <VerticalBarChart data={fundBucketMonthlyNeedData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="大花费项目结论" summary={liquidAfterBuckets < 0 || liquidity.overallocated > 0 || liquidity.unlinkedCount > 0 ? "占用待核对" : "占用已核算"}>
                            <div className="fund-bucket-note">
                              <strong>{liquidAfterBuckets < 0 || liquidity.overallocated > 0 ? "存在资金占用缺口" : liquidity.unlinkedCount > 0 ? "存在未关联账户的项目" : "当前余额可覆盖已锁定金额"}</strong>
                              <span>
                                未准备的项目缺口不冒充已锁定资金。待付账单是否包含在预算内，仍需核对。
                              </span>
                            </div>
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "periodReview" && (
                  <Module title="周期复盘" desc="本期实际发生额与上期同类周期比较；记录与账本明细分别保存。">
                    <FinanceReviewPanel records={financeReviews} plan={annualBudgetPlan} accounts={accounts}
                      focusSource={{
                        projects:fundBuckets.map(({id,name,target,current,dueDate})=>({id,name,target,current,dueDate})),
                        bills:reminders.map(({id,name,amount,date,kind})=>({id,name,amount,date,kind})),
                        assets:balanceAssets.map(({id,name,amount})=>({id,name,amount})),
                        debts:liabilities.map(({id,name,amount})=>({id,name,amount})), holdings:totals.investmentValue,
                      }} onOpenModule={navigateToSection} onChange={(records, updatedAccounts) => {
                      const nextAccounts = updatedAccounts ? accounts.map(account => {
                        const updated = updatedAccounts.find(row => row.id === account.id);
                        return updated ? {...account, balance: updated.balance} : account;
                      }) : accounts;
                      persistLocalFinanceData({...getPersistedFinanceData(), financeReviews: records, accounts: nextAccounts});
                      setFinanceReviews(records);
                      if (updatedAccounts) setAccounts(nextAccounts);
                    }}/>
                  </Module>
                )}

                {moduleId === "reports" && (
                  <Module title="财务报表" desc="每月自动生成完整分析报告，覆盖净资产、现金流、投资、大花费项目、家庭责任和风险。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="stat-strip">
                            <Stat label="收入" value={money(actualIncome)} />
                            <Stat label="支出" value={money(totals.spendingActual)} />
                            <Stat label="结余" value={money(totals.monthlySurplus)} />
                            <Stat label="项目后现金" value={money(liquidAfterBuckets)} />
                          </div>
                          <MonthlyAnalysisReport
                            copyStatus={reportCopyStatus}
                            reportText={monthlyAnalysisReportText}
                            sections={monthlyAnalysisSections}
                            onCopy={copyMonthlyAnalysisReport}
                          />
                          <ReportAutoSyncTable
                            allocation={totals.assetOutflow}
                            income={actualIncome}
                            rows={reportRows}
                            spending={totals.spendingActual}
                            surplus={totals.monthlySurplus}
                          />
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

                {moduleId === "monthlyArchive" && (
                  <Module title="月度存档" desc="每月底保存一次月报，用来追踪收入、支出、账户余额和净资产的环比变化。">
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
                          <div className="stat-strip">
                            <Stat label="收入变化" value={previousSelectedMonthlyArchive ? signedMoney(selectedArchiveIncomeDelta) : "待对比"} />
                            <Stat label="支出变化" value={previousSelectedMonthlyArchive ? signedMoney(selectedArchiveSpendingDelta) : "待对比"} />
                            <Stat label="账户变化" value={previousSelectedMonthlyArchive ? signedMoney(selectedArchiveAccountDelta) : "待对比"} />
                            <Stat label="净资产变化" value={previousSelectedMonthlyArchive ? signedMoney(selectedArchiveNetWorthDelta) : "待对比"} />
                          </div>
                          <MonthlyArchiveTable
                            archives={monthlyArchives}
                            currentArchive={currentMonthlyArchive}
                            deleteMonthlyArchive={deleteMonthlyArchive}
                            saveMonthlyArchive={saveMonthlyArchive}
                            selectedMonth={selectedMonth}
                            onSelectMonth={setSelectedMonth}
                          />
                          <AccountArchiveChangeTable
                            currentArchive={monthlyArchiveForComparison}
                            previousArchive={previousSelectedMonthlyArchive}
                          />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="存档收入趋势" summary={`${monthlyArchiveTimeline.length} 个月 / 当前 ${money(actualIncome)}`}>
                            <VerticalBarChart data={monthlyArchiveIncomeTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="存档支出趋势" summary={`当前支出 ${money(totals.spendingActual)}`}>
                            <VerticalBarChart data={monthlyArchiveSpendingTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="账户余额变化" summary={`当前账户 ${money(totals.accountTotal)}`}>
                            <LineChart data={monthlyArchiveAccountLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="净资产变化" summary={`当前净资产 ${money(totals.netWorth)}`}>
                            <LineChart data={monthlyArchiveNetWorthLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="当月余额变化" summary="收入 - 支出 - 分配">
                            <LineChart data={monthlyArchiveSurplusLine} valueFormatter={money} />
                          </ChartPanel>
                        </div>
                      }
                    />
                  </Module>
                )}

                {moduleId === "cloudSync" && (
                  <Module title="云同步" desc="点击保存会把加密数据写入 GitHub Gist；另一台电脑可从这里恢复同一份数据。">
                    <DataChartLayout
                      data={
                        <CloudSyncPanel
                          cloudPassphrase={cloudPassphrase}
                          cloudStatus={cloudStatus}
                          cloudSyncing={cloudSyncing}
                          clearCloudSyncSettings={clearCloudSyncSettings}
                          downloadCloudSync={downloadCloudSync}
                          settings={cloudSyncSettings}
                          setCloudPassphrase={updateCloudPassphrase}
                          updateCloudSyncSettings={updateCloudSyncSettings}
                          uploadCloudSync={() => void uploadCloudSync(false)}
                        />
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="同步状态" summary={cloudSyncSettings.gistId ? "已配置 Gist" : "未创建云端存档"}>
                            <div className="cloud-status-board">
                              <div>
                                <span>云端 Gist</span>
                                <strong>{cloudSyncSettings.gistId || "未创建"}</strong>
                              </div>
                              <div>
                                <span>自动同步</span>
                                <strong>{cloudSyncSettings.autoSync ? "开启" : "关闭"}</strong>
                              </div>
                              <div>
                                <span>打开自动恢复</span>
                                <strong>{cloudSyncSettings.rememberPassphrase ? "开启" : "关闭"}</strong>
                              </div>
                              <div>
                                <span>上次上传</span>
                                <strong>{cloudSyncSettings.lastPushedAt ? formatSnapshotTime(cloudSyncSettings.lastPushedAt) : "暂无"}</strong>
                              </div>
                              <div>
                                <span>上次拉取</span>
                                <strong>{cloudSyncSettings.lastPulledAt ? formatSnapshotTime(cloudSyncSettings.lastPulledAt) : "暂无"}</strong>
                              </div>
                            </div>
                          </ChartPanel>
                          <ChartPanel title="本机数据包" summary={`${monthlyRecords.length} 个月 / ${monthlyArchives.length} 条月报`}>
                            <HorizontalBarChart
                              data={[
                                { label: "收入月份", value: monthlyRecords.length, color: palette[0] },
                                { label: "月度存档", value: monthlyArchives.length, color: palette[1] },
                                { label: "完整版本", value: snapshots.length, color: palette[3] },
                                { label: "账户数量", value: accounts.length, color: palette[2] },
                              ]}
                              valueFormatter={(value) => `${value.toFixed(0)} 条`}
                            />
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
        </details>
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
      onInput={(event) => {if (event.currentTarget.validity.valid && event.currentTarget.value !== value) onChange(event.currentTarget.value);}}
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
              <th>工资到账记录</th>
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

function CloudSyncPanel({
  settings,
  cloudPassphrase,
  cloudStatus,
  cloudSyncing,
  updateCloudSyncSettings,
  setCloudPassphrase,
  uploadCloudSync,
  downloadCloudSync,
  clearCloudSyncSettings,
}: {
  settings: CloudSyncSettings;
  cloudPassphrase: string;
  cloudStatus: string;
  cloudSyncing: boolean;
  updateCloudSyncSettings: (patch: Partial<CloudSyncSettings>) => void;
  setCloudPassphrase: (value: string) => void;
  uploadCloudSync: () => void;
  downloadCloudSync: () => void;
  clearCloudSyncSettings: () => void;
}) {
  return (
    <>
      <TableToolbar
        title="云同步连接"
        meta={settings.gistId ? `Gist ${settings.gistId}` : "首次上传会自动创建私密 Gist"}
        action={<span className={settings.autoSync ? "pill good" : "pill"}>{settings.autoSync ? "自动云同步" : "手动同步"}</span>}
      />
      <div className="cloud-sync-card">
        <div className="form-grid cloud-sync-form">
          <label className="field">
            <span>Gist ID</span>
            <input
              autoComplete="off"
              placeholder="首次上传可留空"
              value={settings.gistId}
              onChange={(event) => updateCloudSyncSettings({ gistId: event.target.value.trim() })}
            />
          </label>
          <label className="field">
            <span>GitHub Token</span>
            <input
              autoComplete="off"
              placeholder="需要 gist 权限"
              type="password"
              value={settings.token}
              onChange={(event) => updateCloudSyncSettings({ token: event.target.value.trim() })}
            />
          </label>
          <label className="field">
            <span>同步密码</span>
            <input
              autoComplete="new-password"
              placeholder={settings.rememberPassphrase ? "已选择本机保存" : "默认不保存"}
              type="password"
              value={cloudPassphrase}
              onChange={(event) => setCloudPassphrase(event.target.value)}
            />
          </label>
          <label className="field cloud-switch-field">
            <span>自动云同步</span>
            <span className="cloud-switch-row">
              <input
                checked={settings.autoSync}
                type="checkbox"
                onChange={(event) => updateCloudSyncSettings({ autoSync: event.target.checked })}
              />
              <em>{settings.autoSync ? "已开启" : "已关闭"}</em>
            </span>
          </label>
          <label className="field cloud-switch-field">
            <span>打开时自动恢复</span>
            <span className="cloud-switch-row">
              <input
                checked={settings.rememberPassphrase}
                type="checkbox"
                onChange={(event) => updateCloudSyncSettings({ rememberPassphrase: event.target.checked })}
              />
              <em>{settings.rememberPassphrase ? "本机记住密码" : "需手动输入密码"}</em>
            </span>
          </label>
        </div>
        <div className="cloud-sync-actions">
          <button className="primary-button" disabled={cloudSyncing} type="button" onClick={uploadCloudSync}>
            保存到云端
          </button>
          <button className="secondary-button" disabled={cloudSyncing} type="button" onClick={downloadCloudSync}>
            恢复云端数据
          </button>
          <button className="danger-button" disabled={cloudSyncing && !settings.gistId} type="button" onClick={clearCloudSyncSettings}>
            断开本机配置
          </button>
        </div>
        <div className="cloud-sync-status">
          <strong>{cloudSyncing ? "同步中…" : cloudStatus}</strong>
          <span>云端内容使用同步密码加密；Token 和可选保存的同步密码只保存在当前浏览器。</span>
        </div>
      </div>
    </>
  );
}

function MonthlyArchiveTable({
  archives,
  currentArchive,
  selectedMonth,
  saveMonthlyArchive,
  deleteMonthlyArchive,
  onSelectMonth,
}: {
  archives: MonthlyArchive[];
  currentArchive: MonthlyArchive;
  selectedMonth: string;
  saveMonthlyArchive: () => void | Promise<void>;
  deleteMonthlyArchive: (id: string) => void;
  onSelectMonth: (monthId: string) => void;
}) {
  const sortedArchives = [...archives].sort((a, b) => b.monthId.localeCompare(a.monthId) || b.savedAt.localeCompare(a.savedAt));
  const selectedSavedArchive = archives.find((archive) => archive.monthId === selectedMonth);
  const previousArchive = previousMonthlyArchive(archives, selectedMonth);
  const incomeDelta = previousArchive ? currentArchive.income - previousArchive.income : 0;
  const spendingDelta = previousArchive ? currentArchive.spending - previousArchive.spending : 0;
  const accountDelta = previousArchive ? currentArchive.accountTotal - previousArchive.accountTotal : 0;
  const netWorthDelta = previousArchive ? currentArchive.netWorth - previousArchive.netWorth : 0;

  return (
    <>
      <TableToolbar
        title="月度存档底表"
        meta={`${archives.length} 条月报 / 当前 ${currentArchive.label}${selectedSavedArchive ? " 已保存" : " 未保存"}`}
        action={<button className="primary-button" type="button" onClick={() => void saveMonthlyArchive()}>保存当前月报</button>}
      />
      <div className="archive-current-grid" aria-label="当前月报预览">
        <div className="archive-current-metric">
          <span>当前收入</span>
          <strong>{money(currentArchive.income)}</strong>
          <em className={previousArchive ? changeClassName(incomeDelta) : ""}>{previousArchive ? signedMoney(incomeDelta) : "等待上月月报"}</em>
        </div>
        <div className="archive-current-metric">
          <span>当前支出</span>
          <strong>{money(currentArchive.spending)}</strong>
          <em>{previousArchive ? signedMoney(spendingDelta) : "等待上月月报"}</em>
        </div>
        <div className="archive-current-metric">
          <span>账户余额</span>
          <strong>{money(currentArchive.accountTotal)}</strong>
          <em className={previousArchive ? changeClassName(accountDelta) : ""}>{previousArchive ? signedMoney(accountDelta) : "等待上月月报"}</em>
        </div>
        <div className="archive-current-metric">
          <span>净资产</span>
          <strong>{money(currentArchive.netWorth)}</strong>
          <em className={previousArchive ? changeClassName(netWorthDelta) : ""}>{previousArchive ? signedMoney(netWorthDelta) : "等待上月月报"}</em>
        </div>
      </div>
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table monthly-archive-table">
          <thead>
            <tr>
              <th>月份</th>
              <th>保存时间</th>
              <th>收入</th>
              <th>支出</th>
              <th>资产分配</th>
              <th>当月余额</th>
              <th>账户余额</th>
              <th>净资产</th>
              <th>环比变化</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {sortedArchives.length === 0 && (
              <tr>
                <td className="calculated-cell" colSpan={10}>还没有月度存档。确认当月数据后点击“保存当前月报”。</td>
              </tr>
            )}
            {sortedArchives.map((archive) => {
              const previous = previousMonthlyArchive(archives, archive.monthId);
              const archiveIncomeDelta = previous ? archive.income - previous.income : 0;
              const archiveSpendingDelta = previous ? archive.spending - previous.spending : 0;
              const archiveAccountDelta = previous ? archive.accountTotal - previous.accountTotal : 0;
              const archiveNetWorthDelta = previous ? archive.netWorth - previous.netWorth : 0;
              return (
                <tr className={archive.monthId === selectedMonth ? "selected-row" : ""} key={archive.id}>
                  <td>
                    <button className="row-select-button" type="button" onClick={() => onSelectMonth(archive.monthId)}>
                      {archive.label}
                    </button>
                  </td>
                  <td>{formatSnapshotTime(archive.savedAt)}</td>
                  <td className="calculated-cell">{money(archive.income)}</td>
                  <td className="calculated-cell">{money(archive.spending)}</td>
                  <td className="calculated-cell">{money(archive.allocation)}</td>
                  <td className={changeClassName(archive.surplus)}>{money(archive.surplus)}</td>
                  <td className="calculated-cell">{money(archive.accountTotal)}</td>
                  <td className="calculated-cell">{money(archive.netWorth)}</td>
                  <td>
                    {previous ? (
                      <div className="archive-change-stack">
                        <span className={changeClassName(archiveIncomeDelta)}>收入 {signedMoney(archiveIncomeDelta)}</span>
                        <span>支出 {signedMoney(archiveSpendingDelta)}</span>
                        <span className={changeClassName(archiveAccountDelta)}>账户 {signedMoney(archiveAccountDelta)}</span>
                        <span className={changeClassName(archiveNetWorthDelta)}>净资产 {signedMoney(archiveNetWorthDelta)}</span>
                      </div>
                    ) : (
                      <span className="pill">首月基准</span>
                    )}
                  </td>
                  <td>
                    <button className="danger-button compact" type="button" onClick={() => deleteMonthlyArchive(archive.id)}>
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

function AccountArchiveChangeTable({
  currentArchive,
  previousArchive,
}: {
  currentArchive: MonthlyArchive;
  previousArchive?: MonthlyArchive;
}) {
  const currentAccounts = new Map(currentArchive.accounts.map((account) => [account.id, account]));
  const previousAccounts = new Map((previousArchive?.accounts ?? []).map((account) => [account.id, account]));
  const accountIds = Array.from(new Set([...currentAccounts.keys(), ...previousAccounts.keys()]));
  const rows = accountIds
    .map((id) => {
      const current = currentAccounts.get(id);
      const previous = previousAccounts.get(id);
      const currentBalance = current?.balance ?? 0;
      const previousBalance = previous?.balance ?? 0;
      return {
        id,
        name: current?.name ?? previous?.name ?? "未命名账户",
        type: current?.type ?? previous?.type ?? "账户",
        purpose: current?.purpose ?? previous?.purpose ?? "",
        currentBalance,
        previousBalance,
        delta: currentBalance - previousBalance,
        status: current && !previous ? "新增" : !current && previous ? "已移除" : currentBalance === previousBalance ? "持平" : "变化",
      };
    })
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || b.currentBalance - a.currentBalance);

  return (
    <>
      <TableToolbar
        title="账户余额变化"
        meta={previousArchive ? `${previousArchive.label} → ${currentArchive.label}` : "保存至少两个不同月份后显示账户环比"}
      />
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table account-change-table">
          <thead>
            <tr>
              <th>账户</th>
              <th>用途</th>
              <th>上次月报</th>
              <th>当前月报</th>
              <th>变化</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {!previousArchive && (
              <tr>
                <td className="calculated-cell" colSpan={6}>暂无上一个月份的月报。保存两个不同月份后，这里会显示每个账户的增减。</td>
              </tr>
            )}
            {previousArchive &&
              rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.name}</strong>
                    <span className="table-subtext">{row.type}</span>
                  </td>
                  <td>{row.purpose || "未填写"}</td>
                  <td className="calculated-cell">{money(row.previousBalance)}</td>
                  <td className="calculated-cell">{money(row.currentBalance)}</td>
                  <td className={changeClassName(row.delta)}>{signedMoney(row.delta)}</td>
                  <td><span className={row.status === "持平" ? "pill" : "pill good"}>{row.status}</span></td>
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
        meta={`${accounts.length} 个账户 / 合计 ${money(total)} / 可提取（含专项）${money(liquidAccountTotal)}`}
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
              <th>可提取</th>
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
                <td><TableCheckbox ariaLabel={`${item.name} 可提取`} checked={item.liquid} onChange={(value) => updateAccount(item.id, { liquid: value })} /></td>
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
  saveAction,
  accountCount,
  emergencyFund,
  setEmergencyFund,
  emergencyMonths,
  setEmergencyMonths,
  emergencyMonthlyNeed,
  setEmergencyMonthlyNeed,
}: {
  saveAction: ReactNode;
  accountCount: number;
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
      <TableToolbar title="应急金底表" meta={`目标 ${money(target)} / 当前 ${money(emergencyFund)} / ${accountCount ? `${accountCount} 个应急账户实时余额` : "手动参考余额，未关联账户"}`} action={saveAction} />
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
              <td>{accountCount > 1 ? <span className="calculated-cell">{money(emergencyFund)}（账户管理汇总）</span> : <TableNumberInput ariaLabel="当前应急金" value={emergencyFund} onChange={setEmergencyFund} />}</td>
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
  baseDate,
  reminders,
  updateReminder,
  addReminder,
  deleteReminder,
}: {
  baseDate: string;
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
        meta={`${reminders.length} 条 / 金额 ${reviewMoney(total)} / 北京时间 ${baseDate}`}
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
                <td className="calculated-cell">{reviewDeadlineLabel(item.date, baseDate)}</td>
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

function EditableFundBucketTable({
  accounts,
  buckets,
  updateFundBucket,
  addFundBucket,
  deleteFundBucket,
  investmentReserve,
  liquidAfterBuckets,
  monthlyNeed,
}: {
  accounts: Account[];
  buckets: Array<FundBucket & { gap: number; monthsLeft: number; monthlyNeed: number; status: string }>;
  updateFundBucket: (id: string, patch: Partial<FundBucket>) => void;
  addFundBucket: () => void;
  deleteFundBucket: (id: string) => void;
  investmentReserve: number;
  liquidAfterBuckets: number;
  monthlyNeed: number;
}) {
  const target = buckets.reduce((sum, item) => sum + item.target, 0);
  const current = buckets.reduce((sum, item) => sum + item.current, 0);
  return (
    <>
      <TableToolbar
        title="大花费项目底表"
        meta={`目标 ${money(target)} / 已准备 ${money(current)} / 每月还需 ${money(monthlyNeed)} / 项目后现金 ${money(liquidAfterBuckets)}`}
        action={<button className="secondary-button" type="button" onClick={addFundBucket}>新增大花费项目</button>}
      />
      <div className="auto-bucket-row">
        <strong>自动锁定：投资待投金 {money(investmentReserve)}</strong>
        <span>应急、旅游、学习、家庭专户也计占用；关联同一账户的项目不重复扣款。未关联项目按额外占用计。</span>
      </div>
      <div className="table-wrap spreadsheet-wrap">
        <table className="spreadsheet-table fund-bucket-table">
          <thead>
            <tr>
              <th>大花费项目</th>
              <th>类型</th>
              <th>截止日期</th>
              <th>目标</th>
              <th>已准备</th>
              <th>资金所在账户</th>
              <th>缺口</th>
              <th>每月需补</th>
              <th>锁定</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((item) => (
              <tr key={item.id}>
                <td><TableTextInput ariaLabel={`${item.name} 名称`} value={item.name} onChange={(value) => updateFundBucket(item.id, { name: value })} /></td>
                <td>
                  <TableSelect
                    ariaLabel={`${item.name} 类型`}
                    options={fundBucketKinds}
                    value={item.kind}
                    onChange={(value) => updateFundBucket(item.id, { kind: value as FundBucketKind })}
                  />
                </td>
                <td><TableDateInput ariaLabel={`${item.name} 截止日期`} value={item.dueDate} onChange={(value) => updateFundBucket(item.id, { dueDate: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 目标`} value={item.target} onChange={(value) => updateFundBucket(item.id, { target: value })} /></td>
                <td><TableNumberInput ariaLabel={`${item.name} 已准备`} value={item.current} onChange={(value) => updateFundBucket(item.id, { current: value })} /></td>
                <td><select aria-label={`${item.name} 资金所在账户`} value={item.fundingAccountId ?? ""} onChange={event => updateFundBucket(item.id, {fundingAccountId: event.target.value})}>
                  <option value="">未关联（另占通用现金）</option>
                  {item.fundingAccountId && !accounts.some(account => account.id === item.fundingAccountId) && <option value={item.fundingAccountId}>原账户已删除，待核对</option>}
                  {accounts.map(account => <option key={account.id} value={account.id}>{account.name}{cashReservePurpose(account) ? "（专项）" : ""}{account.liquid ? "" : "（不可提取）"}</option>)}
                </select></td>
                <td>
                  <span className={item.gap > 0 ? "negative" : "positive"}>{money(item.gap)}</span>
                  <span className="table-subtext">{item.status}</span>
                </td>
                <td className="calculated-cell">{money(item.monthlyNeed)}</td>
                <td><TableCheckbox ariaLabel={`${item.name} 锁定`} checked={item.locked} onChange={(value) => updateFundBucket(item.id, { locked: value })} /></td>
                <td><TableTextInput ariaLabel={`${item.name} 备注`} value={item.note} onChange={(value) => updateFundBucket(item.id, { note: value })} /></td>
                <td>
                  <button className="danger-button compact" disabled={buckets.length <= 1} type="button" onClick={() => deleteFundBucket(item.id)}>
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

function LiquiditySummary({liquidity}: {liquidity: ReturnType<typeof calculateLiquidity>}) {
  return <section className="liquidity-summary" aria-label="可动用现金核对">
    <div className="stat-strip">
      <Stat label="可提取账户余额" value={money(liquidity.liquidCash)}/>
      <Stat label="专项账户占用" value={money(liquidity.accountReserved)}/>
      <Stat label="项目追加锁定" value={money(liquidity.projectReserved)}/>
      <Stat label="可自由动用" value={money(liquidity.available)}/>
    </div>
    <details className="liquidity-details"><summary>资金占用明细</summary>
      <div className="table-wrap"><table className="spreadsheet-table"><thead><tr><th>账户或项目</th><th>占用</th><th>口径</th></tr></thead><tbody>
        {liquidity.deductions.map(item => <tr key={item.id}><td>{item.name}</td><td>{money(item.amount)}</td><td>{item.source}</td></tr>)}
        {!liquidity.deductions.length && <tr><td colSpan={3}>暂无已识别专项占用</td></tr>}
      </tbody></table></div>
    </details>
    {liquidity.unlinkedCount > 0 && <p className="table-subtext">{liquidity.unlinkedCount} 个已准备项目尚未关联账户，暂按额外占用扣减；若钱已在专项账户中，当前可动用金额可能偏低。</p>}
    {liquidity.overallocated > 0 && <p className="negative" role="alert">关联项目超过账户余额 {money(liquidity.overallocated)}，请核对准备金额。</p>}
    {liquidity.available < 0 && <p className="negative" role="alert">资金占用超出可提取余额 {money(-liquidity.available)}。</p>}
  </section>;
}

function MonthlyAnalysisReport({
  sections,
  reportText,
  copyStatus,
  onCopy,
}: {
  sections: Array<{ title: string; tone: Tone; summary: string; detail: string; action: string }>;
  reportText: string;
  copyStatus: string;
  onCopy: () => void;
}) {
  return (
    <section className="monthly-report-panel">
      <div className="monthly-report-head">
        <div>
          <strong>本月财务分析报告</strong>
          <span>{copyStatus}</span>
        </div>
        <button className="secondary-button" type="button" onClick={onCopy}>复制报告</button>
      </div>
      <div className="report-section-grid">
        {sections.map((section) => (
          <article className={`report-section ${section.tone}`} key={section.title}>
            <span>{section.title}</span>
            <strong>{section.summary}</strong>
            <p>{section.detail}</p>
            <em>{section.action}</em>
          </article>
        ))}
      </div>
      <pre className="monthly-report-text">{reportText}</pre>
    </section>
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
              <th>占收入</th>
              <th>流向</th>
              <th>来源</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const shareOfIncome = income ? row.amount / income : 0;
              const valueClassName = `calculated-cell ${row.amount < 0 ? "negative" : ""}`.trim();
              return (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>
                    <span className={valueClassName}>{money(row.amount)}</span>
                  </td>
                  <td>
                    <span className={valueClassName}>{ratioPercent(shareOfIncome)}</span>
                  </td>
                  <td>{row.flow}</td>
                  <td>{row.source}</td>
                </tr>
              );
            })}
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
  const centerX = 110;
  const centerY = 66;
  const radius = 31;
  const strokeWidth = 11;
  const shares = rows.map((item) => (total ? (item.value / total) * 100 : 0));
  const starts = shares.map((_, index) => shares.slice(0, index).reduce((sum, share) => sum + share, 0));
  const slices = rows.map((item, index) => {
    const share = shares[index] ?? 0;
    const start = starts[index] ?? 0;
    const mid = start + share / 2;
    const radians = ((mid / 100) * 360 - 90) * (Math.PI / 180);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const side = cos >= 0 ? "right" : "left";
    return {
      ...item,
      color: item.color ?? palette[index % palette.length],
      share,
      start,
      anchorX: centerX + cos * (radius + strokeWidth / 2),
      anchorY: centerY + sin * (radius + strokeWidth / 2),
      elbowX: centerX + cos * (radius + 14),
      elbowY: centerY + sin * (radius + 14),
      labelX: side === "right" ? 174 : 46,
      lineEndX: side === "right" ? 164 : 56,
      side,
      y: clamp(centerY + sin * (radius + 22), 18, 114),
    };
  });
  const distributeLabels = (items: typeof slices) => {
    const sorted = [...items].sort((left, right) => left.y - right.y);
    const minY = 18;
    const maxY = 114;
    const gap = 17;
    let nextY = minY;
    const placed = sorted.map((item) => {
      const y = Math.max(item.y, nextY);
      nextY = y + gap;
      return { ...item, y };
    });
    let overflow = (placed.at(-1)?.y ?? maxY) - maxY;
    for (let index = placed.length - 1; index >= 0 && overflow > 0; index -= 1) {
      const floor = index === 0 ? minY : placed[index - 1].y + gap;
      const shift = Math.min(overflow, placed[index].y - floor);
      placed[index].y -= shift;
      overflow -= shift;
    }
    return placed;
  };
  const annotations = [
    ...distributeLabels(slices.filter((item) => item.share >= 5 && item.side === "left")),
    ...distributeLabels(slices.filter((item) => item.share >= 5 && item.side === "right")),
  ];
  const legendRows = rows.length
    ? slices.map((item) => ({
        ...item,
        detail: item.detail?.includes("%")
          ? item.detail
          : `${percent(item.value / Math.max(total, 1))} / ${money(item.value)}${item.detail ? ` / ${item.detail}` : ""}`,
      }))
    : [{ label: "暂无数据", value: 1, color: "#b8c4d4", detail: "0%" }];

  return (
    <div className="donut-layout">
      <svg className="donut-chart" viewBox="0 0 220 132" role="img" aria-label={`${centerLabel} ${centerValue}`}>
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e5edf5" strokeWidth={strokeWidth} />
        {total > 0 &&
          slices.map((item) => (
            <circle
              cx={centerX}
              cy={centerY}
              fill="none"
              key={item.label}
              pathLength={100}
              r={radius}
              stroke={item.color}
              strokeDasharray={`${item.share} ${100 - item.share}`}
              strokeDashoffset={-item.start}
              strokeLinecap="butt"
              strokeWidth={strokeWidth}
              transform={`rotate(-90 ${centerX} ${centerY})`}
            />
          ))}
        {annotations.map((item) => (
          <g className="donut-annotation" key={`${item.label}-${item.share}`}>
            <polyline points={`${item.anchorX},${item.anchorY} ${item.elbowX},${item.elbowY} ${item.lineEndX},${item.y}`} />
            <title>{`${item.label} ${percent(item.value / Math.max(total, 1))}`}</title>
            <text textAnchor={item.side === "right" ? "start" : "end"} x={item.labelX} y={item.y + 2}>
              <tspan className="donut-annotation-label" x={item.labelX} y={item.y - 2}>
                {item.label}
              </tspan>
              <tspan className="donut-annotation-percent" x={item.labelX} y={item.y + 7}>
                {`${Math.round(item.share)}%`}
              </tspan>
            </text>
          </g>
        ))}
        <text className="donut-value" x={centerX} y={centerY - 4}>
          {centerValue}
        </text>
        <text className="donut-label" x={centerX} y={centerY + 10}>
          {centerLabel}
        </text>
      </svg>
      <Legend data={legendRows} valueFormatter={money} />
    </div>
  );
}

function Legend({ data, valueFormatter }: { data: ChartDatum[]; valueFormatter: (value: number) => string }) {
  return (
    <div className="legend">
      {data.map((item, index) => (
        <div className="legend-item" key={item.label}>
          <span className="legend-dot" style={{ backgroundColor: item.color ?? palette[index % palette.length] }} />
          <div className="legend-copy">
            <strong>{item.label}</strong>
            <em>{item.detail ?? valueFormatter(item.value)}</em>
          </div>
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
  const width = 380;
  const height = 212;
  const padX = 34;
  const padY = 30;
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
        <span>最低 {valueFormatter(values.length ? Math.min(...values) : 0)}</span>
        <span>最高 {valueFormatter(values.length ? Math.max(...values) : 0)}</span>
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
          <small>事项金额，非额外预算</small>
        </article>
      ))}
    </div>
  );
}

function WaterfallChart({ data }: { data: WaterfallDatum[] }) {
  const width = 420;
  const height = 230;
  const pad = 32;
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
        <span>流出 {money(Math.abs(data.filter((item) => item.value < 0 && item.kind !== "start" && item.kind !== "end").reduce((sum, item) => sum + item.value, 0)))}</span>
      </div>
    </div>
  );
}

function RiskMatrix({ data }: { data: MatrixPoint[] }) {
  const size = 360;
  const pad = 56;
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
  addDetailedBudgets,
}: {
  budgets: Budget[];
  updateBudget: (id: string, patch: Partial<Budget>) => void;
  addBudget: () => void;
  deleteBudget: (id: string) => void;
  addDetailedBudgets: () => void;
}) {
  const [showReference, setShowReference] = useState(false);
  const plan = budgets.reduce((sum, item) => sum + item.plan, 0);
  const actual = budgets.reduce((sum, item) => sum + item.actual, 0);
  return (
    <>
      <TableToolbar
        title="支出细项底表"
        meta={showReference ? `细项参考 ${reviewMoney(plan)} / 已记实际 ${reviewMoney(actual)} / 参考差额 ${reviewMoney(plan - actual)}` : `已记实际 ${reviewMoney(actual)} / ${budgets.length} 个细项`}
        action={<div className="data-actions"><button className="secondary-button" type="button" onClick={addDetailedBudgets}>补充常用细项</button><button className="secondary-button" type="button" onClick={addBudget}>新增分类</button></div>}
      />
      <label className="spending-reference-toggle"><input type="checkbox" checked={showReference} onChange={event => setShowReference(event.target.checked)}/>细项参考额度</label>
      <p className="spending-detail-note">日常使用账户单笔超过 10 元以咔皮记录核对；小额支付另做汇总。旧汇总与新细项不重复录入，未覆盖的小额支出不自动视为 0。学习填写课程、书籍、工具或会员名称。</p>
      <div className="table-wrap spreadsheet-wrap">
        <table className={`spreadsheet-table spending-detail-table${showReference ? " with-reference" : ""}`}>
          <thead>
            <tr>
              <th>支出细项</th>
              <th>所属大类</th>
              {showReference && <th>细项参考</th>}
              <th>实际</th>
              {showReference && <th>参考差额</th>}
              <th>具体用途 / 咔皮备注</th>
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
                <td><select className="table-input" aria-label={`${item.name} 所属大类`} value={getSpendingGroup(item)} onChange={event => updateBudget(item.id, {group: event.target.value as Budget["group"]})}><option value="unassigned">待归类</option>{spendingGroups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}</select></td>
                {showReference && <td>
                  <TableNumberInput ariaLabel={`${item.name} 预算`} value={item.plan} onChange={(value) => updateBudget(item.id, { plan: value })} />
                </td>}
                <td>
                  <TableNumberInput ariaLabel={`${item.name} 实际`} step={0.01} min={-100000000} value={item.actual} onChange={(value) => updateBudget(item.id, { actual: value })} />
                </td>
                {showReference && <td className="calculated-cell">{reviewMoney(item.plan - item.actual)}</td>}
                <td className="spending-purpose"><TableTextInput ariaLabel={`${item.name} 具体用途`} value={item.note ?? ""} onChange={value => updateBudget(item.id, {note: value})}/></td>
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

function LearningUsage({budgets, monthLabel, allowance}: {budgets: Budget[]; monthLabel: string; allowance: number}) {
  const usage = summarizeLearning(budgets);
  return <section className="learning-usage" aria-label={`${monthLabel}学习用途`}>
    <h3>{monthLabel} · 学习用途</h3>
    <p>当前方案学习额度 {reviewMoney(allowance)} / 已归类净支出 {reviewMoney(usage.total)} / 额度减已记支出 {reviewMoney(allowance - usage.total)}</p>
    {usage.rows.length ? <div className="table-wrap"><table><thead><tr><th>学习项目</th><th>净支出</th><th>具体学了什么</th></tr></thead><tbody>{usage.rows.map(row => <tr key={row.id}><th scope="row">{row.name}</th><td>{reviewMoney(row.actual)}</td><td>{row.note?.trim() || "用途待补"}</td></tr>)}</tbody></table></div> : <p>暂无已归类的学习支出；未录入不代表本月没有花费。</p>}
    {usage.unassigned !== 0 && <p className="spending-detail-note">另有 {reviewMoney(usage.unassigned)} 支出尚未归类，未纳入上述学习统计。</p>}
  </section>;
}
