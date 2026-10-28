export type BudgetMonthMode = "normal" | "trip";
export type AnnualBudgetRow = {
  id: string;
  name: string;
  kind: "consumption" | "investment" | "emergency";
  normal: number;
  trip: number;
  note: string;
};
export type AnnualBudgetPlan = {
  allocationVersion: 2;
  salary: number;
  awayMonths: number;
  paidDays: number;
  allowanceUsd: number;
  dailySpendUsd: number;
  budgetFx: number;
  emergencyCurrent: number;
  emergencyTargetMonths: number;
  basicMeals: number;
  bufferMonths: number;
  bonusAfterTax: number | null;
  mode: BudgetMonthMode;
  rows: AnnualBudgetRow[];
};

export const initialAnnualBudgetPlan: AnnualBudgetPlan = {
  allocationVersion: 2,
  salary: 13000, awayMonths: 3, paidDays: 90, allowanceUsd: 110, dailySpendUsd: 60,
  budgetFx: 6.7, emergencyCurrent: 2000, emergencyTargetMonths: 6, basicMeals: 1800,
  bufferMonths: 3, bonusAfterTax: null, mode: "normal",
  rows: [
    {id: "rent", name: "房租", kind: "consumption", normal: 2750, trip: 2750, note: "个人承担的房租"},
    {id: "parents", name: "家用", kind: "consumption", normal: 2000, trip: 2000, note: "给父母的家用，不计为个人资产"},
    {id: "investment", name: "投资基金", kind: "investment", normal: 2750, trip: 2750, note: "投入本金，不计投资收益或亏损"},
    {id: "emergency", name: "应急储备", kind: "emergency", normal: 1000, trip: 1000, note: "应急&学习金中的应急部分，不计学习消费"},
    {id: "learning", name: "学习基金", kind: "consumption", normal: 1000, trip: 1000, note: "订阅、书籍和其他会员"},
    {id: "travel", name: "旅游基金", kind: "consumption", normal: 1000, trip: 1000, note: "实际旅行从中支付，不重复拨款"},
    {id: "partner", name: "伴侣基金", kind: "consumption", normal: 1000, trip: 1000, note: "水电网、住房额外支出等"},
    {id: "small", name: "小额支付", kind: "consumption", normal: 1000, trip: 0, note: "早餐、地铁通勤、日常小零食"},
    {id: "daily", name: "日常使用", kind: "consumption", normal: 1000, trip: 1700, note: "午晚餐及其余生活消费，不重复包含上列项目"},
  ],
};

const round = (value: number) => Math.round((value + Number.EPSILON * Math.abs(value)) * 100) / 100;
const cents = (value: number) => Math.round(round(value) * 100);
const numberFields = ["salary", "awayMonths", "paidDays", "allowanceUsd", "dailySpendUsd", "budgetFx", "emergencyCurrent", "emergencyTargetMonths", "basicMeals", "bufferMonths"] as const;

export function normalizeAnnualBudgetPlan(value: unknown): AnnualBudgetPlan {
  const result = {...initialAnnualBudgetPlan, rows: initialAnnualBudgetPlan.rows.map(row => ({...row}))};
  if (!value || typeof value !== "object") return result;
  const saved = value as Partial<AnnualBudgetPlan>;
  for (const key of numberFields) {
    const v = saved[key];
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) result[key] = round(Math.min(v, 100000000));
  }
  result.awayMonths = Math.min(12, Math.floor(result.awayMonths));
  result.paidDays = Math.min(366, Math.floor(result.paidDays));
  result.bufferMonths = Math.min(12, Math.floor(result.bufferMonths));
  result.emergencyTargetMonths = Math.min(24, Math.floor(result.emergencyTargetMonths));
  result.mode = saved.mode === "trip" ? "trip" : "normal";
  if (typeof saved.bonusAfterTax === "number" && Number.isFinite(saved.bonusAfterTax) && saved.bonusAfterTax >= 0) {
    result.bonusAfterTax = round(Math.min(saved.bonusAfterTax, 100000000));
  }
  if (Array.isArray(saved.rows)) result.rows = result.rows.map(row => {
    const input = saved.rows?.find(item => item && item.id === row.id);
    for (const mode of ["normal", "trip"] as const) {
      const v = input?.[mode];
      if (typeof v === "number" && Number.isFinite(v) && v >= 0) row[mode] = round(Math.min(v, 100000000));
    }
    return row;
  });
  const legacyDaily = {food: [2880, 0], transport: [670, 0], sports: [400, 400], clothes: [300, 300], digital: [300, 300], medical: [300, 300], gifts: [100, 100], dates: [300, 300]};
  if (Array.isArray(saved.rows) && !saved.rows.some(row => row?.id === "small" || row?.id === "daily") &&
      saved.rows.some(row => row && Object.hasOwn(legacyDaily, row.id))) {
    // Merge old categories without losing the user's edited amounts or increasing the total budget.
    for (const [index, mode] of (["normal", "trip"] as const).entries()) {
      const combined = Object.entries(legacyDaily).reduce((sum, [id, defaults]) => {
        const amount = saved.rows?.find(row => row?.id === id)?.[mode];
        return sum + cents(typeof amount === "number" && Number.isFinite(amount) && amount >= 0 ? Math.min(amount, 100000000) : defaults[index]);
      }, 0) / 100;
      const small = mode === "normal" ? Math.min(1000, combined) : 0;
      result.rows.find(row => row.id === "small")![mode] = small;
      result.rows.find(row => row.id === "daily")![mode] = round(combined - small);
    }
    // Upgrade the unchanged previous reference plan; preserve any customized allocation.
    if (result.salary === 13000 && result.rows.every(row => {
      const baseline = initialAnnualBudgetPlan.rows.find(item => item.id === row.id)!;
      return row.normal === (row.id === "daily" ? 4250 : row.id === "emergency" ? 500 : baseline.normal) && row.trip === (row.id === "emergency" ? 500 : baseline.trip);
    })) result.rows.find(row => row.id === "daily")!.normal = 1000;
  }
  if (saved.allocationVersion !== 2) {
    const emergency = result.rows.find(row => row.id === "emergency")!;
    for (const mode of ["normal", "trip"] as const) {
      if (emergency[mode] === 500) emergency[mode] = 1000;
    }
  }
  return result;
}

