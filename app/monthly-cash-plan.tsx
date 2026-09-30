"use client";
import "./monthly-cash-plan.css";

export type MonthlyCashPlan = {
  income: number;
  rent: number;
  living: number;
  parents: number;
  partner: number;
  investment: number;
  travel: number;
  learning: number;
  emergency: number;
  repayment: number;
  debt: number;
  deadlineMonths: number;
};

export const originalMonthlyCashPlan: MonthlyCashPlan = {
  income: 12500, rent: 2750, living: 2500, parents: 2000, partner: 1000,
  investment: 3750, travel: 2000, learning: 500, emergency: 500,
  repayment: 0, debt: 20000, deadlineMonths: 0,
};

export const initialMonthlyCashPlan: MonthlyCashPlan = {
  ...originalMonthlyCashPlan,
  income: 13000, living: 3500, investment: 2750, travel: 1000,
};

const rows = [
  {key: "rent", name: "房租", kind: "生活", note: "你承担的房租"},
  {key: "living", name: "基本生活费", kind: "生活", note: "吃饭、交通、水电、话费等"},
  {key: "parents", name: "父母家用", kind: "家用", note: "家庭支持"},
  {key: "repayment", name: "公司借款还款", kind: "还债", note: "无息本金，按公司约定安排"},
  {key: "emergency", name: "应急基金", kind: "储备", note: "保留可随时使用的应急现金"},
  {key: "learning", name: "学习基金", kind: "储备", note: "可按近期课程需要调整"},
  {key: "partner", name: "伴侣基金", kind: "储备", note: "和伴侣商量阶段性额度"},
  {key: "investment", name: "投资基金", kind: "投资", note: "新增投资拨款；已有持仓单独记账"},
  {key: "travel", name: "旅游基金", kind: "储备", note: "新增旅游拨款；已有余额单独记账"},
] as const;

const amount = (v: number) => Math.round((v + Number.EPSILON * Math.abs(v)) * 100);
const money = (v: number) => `¥${v.toLocaleString("zh-CN", {maximumFractionDigits: 2})}`;

export function normalizeMonthlyCashPlan(value: unknown): MonthlyCashPlan {
  const result = {...initialMonthlyCashPlan};
  if (!value || typeof value !== "object") return result;
  for (const key of Object.keys(result) as Array<keyof MonthlyCashPlan>) {
    const v = (value as Partial<MonthlyCashPlan>)[key];
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) result[key] = amount(Math.min(v, 100000000)) / 100;
  }
  result.deadlineMonths = Math.floor(result.deadlineMonths);
  return result;
}

export function calculateMonthlyCashPlan(plan: MonthlyCashPlan) {
  const originalAllocations = rows.filter(r => r.key !== "living" && r.key !== "repayment")
    .reduce((sum, row) => sum + amount(originalMonthlyCashPlan[row.key]), 0) / 100;
  const regularOutflow = rows.filter(r => r.key !== "repayment")
    .reduce((sum, row) => sum + amount(plan[row.key]), 0) / 100;
  const livingAndRentOutflow = (amount(plan.living) + amount(plan.rent)) / 100;
  const fundAndFamilyOutflow = rows.filter(r => r.key !== "living" && r.key !== "rent" && r.key !== "repayment")
    .reduce((sum, row) => sum + amount(plan[row.key]), 0) / 100;
  const actualRepayment = Math.min(plan.repayment, plan.debt);
  const totalOutflow = (amount(regularOutflow) + amount(actualRepayment)) / 100;
  const surplus = (amount(plan.income) - amount(totalOutflow)) / 100;
  const affordableRepayment = Math.max(0, (amount(plan.income) - amount(regularOutflow)) / 100);
  const months = plan.debt === 0 ? 0 : actualRepayment > 0 && surplus >= 0 ? Math.ceil(amount(plan.debt) / amount(actualRepayment)) : null;
  let debt = amount(plan.debt);
  let cumulative = 0;
  const projection = Array.from({length: 6}, (_, index) => {
    const repayment = Math.min(amount(plan.repayment), debt);
    // A budget deficit is an uncovered cash shortfall, not an automatic new loan.
    debt -= repayment;
    const remaining = amount(plan.income) - amount(regularOutflow) - repayment;
    cumulative += remaining;
    return {month: index + 1, repayment: repayment / 100, debt: debt / 100, surplus: remaining / 100, cumulative: cumulative / 100};
  });
  return {originalAllocations, regularOutflow, livingAndRentOutflow, fundAndFamilyOutflow, actualRepayment, totalOutflow, surplus, affordableRepayment, months, projection};
}

