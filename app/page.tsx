"use client";

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

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

const palette = ["#1f5fbf", "#07835f", "#b7791f", "#6852bd", "#c53030", "#2b6cb0", "#0f766e", "#805ad5"];
const today = new Date("2026-06-14T00:00:00+08:00");

const initialAccounts: Account[] = [
  { id: "icbc2616", name: "工行 2616", type: "银行卡", balance: 15000, purpose: "工资主账户", liquid: true },
  { id: "alipay-a", name: "支付宝 A", type: "支付宝", balance: 3200, purpose: "旅游/余额宝", liquid: true },
  { id: "alipay-b", name: "支付宝 B", type: "支付宝", balance: 3800, purpose: "投资理财", liquid: true },
  { id: "wechat-a", name: "微信 A", type: "微信", balance: 600, purpose: "日常零钱", liquid: true },
  { id: "cash", name: "现金", type: "现金", balance: 900, purpose: "备用", liquid: true },
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

const initialReminders: Reminder[] = [
  { id: "rent-reminder", name: "房租提醒", date: "2026-06-30", amount: 1800, kind: "房租" },
  { id: "sub-reminder", name: "订阅服务检查", date: "2026-06-18", amount: 98, kind: "订阅" },
  { id: "deposit-reminder", name: "定期存款到期提醒", date: "2026-07-12", amount: 2000, kind: "定存" },
];

const moduleList: Array<{ id: ModuleId; title: string; desc: string }> = [
  { id: "income", title: "收入", desc: "税后工资、实际到账、炒股月结算记录" },
  { id: "spending", title: "支出", desc: "实际花费、必要支出、可取消支出" },
  { id: "cashflow", title: "现金流预测", desc: "未来 6 个月流入流出和预计余额" },
  { id: "accounts", title: "账户管理", desc: "银行卡、支付宝、微信、现金余额可编辑" },
  { id: "budget", title: "预算管理", desc: "分类预算和固定支出率" },
  { id: "investment", title: "投资管理", desc: "A股、美股、港股市值和投入计划" },
  { id: "balance", title: "资产负债表", desc: "总资产、房子/车子/其他负债" },
  { id: "emergency", title: "应急金", desc: "目标月数、当前金额、覆盖月数" },
  { id: "reminders", title: "账单与提醒", desc: "提前 7 天提醒账单和到期事项" },
  { id: "goals", title: "目标管理", desc: "旅游、学习、大额支出目标" },
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

function recordIncome(record: MonthRecord) {
  return record.salary + Math.max(record.stockIncome, 0) + record.otherIncome;
}

function recordSpendingPlan(record: MonthRecord) {
  return record.budgets.reduce((sum, item) => sum + item.plan, 0);
}

function recordSpendingActual(record: MonthRecord) {
  return record.budgets.reduce((sum, item) => sum + item.actual, 0);
}

function recordFixedSpending(record: MonthRecord) {
  return record.budgets.filter((item) => item.fixed).reduce((sum, item) => sum + item.plan, 0);
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

function EditableText({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
  const [learningSaving, setLearningSaving] = useState(1750);
  const [emergencyFund, setEmergencyFund] = useState(2000);
  const [emergencyMonths, setEmergencyMonths] = useState(3);
  const [emergencyMonthlyNeed, setEmergencyMonthlyNeed] = useState(4500);
  const [houseDebt, setHouseDebt] = useState(0);
  const [carDebt, setCarDebt] = useState(0);
  const [otherDebt, setOtherDebt] = useState(0);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [goals, setGoals] = useState<Goal[]>([
    { id: "travel", name: "旅游基金", target: 18000, current: 3000, monthly: 3000 },
    { id: "learning", name: "学习成长", target: 12000, current: 1750, monthly: 1750 },
    { id: "emergency-goal", name: "应急储备", target: 13500, current: 2000, monthly: 2000 },
  ]);

  const activeMonth = monthlyRecords.find((item) => item.id === selectedMonth) ?? monthlyRecords[0];
  const salary = activeMonth.salary;
  const payday = activeMonth.payday;
  const stockIncome = activeMonth.stockIncome;
  const otherIncome = activeMonth.otherIncome;
  const budgets = activeMonth.budgets;
  const actualIncome = salary + Math.max(stockIncome, 0) + otherIncome;

  const totals = useMemo(() => {
    const accountTotal = accounts.reduce((sum, item) => sum + item.balance, 0);
    const liquidAccountTotal = accounts.filter((item) => item.liquid).reduce((sum, item) => sum + item.balance, 0);
    const spendingActual = budgets.reduce((sum, item) => sum + item.actual, 0);
    const spendingPlan = budgets.reduce((sum, item) => sum + item.plan, 0);
    const fixedSpending = budgets.filter((item) => item.fixed).reduce((sum, item) => sum + item.plan, 0);
    const requiredSpending = budgets.filter((item) => item.required).reduce((sum, item) => sum + item.plan, 0);
    const investmentValue = holdings.reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const investmentCost = holdings.reduce((sum, item) => sum + toCny(item.cost, item.currency, fxUsd, fxHkd), 0);
    const aShareValue = holdings.filter((item) => item.market === "A股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const usShareValue = holdings.filter((item) => item.market === "美股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const hkShareValue = holdings.filter((item) => item.market === "港股").reduce((sum, item) => sum + toCny(item.value, item.currency, fxUsd, fxHkd), 0);
    const totalSavings = travelSaving + learningSaving;
    const totalDebt = houseDebt + carDebt + otherDebt;
    const totalAssets = accountTotal + investmentValue + totalSavings + emergencyFund;
    const assetOutflow = travelSaving + learningSaving + emergencyFund + aSharePlan + usSharePlan + hkSharePlan;
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
      liquidAccountTotal,
      spendingActual,
      spendingPlan,
      fixedSpending,
      requiredSpending,
      investmentValue,
      investmentCost,
      investmentPnL: investmentValue - investmentCost,
      aShareValue,
      usShareValue,
      hkShareValue,
      totalSavings,
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
    houseDebt,
    carDebt,
    otherDebt,
    salary,
    aSharePlan,
    usSharePlan,
    hkSharePlan,
  ]);

  const forecast = useMemo(() => {
    const rows: Array<{ month: string; inflow: number; outflow: number; balance: number }> = [];
    let balance = totals.accountTotal;
    const outflow = totals.spendingPlan + totals.assetOutflow;
    for (let index = 0; index < 6; index += 1) {
      balance += salary - outflow;
      rows.push({
        month: `${6 + index}月`,
        inflow: salary,
        outflow,
        balance,
      });
    }
    return rows;
  }, [salary, totals.accountTotal, totals.assetOutflow, totals.spendingPlan]);

  const cashflowEvents = useMemo(() => {
    const rawEvents = [
      ...reminders.map((item) => ({
        date: item.date,
        item: item.name,
        inflow: item.kind === "定存" ? item.amount : 0,
        outflow: item.kind === "定存" ? 0 : item.amount,
        kind: item.kind,
      })),
      { date: "2026-07-10", item: "工资到账", inflow: salary, outflow: 0, kind: "收入" },
      { date: "2026-07-15", item: "月度资产分配", inflow: 0, outflow: totals.assetOutflow, kind: "分配" },
    ].sort((a, b) => a.date.localeCompare(b.date));
    let balance = totals.accountTotal;
    return rawEvents.map((item) => {
      balance += item.inflow - item.outflow;
      return { ...item, balance };
    });
  }, [reminders, salary, totals.accountTotal, totals.assetOutflow]);

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

  function updateMonthRecord(patch: Partial<Omit<MonthRecord, "id" | "label" | "budgets">>) {
    setMonthlyRecords((records) =>
      records.map((record) => (record.id === selectedMonth ? { ...record, ...patch } : record)),
    );
  }

  function setSalary(value: number) {
    updateMonthRecord({ salary: value });
  }

  function setPayday(value: number) {
    updateMonthRecord({ payday: value });
  }

  function setStockIncome(value: number) {
    updateMonthRecord({ stockIncome: value });
  }

  function setOtherIncome(value: number) {
    updateMonthRecord({ otherIncome: value });
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

  function updateHolding(id: string, patch: Partial<Holding>) {
    setHoldings((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function updateReminder(id: string, amount: number) {
    setReminders((items) => items.map((item) => (item.id === id ? { ...item, amount } : item)));
  }

  function updateGoal(id: string, patch: Partial<Goal>) {
    setGoals((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function toggleModule(id: ModuleId) {
    setActiveModules((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]));
  }

  function openAllModules() {
    setActiveModules(moduleList.map((item) => item.id));
  }

  const overviewCards = [
    {
      title: "目前总资产",
      value: money(totals.totalAssets),
      detail: `账户 ${money(totals.accountTotal)} / 投资 ${money(totals.investmentValue)}`,
      tone: "blue" as Tone,
    },
    {
      title: "目前总储蓄",
      value: money(totals.totalSavings),
      detail: `旅游 ${money(travelSaving)} / 学习 ${money(learningSaving)}`,
      tone: "green" as Tone,
    },
    {
      title: "目前总负债",
      value: money(totals.totalDebt),
      detail: `房子 ${money(houseDebt)} / 车子 ${money(carDebt)} / 其他 ${money(otherDebt)}`,
      tone: totals.totalDebt > 0 ? ("red" as Tone) : ("green" as Tone),
    },
    {
      title: "目前总应急",
      value: money(emergencyFund),
      detail: `覆盖 ${totals.emergencyCoverage.toFixed(1)} 个月 / 目标 ${emergencyMonths} 个月`,
      tone: "amber" as Tone,
    },
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
      title: "资产分配",
      value: money(totals.assetOutflow),
      detail: `A股 ${money(totals.aShareValue)} / 美股 ${money(totals.usShareValue)} / 港股 ${money(totals.hkShareValue)}`,
      tone: "violet" as Tone,
    },
    {
      title: "当前现金流",
      value: money(totals.accountTotal),
      detail: `可立即动用 ${money(totals.liquidAccountTotal)} / 当前账户余额`,
      tone: totals.liquidAccountTotal < totals.emergencyMonthlyNeed * 2 ? ("red" as Tone) : ("green" as Tone),
    },
  ];

  const incomeRows = [
    ["工资", money(salary), "计入", `约每月 ${payday} 日到账`],
    ["炒股收入", money(stockIncome), "不计入", "盈利/亏损不影响未来现金流预测"],
    ["其他收入", money(otherIncome), "按实际口径", "手动录入"],
    ["当前月合计", money(actualIncome), "工资计入预测", `${activeMonth.label} 实际收入口径`],
  ];
  const incomeChartData = [
    { label: "工资", value: salary, color: palette[0] },
    { label: "炒股月结", value: Math.max(stockIncome, 0), color: palette[1] },
    { label: "其他收入", value: otherIncome, color: palette[3] },
  ];
  const monthlyIncomeRows = monthlyRecords.map((record) => [
    record.label,
    money(record.salary),
    money(record.stockIncome),
    money(record.otherIncome),
    money(recordIncome(record)),
    record.id === selectedMonth ? "当前查看" : "可切换",
  ]);
  const monthlyIncomeTrend = monthlyRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordIncome(record),
    color: record.id === selectedMonth ? palette[0] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月" : "月度",
  }));
  const monthlySpendingRows = monthlyRecords.map((record) => {
    const plan = recordSpendingPlan(record);
    const actual = recordSpendingActual(record);
    const fixed = recordFixedSpending(record);
    const income = recordIncome(record);
    return [
      record.label,
      money(plan),
      money(actual),
      money(plan - actual),
      income ? percent(fixed / income) : "0%",
      record.id === selectedMonth ? "当前查看" : "可切换",
    ];
  });
  const monthlySpendingTrend = monthlyRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordSpendingActual(record),
    color: record.id === selectedMonth ? palette[4] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月" : "月度",
  }));
  const monthlySurplusTrend = monthlyRecords.map((record, index) => ({
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
    detail: `${item.required ? "必须" : "可取消"} / ${item.fixed ? "固定" : "弹性"}`,
  }));
  const fixedFlexData = [
    { label: "固定支出", value: totals.fixedSpending, color: palette[2] },
    { label: "弹性支出", value: Math.max(totals.spendingPlan - totals.fixedSpending, 0), color: palette[0] },
  ];
  const requiredData = [
    { label: "必须支出", value: totals.requiredSpending, color: palette[1] },
    { label: "可取消支出", value: Math.max(totals.spendingPlan - totals.requiredSpending, 0), color: palette[2] },
  ];
  const outflowData = [
    { label: "生活支出", value: totals.spendingPlan, color: palette[4] },
    { label: "旅游储蓄", value: travelSaving, color: palette[1] },
    { label: "学习储蓄", value: learningSaving, color: palette[3] },
    { label: "应急金", value: emergencyFund, color: palette[2] },
    { label: "A股计划", value: aSharePlan, color: palette[0] },
    { label: "美股计划", value: usSharePlan, color: palette[6] },
    { label: "港股计划", value: hkSharePlan, color: palette[7] },
  ];
  const assetStructureData = [
    { label: "账户余额", value: totals.accountTotal, color: palette[0] },
    { label: "投资市值", value: totals.investmentValue, color: palette[1] },
    { label: "专项储蓄", value: totals.totalSavings, color: palette[3] },
    { label: "应急金", value: emergencyFund, color: palette[2] },
  ];
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
  const cashflowEventRows = cashflowEvents.map((item) => [
    item.date,
    item.item,
    item.inflow ? money(item.inflow) : "-",
    item.outflow ? money(item.outflow) : "-",
    money(item.balance),
    item.kind,
  ]);
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
    value: item.balance + totals.investmentValue + totals.totalSavings + emergencyFund - totals.totalDebt,
  }));
  const balanceData = [
    { label: "总资产", value: totals.totalAssets, color: palette[0] },
    { label: "总负债", value: totals.totalDebt, color: palette[4] },
    { label: "净资产", value: Math.max(totals.netWorth, 0), color: palette[1] },
  ];
  const debtData = [
    { label: "房子负债", value: houseDebt, color: palette[4] },
    { label: "车子负债", value: carDebt, color: palette[2] },
    { label: "其他负债", value: otherDebt, color: palette[3] },
  ];
  const goalProgress = goals.map((item, index) => ({
    label: item.name,
    value: item.current,
    max: item.target,
    color: palette[index % palette.length],
    detail: `每月准备 ${money(item.monthly)}`,
  }));
  const totalGoalCurrent = goals.reduce((sum, item) => sum + item.current, 0);
  const totalGoalTarget = goals.reduce((sum, item) => sum + item.target, 0);
  const totalGoalMonthlyInput = goals.reduce((sum, item) => sum + item.monthly, 0);
  const selectedMonthIndex = Math.max(0, monthlyRecords.findIndex((item) => item.id === selectedMonth));
  const monthlyGoalHeaders = [
    "月份",
    ...goals.map((item) => `${item.name}投入`),
    "投入合计",
    "实际支出",
    "目标后结余",
    "累计准备",
  ];
  const monthlyGoalRows = monthlyRecords.map((record, index) => {
    const monthOffset = Math.max(0, index - selectedMonthIndex);
    const spending = recordSpendingActual(record);
    const projectedTotal = Math.min(totalGoalTarget, totalGoalCurrent + totalGoalMonthlyInput * monthOffset);
    return [
      record.label,
      ...goals.map((item) => money(item.monthly)),
      money(totalGoalMonthlyInput),
      money(spending),
      money(recordIncome(record) - spending - totalGoalMonthlyInput),
      `${money(projectedTotal)} / ${percent(totalGoalTarget ? projectedTotal / totalGoalTarget : 0)}`,
    ];
  });
  const monthlyGoalInputTrend = monthlyRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: totalGoalMonthlyInput,
    color: record.id === selectedMonth ? palette[1] : palette[index % palette.length],
    detail: record.id === selectedMonth ? "当前月投入" : "预计投入",
  }));
  const monthlyGoalPressureTrend = monthlyRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: recordSpendingActual(record) + totalGoalMonthlyInput,
    color: record.id === selectedMonth ? palette[2] : palette[index % palette.length],
    detail: `支出 ${money(recordSpendingActual(record))}`,
  }));
  const monthlyGoalBalanceTrend = monthlyRecords.map((record, index) => ({
    label: shortMonth(record.label),
    value: Math.min(totalGoalTarget, totalGoalCurrent + totalGoalMonthlyInput * Math.max(0, index - selectedMonthIndex)),
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
  const futureCapabilityData = [
    { label: "债务策略", value: totals.totalDebt > 0 ? 45 : 70, color: palette[4] },
    { label: "保险管理", value: 20, color: palette[2] },
    { label: "数据质量", value: 55, color: palette[0] },
    { label: "规则引擎", value: 35, color: palette[3] },
  ];

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
          <div className="overview-grid">
            {overviewCards.map((item) => (
              <article className={`overview-card ${item.tone}`} key={item.title}>
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
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
              <ChartPanel title="支出执行" summary={`已花 ${money(totals.spendingActual)}`}>
                <HorizontalBarChart data={spendingChartData.slice(0, 6)} valueFormatter={money} />
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
              <ChartPanel title="风险矩阵" summary="影响 × 紧迫">
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
                        <>
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <div className="form-grid">
                            <EditableNumber label="税后实发工资" value={salary} onChange={setSalary} />
                            <EditableNumber label="工资到账日" value={payday} onChange={setPayday} step={1} />
                            <EditableNumber label="炒股月结算" value={stockIncome} onChange={setStockIncome} />
                            <EditableNumber label="其他收入" value={otherIncome} onChange={setOtherIncome} />
                          </div>
                          <DataTable headers={["收入项", "金额", "现金流预测", "说明"]} rows={incomeRows} />
                          <DataTable headers={["月份", "工资", "炒股月结", "其他", "实际收入", "状态"]} rows={monthlyIncomeRows} />
                        </>
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
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <EditableBudgetTable budgets={budgets} updateBudget={updateBudget} />
                          <DataTable headers={["月份", "预算", "实际", "剩余", "固定支出率", "状态"]} rows={monthlySpendingRows} />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="分类预算执行" summary="实际 / 预算">
                            <HorizontalBarChart data={spendingChartData} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="必须 vs 可取消" summary="支出口径">
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
                          <DataTable
                            headers={["月份", "流入", "流出", "预计余额", "状态"]}
                            rows={forecast.map((item) => [
                              item.month,
                              money(item.inflow),
                              money(item.outflow),
                              money(item.balance),
                              item.balance < totals.spendingPlan * 2 ? "现金偏紧" : "安全",
                            ])}
                          />
                          <DataTable headers={["日期", "项目", "流入", "流出", "预计余额", "类型"]} rows={cashflowEventRows} />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="余额趋势" summary="未来 6 个月">
                            <LineChart data={cashflowLine} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="月度流出压力" summary={`每月流出 ${money(totals.spendingPlan + totals.assetOutflow)}`}>
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
                  <Module title="账户管理" desc="账户可以新增、删除和编辑，修改后会联动总资产、现金流和图表。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="account-toolbar">
                            <div>
                              <strong>{accounts.length} 个账户</strong>
                              <span>账户合计 {money(totals.accountTotal)} / 可动用 {money(totals.liquidAccountTotal)}</span>
                            </div>
                            <button className="secondary-button" type="button" onClick={addAccount}>新增账户</button>
                          </div>
                          <div className="cards-grid three">
                            {accounts.map((item) => (
                              <article className="edit-card account-editor" key={item.id}>
                                <div className="card-head">
                                  <strong>{item.name.trim() || "未命名账户"}</strong>
                                  <span className="pill">{item.type.trim() || "未分类"}</span>
                                </div>
                                <EditableText
                                  label="账户名称"
                                  value={item.name}
                                  placeholder="例如 工行 2616"
                                  onChange={(value) => updateAccount(item.id, { name: value })}
                                />
                                <EditableText
                                  label="账户类型"
                                  value={item.type}
                                  placeholder="银行卡 / 支付宝 / 微信 / 现金"
                                  onChange={(value) => updateAccount(item.id, { type: value })}
                                />
                                <EditableNumber
                                  label="余额"
                                  value={item.balance}
                                  onChange={(value) => updateAccount(item.id, { balance: value })}
                                />
                                <EditableText
                                  label="用途"
                                  value={item.purpose}
                                  placeholder="例如 工资主账户"
                                  onChange={(value) => updateAccount(item.id, { purpose: value })}
                                />
                                <div className="account-actions">
                                  <label className="check-row">
                                    <input
                                      checked={item.liquid}
                                      type="checkbox"
                                      onChange={(event) => updateAccount(item.id, { liquid: event.target.checked })}
                                    />
                                    可立即动用
                                  </label>
                                  <button
                                    className="danger-button"
                                    disabled={accounts.length <= 1}
                                    type="button"
                                    onClick={() => deleteAccount(item.id)}
                                  >
                                    删除
                                  </button>
                                </div>
                              </article>
                            ))}
                          </div>
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
                          <EditableBudgetTable budgets={budgets} updateBudget={updateBudget} />
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
                          <div className="cards-grid three">
                            {holdings.map((item) => (
                              <article className="edit-card" key={item.id}>
                                <div className="card-head">
                                  <strong>{item.market}</strong>
                                  <span className="pill">{item.currency}</span>
                                </div>
                                <EditableNumber
                                  label="成本"
                                  value={item.cost}
                                  onChange={(value) => updateHolding(item.id, { cost: value })}
                                />
                                <EditableNumber
                                  label="当前市值"
                                  value={item.value}
                                  onChange={(value) => updateHolding(item.id, { value })}
                                />
                                <p>折人民币：{money(toCny(item.value, item.currency, fxUsd, fxHkd))}</p>
                              </article>
                            ))}
                          </div>
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
                  <Module title="资产负债表" desc="总负债拆成房子、车子、其他；所有金额都可编辑。">
                    <DataChartLayout
                      data={
                        <>
                          <div className="form-grid">
                            <EditableNumber label="房子负债" value={houseDebt} onChange={setHouseDebt} />
                            <EditableNumber label="车子负债" value={carDebt} onChange={setCarDebt} />
                            <EditableNumber label="其他负债" value={otherDebt} onChange={setOtherDebt} />
                          </div>
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
                          <div className="form-grid">
                            <EditableNumber label="当前应急金" value={emergencyFund} onChange={setEmergencyFund} />
                            <EditableNumber label="目标覆盖月数" value={emergencyMonths} onChange={setEmergencyMonths} step={1} />
                            <EditableNumber label="月均必要支出" value={emergencyMonthlyNeed} onChange={setEmergencyMonthlyNeed} />
                          </div>
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
                        <div className="cards-grid three">
                          {reminders.map((item) => (
                            <article className="edit-card" key={item.id}>
                              <div className="card-head">
                                <strong>{item.name}</strong>
                                <span className="pill">{item.kind}</span>
                              </div>
                              <p>{item.date} 前 7 天提醒</p>
                              <EditableNumber label="金额" value={item.amount} onChange={(value) => updateReminder(item.id, value)} />
                            </article>
                          ))}
                        </div>
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
                  <Module title="目标管理" desc="旅游、学习、大额支出目标都可以维护目标金额，并查看每个月投入、支出和累计变化。">
                    <DataChartLayout
                      data={
                        <>
                          <MonthSelector records={monthlyRecords} selectedMonth={selectedMonth} onChange={setSelectedMonth} />
                          <div className="cards-grid three">
                            {goals.map((item) => (
                              <article className="edit-card" key={item.id}>
                                <strong>{item.name}</strong>
                                <EditableNumber label="目标金额" value={item.target} onChange={(value) => updateGoal(item.id, { target: value })} />
                                <EditableNumber label="当前金额" value={item.current} onChange={(value) => updateGoal(item.id, { current: value })} />
                                <EditableNumber label="每月准备" value={item.monthly} onChange={(value) => updateGoal(item.id, { monthly: value })} />
                              </article>
                            ))}
                          </div>
                          <DataTable headers={monthlyGoalHeaders} rows={monthlyGoalRows} />
                        </>
                      }
                      charts={
                        <div className="chart-grid two">
                          <ChartPanel title="目标进度" summary="当前 / 目标">
                            <ProgressList data={goalProgress} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="每月准备结构" summary="目标现金流压力">
                            <DonutChart
                              data={goals.map((item, index) => ({
                                label: item.name,
                                value: item.monthly,
                                color: palette[index % palette.length],
                              }))}
                              centerLabel="每月"
                              centerValue={money(goals.reduce((sum, item) => sum + item.monthly, 0))}
                            />
                          </ChartPanel>
                          <ChartPanel title="月度目标投入" summary={`每月投入 ${money(totalGoalMonthlyInput)}`}>
                            <VerticalBarChart data={monthlyGoalInputTrend} valueFormatter={money} />
                          </ChartPanel>
                          <ChartPanel title="支出与投入压力" summary="实际支出 + 目标投入">
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
                        <div className="cards-grid four">
                          {["债务策略", "保险管理", "数据质量", "规则引擎"].map((item) => (
                            <article className="empty-card" key={item}>
                              <strong>{item}</strong>
                              <span>后续补充数据后开启。</span>
                            </article>
                          ))}
                        </div>
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
  onChange,
}: {
  records: MonthRecord[];
  selectedMonth: string;
  onChange: (month: string) => void;
}) {
  return (
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
  );
}

function ChartPanel({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <article className="chart-panel">
      <div className="chart-head">
        <strong>{title}</strong>
        <span>{summary}</span>
      </div>
      {children}
    </article>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
  let running = 0;
  const bars = data.map((item) => {
    const before = item.kind === "start" || item.kind === "end" ? 0 : running;
    const after = item.kind === "start" || item.kind === "end" ? item.value : running + item.value;
    if (item.kind !== "end") running = after;
    return { ...item, before, after };
  });
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
  const size = 220;
  const pad = 28;
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
              <circle cx={x} cy={y} fill={item.color ?? palette[0]} r="6" />
              <text className="matrix-point-label" x={x} y={y - 9}>{item.label}</text>
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
}: {
  budgets: Budget[];
  updateBudget: (id: string, patch: Partial<Budget>) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>分类</th>
            <th>预算</th>
            <th>实际</th>
            <th>剩余</th>
            <th>性质</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <input
                  className="table-input"
                  min="0"
                  type="number"
                  value={item.plan}
                  onChange={(event) => updateBudget(item.id, { plan: numberValue(event.target.value) })}
                />
              </td>
              <td>
                <input
                  className="table-input"
                  min="0"
                  type="number"
                  value={item.actual}
                  onChange={(event) => updateBudget(item.id, { actual: numberValue(event.target.value) })}
                />
              </td>
              <td>{money(item.plan - item.actual)}</td>
              <td>
                <span className={item.required ? "pill good" : "pill warn"}>{item.required ? "必须" : "可取消"}</span>
                <span className={item.fixed ? "pill warn" : "pill"}>{item.fixed ? "固定" : "弹性"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