export function calculateAnnualAccumulation(plan: AnnualBudgetPlan, bonusAfterTax = plan.bonusAfterTax ?? 0) {
  const totals = calculateAnnualBudgetPlan(plan);
  const bonus = round(bonusAfterTax);
  const incomeWithBonus = round(totals.annualIncome + bonus);
  const fixedTarget = round(totals.annualSaving + bonus);
  const projectedCash = round(totals.annualEmergency + totals.annualSurplus + bonus);
  const projectedAccumulation = round(totals.annualRetained + bonus);
  return {bonus, incomeWithBonus, fixedTarget, projectedCash, projectedAccumulation,
    accumulationRate: incomeWithBonus > 0 ? projectedAccumulation / incomeWithBonus : null};
}

export function calculateAnnualBudgetPlan(plan: AnnualBudgetPlan) {
  const normalMonths = 12 - plan.awayMonths;
  const netUsd = round(plan.allowanceUsd - plan.dailySpendUsd);
  const annualSalary = round(plan.salary * 12);
  const annualTripNet = round(plan.paidDays * netUsd * plan.budgetFx);
  const annualIncome = round(annualSalary + annualTripNet);
  const rows = plan.rows.map(row => ({...row, annual: (cents(row.normal) * normalMonths + cents(row.trip) * plan.awayMonths) / 100}));
  const learning = rows.find(row => row.id === "learning");
  // Coarse allocation display only; accounting keeps learning consumption separate from emergency saving.
  const allocationRows = rows.filter(row => row.id !== "learning").map(row => row.id === "emergency" ? {
    ...row, id: "emergencyLearning", name: "应急&学习金", note: "应急储备与学习消费分别核算",
    normal: round(row.normal + (learning?.normal ?? 0)), trip: round(row.trip + (learning?.trip ?? 0)),
    annual: round(row.annual + (learning?.annual ?? 0)),
  } : row);
  const sumKind = (kind: AnnualBudgetRow["kind"]) => rows.filter(row => row.kind === kind).reduce((sum, row) => sum + cents(row.annual), 0) / 100;
  const annualConsumption = sumKind("consumption");
  const annualInvestment = sumKind("investment");
  const annualEmergency = sumKind("emergency");
  const annualSaving = round(annualInvestment + annualEmergency);
  const annualOutflow = round(annualConsumption + annualSaving);
  const annualSurplus = round(annualIncome - annualOutflow);
  const annualRetained = round(annualIncome - annualConsumption);
  const month = (mode: BudgetMonthMode) => {
    const consumption = rows.filter(row => row.kind === "consumption").reduce((sum, row) => sum + cents(row[mode]), 0) / 100;
    const saving = rows.filter(row => row.kind !== "consumption").reduce((sum, row) => sum + cents(row[mode]), 0) / 100;
    const tripNet = mode === "trip" && plan.awayMonths > 0 ? round(annualTripNet / plan.awayMonths) : 0;
    const income = round(plan.salary + tripNet);
    const totalOutflow = round(consumption + saving);
    return {consumption, saving, tripNet, income, totalOutflow, surplus: round(income - totalOutflow)};
  };
  const normal = month("normal");
  const trip = month("trip");
  const annualNormalSurplus = round(normal.surplus * normalMonths);
  const annualTripSurplus = round(annualTripNet + (plan.salary - trip.totalOutflow) * plan.awayMonths);
  const normalDeficit = Math.max(0, -normal.surplus);
  const buffer = round(normalDeficit * plan.bufferMonths);
  const rent = rows.find(row => row.id === "rent")?.normal ?? 0;
  const parents = rows.find(row => row.id === "parents")?.normal ?? 0;
  const basicNeed = round(rent + parents + plan.basicMeals);
  const emergencyTarget = round(basicNeed * plan.emergencyTargetMonths);
  const emergencyYearEnd = round(plan.emergencyCurrent + annualEmergency);
  const dailyNetCny = round(netUsd * plan.budgetFx);
  const requiredTripDays = dailyNetCny > 0 ? Math.ceil(Math.max(0, round(annualOutflow - annualSalary)) / dailyNetCny) : null;
  return {rows, allocationRows, normalMonths, annualSalary, annualTripNet, annualIncome, annualConsumption, annualInvestment, annualEmergency,
    annualSaving, annualOutflow, annualSurplus, annualRetained, averageIncome: round(annualIncome / 12), averageSurplus: round(annualSurplus / 12),
    savingRate: annualIncome > 0 ? annualSaving / annualIncome : 0, netUsd, dailyNetCny, normal, trip, annualNormalSurplus, annualTripSurplus, normalDeficit, buffer,
    basicNeed, emergencyTarget, emergencyYearEnd, emergencyGap: Math.max(0, round(emergencyTarget - emergencyYearEnd)), requiredTripDays,
    assumptionsConflict: plan.paidDays > plan.awayMonths * 31};
}
