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
  mode: BudgetMonthMode;
  rows: AnnualBudgetRow[];
};

export const initialAnnualBudgetPlan: AnnualBudgetPlan = {
  salary: 13000, awayMonths: 3, paidDays: 90, allowanceUsd: 110, dailySpendUsd: 60,
  budgetFx: 6.7, emergencyCurrent: 2000, emergencyTargetMonths: 6, basicMeals: 1800,
  bufferMonths: 3, mode: "normal",
  rows: [
    {id: "rent", name: "房租，个人承担", kind: "consumption", normal: 2750, trip: 2750, note: "全年保留"},
    {id: "parents", name: "父母家用", kind: "consumption", normal: 2000, trip: 2000, note: "家用支出，不计为个人储蓄"},
    {id: "food", name: "本地吃饭、零食、聚会", kind: "consumption", normal: 2880, trip: 0, note: "按确认分配表预留，含本地餐饮、零食与聚会"},
    {id: "transport", name: "本地日常交通", kind: "consumption", normal: 670, trip: 0, note: "按确认分配表预留，本地出行预算"},
    {id: "learning", name: "学习：订阅、书籍、其他会员", kind: "consumption", normal: 1000, trip: 1000, note: "已替代原学习基金500元，不重复拨款"},
    {id: "sports", name: "运动：健身、踢球、装备", kind: "consumption", normal: 400, trip: 400, note: "含运动装备，不额外增加装备预算"},
    {id: "clothes", name: "衣物、日用品", kind: "consumption", normal: 300, trip: 300, note: "全年保留"},
    {id: "digital", name: "数码产品摊销、手机费", kind: "consumption", normal: 300, trip: 300, note: "全年保留"},
    {id: "medical", name: "医疗、个人护理", kind: "consumption", normal: 300, trip: 300, note: "全年保留"},
    {id: "gifts", name: "人情红包", kind: "consumption", normal: 100, trip: 100, note: "全年保留"},
    {id: "dates", name: "伴侣基金之外的约会支出", kind: "consumption", normal: 300, trip: 300, note: "与伴侣基金分别列明"},
    {id: "partner", name: "伴侣基金：含水电网、住房额外支出等", kind: "consumption", normal: 1000, trip: 1000, note: "实际开销从基金支付，不另加一遍"},
    {id: "travel", name: "旅游基金：实际旅行从中支付", kind: "consumption", normal: 1000, trip: 1000, note: "未来消费预留，不重复计入实际旅行开销"},
    {id: "emergency", name: "应急基金", kind: "emergency", normal: 500, trip: 500, note: "新增现金储备，独立于日常周转金"},
    {id: "investment", name: "投资基金", kind: "investment", normal: 2750, trip: 2750, note: "投入本金，不计投资收益或亏损"},
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
  if (Array.isArray(saved.rows)) result.rows = result.rows.map(row => {
    const input = saved.rows?.find(item => item && item.id === row.id);
    for (const mode of ["normal", "trip"] as const) {
      const v = input?.[mode];
      if (typeof v === "number" && Number.isFinite(v) && v >= 0) row[mode] = round(Math.min(v, 100000000));
    }
    return row;
  });
  return result;
}

export function calculateAnnualBudgetPlan(plan: AnnualBudgetPlan) {
  const normalMonths = 12 - plan.awayMonths;
  const netUsd = round(plan.allowanceUsd - plan.dailySpendUsd);
  const annualSalary = round(plan.salary * 12);
  const annualTripNet = round(plan.paidDays * netUsd * plan.budgetFx);
  const annualIncome = round(annualSalary + annualTripNet);
  const rows = plan.rows.map(row => ({...row, annual: (cents(row.normal) * normalMonths + cents(row.trip) * plan.awayMonths) / 100}));
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
  return {rows, normalMonths, annualSalary, annualTripNet, annualIncome, annualConsumption, annualInvestment, annualEmergency,
    annualSaving, annualOutflow, annualSurplus, annualRetained, averageIncome: round(annualIncome / 12), averageSurplus: round(annualSurplus / 12),
    savingRate: annualIncome > 0 ? annualSaving / annualIncome : 0, netUsd, dailyNetCny, normal, trip, annualNormalSurplus, annualTripSurplus, normalDeficit, buffer,
    basicNeed, emergencyTarget, emergencyYearEnd, emergencyGap: Math.max(0, round(emergencyTarget - emergencyYearEnd)), requiredTripDays,
    assumptionsConflict: plan.paidDays > plan.awayMonths * 31};
}
