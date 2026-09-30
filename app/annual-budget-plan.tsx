"use client";
import {calculateAnnualBudgetPlan, normalizeAnnualBudgetPlan, type AnnualBudgetPlan, type BudgetMonthMode} from "./annual-budget-model";
import "./annual-budget-plan.css";

const money = (value: number) => `¥${value.toLocaleString("zh-CN", {maximumFractionDigits: 2})}`;
type NumericKey = Exclude<keyof AnnualBudgetPlan, "mode" | "rows">;

export default function AnnualBudgetPlanner({plan, onChange}: {plan: AnnualBudgetPlan; onChange: (plan: AnnualBudgetPlan) => void}) {
  const totals = calculateAnnualBudgetPlan(plan);
  const covered = totals.annualSurplus >= 0 && !totals.assumptionsConflict;
  const update = (key: NumericKey, value: string) => onChange(normalizeAnnualBudgetPlan({...plan, [key]: Number(value)}));
  const editAmount = (id: string, mode: BudgetMonthMode, value: string) => onChange(normalizeAnnualBudgetPlan({...plan,
    rows: plan.rows.map(row => row.id === id ? {...row, [mode]: Number(value)} : row)}));
  const selectMode = (mode: BudgetMonthMode) => onChange({...plan, mode});
  const inputFields: Array<{key: NumericKey; label: string; unit: string; step: string}> = [
    {key: "salary", label: "每月到手工资", unit: "元 / 月", step: "100"},
    {key: "awayMonths", label: "全年出差月份", unit: "个月 / 12个月", step: "1"},
    {key: "paidDays", label: "全年实际领补贴天数", unit: "自然日", step: "1"},
    {key: "allowanceUsd", label: "每天出差补贴", unit: "美元 / 天", step: "1"},
    {key: "dailySpendUsd", label: "每天出差实际开销", unit: "美元 / 天", step: "1"},
    {key: "budgetFx", label: "预算汇率", unit: "人民币 / 美元", step: "0.01"},
    {key: "emergencyCurrent", label: "应急期初参考余额", unit: "元，非账户实时余额", step: "100"},
    {key: "emergencyTargetMonths", label: "应急覆盖目标", unit: "个月", step: "1"},
    {key: "basicMeals", label: "应急测算基本餐饮", unit: "元 / 月，目标下限口径", step: "100"},
    {key: "bufferMonths", label: "连续普通月周转测算", unit: "个月", step: "1"},
  ];
  const renderRow = (row: typeof totals.rows[number]) => <tr key={row.id}>
    <th scope="row"><strong>{row.name}</strong><small>{row.note}</small></th>
    {(["normal", "trip"] as const).map(mode => <td key={mode} className={plan.mode === mode ? "selected-column" : ""}>
      <input type="number" min="0" step="50" aria-label={`${row.name}${mode === "normal" ? "普通月" : "出差月"}预算`}
        value={row[mode]} onChange={event => editAmount(row.id, mode, event.target.value)}/></td>)}
    <td>{money(row.annual)}</td>
  </tr>;
  const annualSlices = [
    {label: "生活与消费预留", amount: totals.annualConsumption, className: "consumption"},
    {label: "投资本金", amount: totals.annualInvestment, className: "investment"},
    {label: "新增应急现金", amount: totals.annualEmergency, className: "emergency"},
    {label: "额外现金余量", amount: Math.max(0, totals.annualSurplus), className: "surplus"},
  ];
  return <section className="annual-budget" aria-labelledby="annual-budget-title">
    <header className="annual-budget-heading">
      <div><span className="annual-budget-kicker">全年预算参考 · 12个月</span><h2 id="annual-budget-title">把出差结余，留给普通月份</h2>
        <p>{totals.normalMonths}个普通月 + {plan.awayMonths}个出差月；全年{plan.paidDays}个领补贴日，出差期间工资照常发放。</p></div>
      <span className={`annual-budget-status ${covered ? "positive" : "negative"}`} role="status">
        {totals.assumptionsConflict ? "出差条件需校正" : covered ? "全年可覆盖，需留周转金" : "全年存在资金缺口"}</span>
    </header>

    <div className="annual-budget-metrics" aria-live="polite">
      <article><span>全年可分配资金</span><strong data-testid="annual-income">{money(totals.annualIncome)}</strong>
        <small>工资 {money(totals.annualSalary)} + 出差净结余 {money(totals.annualTripNet)}</small></article>
      <article><span>全年全部安排</span><strong data-testid="annual-outflow">{money(totals.annualOutflow)}</strong>
        <small>含生活消费、投资本金与应急储备</small></article>
      <article><span>全年投资与应急储备</span><strong data-testid="annual-saving">{money(totals.annualSaving)}</strong>
        <small>投资 {money(totals.annualInvestment)} + 应急 {money(totals.annualEmergency)}</small></article>
      <article className={totals.annualSurplus < 0 ? "negative" : "positive"}><span>完成以上安排后的余量</span>
        <strong data-testid="annual-surplus">{money(totals.annualSurplus)}</strong><small>平均每月 {money(totals.averageSurplus)}，尚未计收益或额外还款</small></article>
    </div>

    <div className="annual-budget-distribution" aria-label="全年资金分布">
      <div className="annual-budget-bar" aria-hidden="true">{annualSlices.filter(slice => slice.amount > 0).map(slice =>
        <span key={slice.label} className={slice.className} style={{flexGrow: slice.amount}}/>)}</div>
      <div className="annual-budget-legend">{annualSlices.map(slice => <span key={slice.label}><i className={slice.className}/>{slice.label}<b>{money(slice.amount)}</b></span>)}</div>
    </div>

    <section className="annual-months" aria-label="月份类型现金流对比">
      <div className="annual-subheading"><h3>同一套安排，两种月份现金流</h3><p>点击月份类型，下方总览卡片和预算图表同步切换。</p></div>
      <div className="annual-month-grid">
        <button type="button" aria-pressed={plan.mode === "normal"} data-testid="normal-month-mode" onClick={() => selectMode("normal")}>
          <span>普通月份 · 全年{totals.normalMonths}个月</span><strong className={totals.normal.surplus < 0 ? "negative" : "positive"} data-testid="normal-month-surplus">{money(totals.normal.surplus)}</strong>
          <small>工资 {money(plan.salary)} − 全部安排 {money(totals.normal.totalOutflow)}</small><em>{totals.normal.surplus < 0 ? "每月需要预留出差结余来补足" : "普通月工资可覆盖当前安排"}</em>
        </button>
        <button type="button" aria-pressed={plan.mode === "trip"} data-testid="trip-month-mode" disabled={plan.awayMonths === 0} onClick={() => selectMode("trip")}>
          <span>出差月份 · 全年{plan.awayMonths}个月</span><strong className={totals.trip.surplus < 0 ? "negative" : "positive"} data-testid="trip-month-surplus">{money(totals.trip.surplus)}</strong>
          <small>工资 + 平均出差净结余 {money(totals.trip.income)} − 安排 {money(totals.trip.totalOutflow)}</small><em>按全年净结余平均分摊；到账时间尚未确定</em>
        </button>
      </div>
      <p className="annual-budget-formula">出差每天净留：${plan.allowanceUsd} − ${plan.dailySpendUsd} = ${totals.netUsd}；全年：{plan.paidDays}天 × ${totals.netUsd} × {plan.budgetFx.toFixed(2)} = {money(totals.annualTripNet)}。</p>
    </section>

    <div className="annual-subheading"><h3>月度与年度完整分配</h3><p>金额可直接修改。只有本地餐饮与交通在出差月归零，其他项目全年保留。</p></div>
    <div className="annual-table-scroll"><table className="annual-budget-table" aria-label="月度与年度分配表">
      <thead><tr><th scope="col">资金用途</th><th scope="col">普通月 / 元</th><th scope="col">出差月 / 元</th><th scope="col">全年 / 元</th></tr></thead>
      <tbody>
        {totals.rows.filter(row => row.kind === "consumption").map(renderRow)}
        <tr className="annual-subtotal"><th scope="row">生活支出与未来消费预留</th><td>{money(totals.normal.consumption)}</td><td>{money(totals.trip.consumption)}</td><td data-testid="annual-consumption">{money(totals.annualConsumption)}</td></tr>
        {totals.rows.filter(row => row.kind !== "consumption").map(renderRow)}
      </tbody>
      <tfoot><tr><th scope="row">全部资金分配</th><td data-testid="normal-month-outflow">{money(totals.normal.totalOutflow)}</td><td data-testid="trip-month-outflow">{money(totals.trip.totalOutflow)}</td><td>{money(totals.annualOutflow)}</td></tr></tfoot>
    </table></div>
    <p className="annual-budget-note">学习每月{money(totals.rows.find(row => row.id === "learning")?.normal ?? 0)}已替代原学习基金500元；运动装备包含在运动预算内。旅游和伴侣基金是消费预留，实际开销从中支付，不再重复新增。</p>

    <section className="annual-reference" aria-label="执行参考数据">
      <div className="annual-subheading"><h3>执行时，先看这几个数</h3></div>
      <div className="annual-reference-grid">
        <article><span>连续{plan.bufferMonths}个普通月的周转金</span><strong data-testid="ordinary-month-buffer">{money(totals.buffer)}</strong>
          <small>每月缺口{money(totals.normalDeficit)} × {plan.bufferMonths}个月；已包含在年度预算中，独立于应急金。</small></article>
        <article><span>全年普通月需要补足</span><strong>{money(totals.normalDeficit * totals.normalMonths)}</strong>
          <small>出差月份合计余量{money(totals.trip.surplus * plan.awayMonths)}，先留给后续普通月。</small></article>
        <article><span>投资与应急占可分配资金</span><strong>{(totals.savingRate * 100).toFixed(1)}%</strong>
          <small>全年投入{money(totals.annualSaving)}；旅游、伴侣基金不计入这项储蓄。</small></article>
        <article><span>全年月均可分配资金</span><strong>{money(totals.averageIncome)}</strong>
          <small>年度平均值；普通月份到账工资仍为{money(plan.salary)}。</small></article>
        <article><span>应急金全年后参考余额</span><strong data-testid="emergency-year-end">{money(totals.emergencyYearEnd)}</strong>
          <small>期初参考{money(plan.emergencyCurrent)} + 全年新增{money(totals.annualEmergency)}，假设不动用、不计收益。</small></article>
        <article><span>{plan.emergencyTargetMonths}个月应急目标保守下限</span><strong data-testid="emergency-target-floor">{money(totals.emergencyTarget)}</strong>
          <small>房租 + 父母家用 + 基本餐饮，共{money(totals.basicNeed)} / 月；未含必要通讯、交通、医疗。全年后仍差{money(totals.emergencyGap)}。</small></article>
      </div>
    </section>

    <div className={`annual-budget-conclusion ${covered ? "" : "annual-budget-warning"}`}>
      <strong>{totals.assumptionsConflict ? "计算条件需校正，暂不判断年度是否覆盖。" : covered ? `全年投入${money(totals.annualSaving)}后，仍留${money(totals.annualSurplus)}额外现金。` : `按当前条件，全年仍缺${money(Math.max(0, -totals.annualSurplus))}。`}</strong>
      <p>年度可覆盖不代表每月现金充足。出差结余到账后先保留周转金；实际出差月份及补贴到账日期未确定，因此这里展示月份类型预算，不推定逐月到账余额。</p>
      {covered && <p>如果额外余量也保留，全年可用于投资本金和新增现金储备的资金合计{money(totals.annualRetained)}；这是投入与留存金额，不代表投资资产一定增值。</p>}
      {plan.awayMonths > 0 && totals.requiredTripDays !== null && <p>保持当前出差月份和各项预算时，全年至少需约{totals.requiredTripDays}个领补贴日才能覆盖；汇率{plan.budgetFx.toFixed(2)}是预算参数。</p>}
      {totals.assumptionsConflict && <p role="alert">领补贴天数超过所填出差月份可容纳的自然日，请校正计算条件。</p>}
    </div>

    <details className="annual-budget-settings"><summary>查看和修改计算条件</summary>
      <div className="annual-budget-inputs">{inputFields.map(field => <label key={field.key}><span>{field.label}</span>
        <input aria-label={field.label} type="number" min="0" step={field.step} value={plan[field.key]} onChange={event => update(field.key, event.target.value)}/><small>{field.unit}</small></label>)}</div>
      <p>预算汇率仅用于测算。每天出差开销已从补贴中扣除，不再加进人民币支出。餐饮2,880元与交通670元为暂估；公司旧借款还款未计入此年度方案，实际欠款与账户余额仍在账本记录。</p>
    </details>
  </section>;
}