export function monthlyCashPreset(plan: MonthlyCashPlan, kind: "original" | "balanced" | "repay"): MonthlyCashPlan {
  if (kind === "original") return {...plan, ...Object.fromEntries(rows.filter(r => r.key !== "living").map(r => [r.key, originalMonthlyCashPlan[r.key]]))};
  return {...plan, investment: kind === "repay" ? 0 : 1000, travel: 0, learning: 500,
    emergency: 500, parents: 2000, partner: 500, rent: 2750, repayment: kind === "repay" ? 3500 : 2000};
}

export default function MonthlyCashPlanner({plan, onChange}: {
  plan: MonthlyCashPlan;
  onChange: (plan: MonthlyCashPlan) => void;
}) {
  const totals = calculateMonthlyCashPlan(plan);
  const feasible = totals.surplus >= 0;
  const deadlineMissed = plan.deadlineMonths > 0 && plan.debt > 0 && (totals.months === null || totals.months > plan.deadlineMonths);
  const update = (key: keyof MonthlyCashPlan, value: string) => onChange(normalizeMonthlyCashPlan({...plan, [key]: Number(value)}));
  const necessary = plan.rent + plan.living + plan.parents;
  const reserve = plan.investment + plan.travel + plan.learning + plan.emergency + plan.partner;
  const chunks = [
    {name: "生活及家用", value: necessary, tone: "essential"},
    {name: "还公司借款", value: totals.actualRepayment, tone: "repayment"},
    {name: "投资及各项基金", value: reserve, tone: "reserve"},
    {name: feasible ? "工资卡余量" : "资金缺口", value: Math.abs(totals.surplus), tone: feasible ? "buffer" : "gap"},
  ];
  const baseInputs = [
    {key: "income", label: "每月到手工资（元）", note: "按稳定工资规划，不预支投资收益"},
    {key: "debt", label: "公司借款剩余本金（元）", note: "无息借款；本金沿用先前估算，调拨还款后按实际剩余欠款更新"},
    {key: "deadlineMonths", label: "要求几个月还清", note: "未约定留0，先核对公司要求"},
  ] as const;
  return (
    <section className="cash-plan" aria-labelledby="cash-plan-title">
      <div className="cash-plan-heading">
        <div><span className="cash-plan-kicker">月度预算 · 人民币</span><h2 id="cash-plan-title">每月的钱，先安排得过来</h2>
          <p>先留生活费，再安排还款和各项基金。这里是预算，不是已发生的消费。</p></div>
        <span className={`cash-plan-status ${feasible ? "positive" : "negative"}`} role="status">{feasible ? "当前方案有余量" : "当前方案超出工资"}</span>
      </div>
      <div className="cash-plan-diagnosis">
        <strong>当前到手工资 {money(plan.income)}，本月全部安排 {money(totals.totalOutflow)}。</strong>
        <span>已包含生活费{money(plan.living)}。{totals.actualRepayment > 0 ? `本月拟还公司借款${money(totals.actualRepayment)}。` : "尚未安排公司借款月还款。"}基金拨款会占用现金，但不等于最终消费。</span>
      </div>
      <div className="cash-plan-inputs">
        {baseInputs.map(field => <label key={field.key}><span>{field.label}</span>
          <input type="number" min="0" max="100000000" step={field.key === "deadlineMonths" ? "1" : "100"}
            aria-label={field.label} value={plan[field.key]} onChange={e => update(field.key, e.target.value)} />
          <small>{field.note}</small></label>)}
      </div>
      <div className="cash-plan-summary" aria-live="polite">
        <div><span>本月全部安排</span><strong data-testid="planned-total">{money(totals.totalOutflow)}</strong><small>含生活、基金拨款及实际可还本金</small></div>
        <div className={feasible ? "positive" : "negative"}><span>{feasible ? "工资卡可用余量" : "每月现金缺口"}</span><strong data-testid="planned-surplus">{money(totals.surplus)}</strong><small>{feasible ? "先作为浮动缓冲，不继续分配" : "需要减少拨款或支出才能执行"}</small></div>
        <div><span>公司借款还清时间</span><strong data-testid="payoff-months">{totals.months === null ? "暂无法安排" : totals.months === 0 ? "已无欠款" : `约${totals.months}个月`}</strong><small>按当前本金、无息、每月足额还款估算</small></div>
      </div>
      <div className="cash-plan-allocation" aria-label="月度资金分布">
        <div className="cash-plan-bar" aria-hidden="true">{chunks.filter(c => c.value > 0).map(c => <span key={c.name} className={c.tone} style={{flexGrow: c.value}} />)}</div>
        <div className="cash-plan-legend">{chunks.map(c => <span key={c.name}><i className={c.tone}/>{c.name}<b>{money(c.value)}</b></span>)}</div>
      </div>
      <div className="cash-plan-presets" aria-label="预算草案">
        <span>载入一套草案，再按需要修改</span>
        <div><button type="button" onClick={() => onChange(monthlyCashPreset(plan, "original"))}>原安排</button>
          <button type="button" onClick={() => onChange(monthlyCashPreset(plan, "balanced"))}>保留少量投资</button>
          <button type="button" onClick={() => onChange(monthlyCashPreset(plan, "repay"))}>加快还公司借款</button></div>
      </div>
      <div className="cash-plan-table-wrap"><table className="cash-plan-table">
        <thead><tr><th>资金用途</th><th>原安排</th><th>准备执行 / 月</th></tr></thead>
        <tbody>{rows.map(row => <tr key={row.key}><td><strong>{row.name}</strong><small>{row.kind} · {row.note}</small></td>
          <td>{row.key === "living" ? "未列入" : row.key === "repayment" ? "未安排" : money(originalMonthlyCashPlan[row.key])}</td>
          <td><label><span className="sr-only">{row.name}月预算</span><input aria-label={`${row.name}月预算`} type="number" min="0" max="100000000" step="50" value={plan[row.key]} onChange={e => update(row.key, e.target.value)}/></label>{row.key === "repayment" && plan.repayment > plan.debt && <small>本月实际还 {money(totals.actualRepayment)}</small>}</td></tr>)}</tbody>
        <tfoot><tr><th>合计</th><td>{money(totals.originalAllocations)}<small>不含生活费和还款</small></td><td>{money(totals.totalOutflow)}</td></tr></tfoot>
      </table></div>
      <div className="cash-plan-guidance">
        <p><strong>生活费额度：</strong>{money(plan.living)} / 月，折合每天约 {money(plan.living/30)}。水电、交通等也从这里支付。</p>
        <p><strong>还款边界：</strong>按其他安排计算，每月最多还能拿出 {money(totals.affordableRepayment)} 还款。{totals.surplus < 0 ? "当前方案无法靠工资覆盖，不应按此继续拨款。" : "公司借款无息，先确认还款期限，再选合适的额度。"}</p>
        {deadlineMissed && <p className="negative" role="alert">当前额度不能在{plan.deadlineMonths}个月内还清。仅本金就需平均每月 {money(Math.ceil(plan.debt/plan.deadlineMonths))}，请重新调整。</p>}
        <p><strong>储蓄与消费分开：</strong>投资、旅游、学习、应急和伴侣基金的拨款会减少工资卡现金。实际余额、消费和投资盈亏仍在下方账本记录，不能把拨款直接当成已攒下的钱。</p>
      </div>
      <details className="cash-plan-projection"><summary>查看未来6个月的现金与还款测算</summary>
        <p>每个月按当前预算执行。还款不会超过剩余本金；还清后，这部分额度回到现金余量。累计余量从0开始，不代表账户总余额。</p>
        <div className="cash-plan-table-wrap"><table className="cash-plan-table"><thead><tr><th>月份</th><th>归还本金</th><th>剩余欠款</th><th>现金余量</th><th>累计余量</th></tr></thead>
          <tbody>{totals.projection.map(m => <tr key={m.month}><th>第{m.month}个月</th><td>{money(m.repayment)}</td><td>{money(m.debt)}</td><td className={m.surplus < 0 ? "negative" : ""}>{money(m.surplus)}</td><td className={m.cumulative < 0 ? "negative" : ""}>{money(m.cumulative)}</td></tr>)}</tbody></table></div>
        {!feasible && <p className="negative">表内还款是拟定额度，工资不足以覆盖当前方案。负数表示未解决的资金缺口，不会自动计为新增借款。</p>}
      </details>
    </section>
  );
}
