"use client";
import {useState} from "react";
import {calculateAnnualAccumulation, calculateAnnualBudgetPlan, normalizeAnnualBudgetPlan, type AnnualBudgetPlan, type BudgetMonthMode} from "./annual-budget-model";
import "./annual-budget-plan.css";

const money = (value: number) => `¥${value.toLocaleString("zh-CN", {maximumFractionDigits: 2})}`;
type NumericKey = Exclude<keyof AnnualBudgetPlan, "mode" | "rows" | "bonusAfterTax">;

function AnnualAccumulation({plan, onChange}: {plan: AnnualBudgetPlan; onChange: (plan: AnnualBudgetPlan) => void}) {
  const totals = calculateAnnualBudgetPlan(plan);
  const selected = calculateAnnualAccumulation(plan);
  const knownBonus = plan.bonusAfterTax !== null;
  const scenarios = [10000, 20000, 30000].map(bonus => calculateAnnualAccumulation(plan, bonus));
  const percentage = (rate: number | null) => rate === null ? "—" : `${(rate * 100).toFixed(1)}%`;
  const investment = totals.rows.find(row => row.kind === "investment");
  const emergency = totals.rows.find(row => row.kind === "emergency");
  const contribution = (row: typeof investment) => row?.normal === row?.trip ? `每月${money(row?.normal ?? 0)}` : `不出差月份${money(row?.normal ?? 0)}、出差月份${money(row?.trip ?? 0)}`;
  return <section className="annual-accumulation" aria-labelledby="annual-accumulation-title">
    <div className="annual-subheading"><h3 id="annual-accumulation-title">更新后的年度积累</h3>
      <p>沿用上方分配表；年终奖与额外绩效奖金合计记为税后奖金 B，按全部存下测算。</p></div>
    <label className="annual-bonus-input"><span>全年税后额外奖金 B（可选测算）</span>
      <input type="number" min="0" step="1000" value={plan.bonusAfterTax ?? ""} placeholder="未确定时留空，以 B 表示"
        onChange={event => onChange(normalizeAnnualBudgetPlan({...plan, bonusAfterTax:event.target.value === "" ? null : Number(event.target.value)}))}/>
      <small>输入金额只用于测算；基础预算及已录入账户余额按原口径显示。</small></label>
    <div className="annual-table-scroll" tabIndex={0} role="region" aria-label="年度积累明细横向滚动区域">
      <table className="annual-budget-table annual-accumulation-table" aria-label="更新后的年度积累">
        <thead><tr><th scope="col">积累项目</th><th scope="col">全年金额</th><th scope="col">计算口径</th></tr></thead>
        <tbody>
          <tr><th scope="row">固定投资</th><td>{money(totals.annualInvestment)}</td><td>{contribution(investment)}，属于投入本金</td></tr>
          <tr><th scope="row">固定应急储蓄</th><td>{money(totals.annualEmergency)}</td><td>{contribution(emergency)}，属于新增现金储备</td></tr>
          <tr><th scope="row">基础预算剩余</th><td>{money(totals.annualSurplus)}</td><td>年末确实未花掉，才算实际积蓄</td></tr>
          <tr><th scope="row">年终奖 + 额外绩效奖金</th><td>{knownBonus ? money(selected.bonus) : "记为 B（待确认）"}</td><td>税后金额全部存下</td></tr>
          <tr className="annual-subtotal"><th scope="row">全年固定储蓄投资目标</th><td data-testid="annual-fixed-accumulation">{knownBonus ? money(selected.fixedTarget) : `${money(totals.annualSaving)} + B`}</td><td>投资 + 应急储蓄 + B；不依赖基础预算剩余</td></tr>
        </tbody>
        <tfoot><tr><th scope="row">按预算预计可积累总额</th><td data-testid="annual-projected-accumulation">{knownBonus ? money(selected.projectedAccumulation) : `${money(totals.annualRetained)} + B`}</td><td>包含预计余量，不计投资涨跌</td></tr></tfoot>
      </table>
    </div>
    <p className="annual-budget-note">这是全年新增投入与留存金额，不含已有应急金或账户余额。投资本金投入不等于资产一定增值，预计余量需等年末核实。</p>
    {knownBonus && <div className="annual-bonus-result" aria-live="polite">
      <span>按 B = {money(selected.bonus)} 测算</span>
      <strong>{selected.projectedCash >= 0 ? `预计新增现金积蓄 ${money(selected.projectedCash)}` : `预计现金缺口 ${money(-selected.projectedCash)}`}</strong>
      <span>加上投资本金 {money(totals.annualInvestment)}，预计全年积累 {money(selected.projectedAccumulation)}，占全年可分配资金 {percentage(selected.accumulationRate)}。</span>
    </div>}
    <div className="annual-subheading"><h3>奖金会怎样改变全年储蓄水平？</h3><p>以下仅为不同奖金金额的情景测算，不预测实际奖金金额。</p></div>
    <div className="annual-table-scroll" tabIndex={0} role="region" aria-label="奖金情景横向滚动区域">
      <table className="annual-budget-table annual-bonus-scenarios" aria-label="税后奖金对全年积累的情景测算">
        <thead><tr><th scope="col">全年税后额外奖金</th><th scope="col">预计新增现金积蓄</th><th scope="col">加上投资本金后的全年积累</th><th scope="col">占全年可分配资金</th></tr></thead>
        <tbody>{scenarios.map(scenario => <tr key={scenario.bonus}>
          <th scope="row">{money(scenario.bonus)}</th><td>{money(scenario.projectedCash)}</td><td><strong>{money(scenario.projectedAccumulation)}</strong></td><td><strong>{percentage(scenario.accumulationRate)}</strong></td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="annual-budget-note">新增现金积蓄 = 应急新增{money(totals.annualEmergency)} + 基础预算余量{money(totals.annualSurplus)} + B；比例的分母 = 工资 + 出差净结余 + 该情景的税后奖金。所有金额随上方预算联动。</p>
  </section>;
}

export function AnnualBudgetAllocationTable({plan, onChange, titleId}: {plan: AnnualBudgetPlan; onChange: (plan: AnnualBudgetPlan) => void; titleId: string}) {
  const [editing, setEditing] = useState(false);
  const totals = calculateAnnualBudgetPlan(plan);
  const editAmount = (id: string, mode: BudgetMonthMode, value: string) => onChange(normalizeAnnualBudgetPlan({...plan,
    rows: plan.rows.map(row => row.id === id ? {...row, [mode]: Number(value)} : row)}));
  const renderRow = (row: typeof totals.rows[number]) => <tr key={row.id} data-budget-row={row.id}>
    <th scope="row">{row.name}</th>
    {(["normal", "trip"] as const).map(mode => <td key={mode} className={plan.mode === mode ? "selected-column" : ""}>
      {editing ? <input type="number" min="0" step="50" aria-label={`${row.name}${mode === "normal" ? "不出差月份" : "出差月份"}预算`}
        value={row[mode]} onChange={event => editAmount(row.id, mode, event.target.value)}/> : money(row[mode])}</td>)}
    <td>{money(row.annual)}</td>
  </tr>;
  return <section className="annual-allocation" aria-labelledby={titleId}>
    <div className="annual-subheading annual-table-heading"><div><h3 id={titleId}>完整月度与年度分配表</h3>
      <p>全年预算 = 不出差月份金额 × {totals.normalMonths} + 出差月份金额 × {plan.awayMonths}。<span className="annual-mobile-hint">左右滑动表格查看金额列。</span></p></div>
      <button type="button" aria-pressed={editing} onClick={() => setEditing(value => !value)}>{editing ? "完成编辑" : "编辑分配金额"}</button></div>
    <div className="annual-table-scroll" tabIndex={0} role="region" aria-label="完整分配表横向滚动区域"><table className="annual-budget-table" aria-labelledby={titleId}>
      <thead><tr><th scope="col">项目</th><th scope="col">不出差月份</th><th scope="col">出差月份</th><th scope="col">全年预算</th></tr></thead>
      <tbody>
        {totals.rows.filter(row => row.kind === "consumption").map(renderRow)}
        <tr className="annual-subtotal"><th scope="row">生活支出及未来消费预留小计</th><td>{money(totals.normal.consumption)}</td><td>{money(totals.trip.consumption)}</td><td>{money(totals.annualConsumption)}</td></tr>
        {totals.rows.filter(row => row.kind !== "consumption").map(renderRow)}
      </tbody>
      <tfoot><tr><th scope="row">全部资金分配</th><td>{money(totals.normal.totalOutflow)}</td><td>{money(totals.trip.totalOutflow)}</td><td>{money(totals.annualOutflow)}</td></tr></tfoot>
    </table></div>
    <p className="annual-budget-note">出差月份本地餐饮{money(totals.rows.find(row => row.id === "food")?.trip ?? 0)}、交通{money(totals.rows.find(row => row.id === "transport")?.trip ?? 0)}；其余项目保留12个月。学习含订阅、书籍和其他会员；运动含装备。旅游与伴侣基金用于未来消费，投资与应急基金合计全年{money(totals.annualSaving)}。</p>
  </section>;
}

export default function AnnualBudgetPlanner({plan, onChange}: {plan: AnnualBudgetPlan; onChange: (plan: AnnualBudgetPlan) => void}) {
  const totals = calculateAnnualBudgetPlan(plan);
  const covered = totals.annualSurplus >= 0 && !totals.assumptionsConflict;
  const update = (key: NumericKey, value: string) => onChange(normalizeAnnualBudgetPlan({...plan, [key]: Number(value)}));
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
  const annualSlices = [
    {label: "生活与消费预留", amount: totals.annualConsumption, className: "consumption"},
    {label: "投资本金", amount: totals.annualInvestment, className: "investment"},
    {label: "新增应急现金", amount: totals.annualEmergency, className: "emergency"},
    {label: "额外现金余量", amount: Math.max(0, totals.annualSurplus), className: "surplus"},
  ];
  return <section className="annual-budget" aria-labelledby="annual-budget-title">
    <header className="annual-budget-heading">
      <div><span className="annual-budget-kicker">全年预算参考 · 12个月</span><h2 id="annual-budget-title">把出差结余，留给普通月份</h2>
        <p>{totals.normalMonths}个普通月 + {plan.awayMonths}个出差月；全年{plan.paidDays}个领补贴日，出差期间工资照常发放。</p>
        <div className="annual-budget-jump-links"><a className="annual-table-link" href="#annual-allocation-title">查看完整分配表 ↓</a>
          <a className="annual-table-link" href="#annual-accumulation-title">查看年度积累与奖金 ↓</a></div></div>
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
    <p className="annual-budget-note">以上为基础预算，年终奖与额外绩效奖金另见下方年度积累。</p>

    <div className="annual-budget-distribution" aria-label="全年资金分布">
      <div className="annual-budget-bar" aria-hidden="true">{annualSlices.filter(slice => slice.amount > 0).map(slice =>
        <span key={slice.label} className={slice.className} style={{flexGrow: slice.amount}}/>)}</div>
      <div className="annual-budget-legend">{annualSlices.map(slice => <span key={slice.label}><i className={slice.className}/>{slice.label}<b>{money(slice.amount)}</b></span>)}</div>
    </div>

    <AnnualBudgetAllocationTable plan={plan} onChange={onChange} titleId="annual-allocation-title"/>

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
      <div className="annual-table-scroll annual-cashflow-summary"><table className="annual-budget-table" aria-label="按分配表重新计算的现金流">
        <thead><tr><th scope="col">现金流核对</th><th scope="col">不出差月份</th><th scope="col">出差月份平均</th><th scope="col">全年</th></tr></thead>
        <tbody>
          <tr><th scope="row">到手工资</th><td>{money(plan.salary)}</td><td>{money(plan.salary)}</td><td>{money(totals.annualSalary)}</td></tr>
          <tr><th scope="row">出差净结余</th><td>{money(0)}</td><td>{money(totals.trip.tripNet)}</td><td>{money(totals.annualTripNet)}</td></tr>
          <tr className="annual-subtotal"><th scope="row">可分配资金合计</th><td>{money(totals.normal.income)}</td><td>{money(totals.trip.income)}</td><td>{money(totals.annualIncome)}</td></tr>
          <tr><th scope="row">生活支出及未来消费预留</th><td>{money(totals.normal.consumption)}</td><td>{money(totals.trip.consumption)}</td><td>{money(totals.annualConsumption)}</td></tr>
          <tr><th scope="row">投资基金 + 应急基金</th><td>{money(totals.normal.saving)}</td><td>{money(totals.trip.saving)}</td><td>{money(totals.annualSaving)}</td></tr>
          <tr><th scope="row">全部资金分配</th><td>{money(totals.normal.totalOutflow)}</td><td>{money(totals.trip.totalOutflow)}</td><td>{money(totals.annualOutflow)}</td></tr>
        </tbody>
        <tfoot><tr><th scope="row">分配后的现金余量</th><td className={totals.normal.surplus < 0 ? "negative" : "positive"}>{money(totals.normal.surplus)}</td><td className={totals.trip.surplus < 0 ? "negative" : "positive"}>{money(totals.trip.surplus)}</td><td className={totals.annualSurplus < 0 ? "negative" : "positive"}>{money(totals.annualSurplus)}</td></tr></tfoot>
      </table></div>
    </section>

    <AnnualAccumulation plan={plan} onChange={onChange}/>

    <section className="annual-reference" aria-label="执行参考数据">
      <div className="annual-subheading"><h3>执行时，先看这几个数</h3></div>
      <div className="annual-reference-grid">
        <article><span>连续{plan.bufferMonths}个普通月的周转金</span><strong data-testid="ordinary-month-buffer">{money(totals.buffer)}</strong>
          <small>每月缺口{money(totals.normalDeficit)} × {plan.bufferMonths}个月；已包含在年度预算中，独立于应急金。</small></article>
        <article><span>全年普通月需要补足</span><strong>{money(totals.normalDeficit * totals.normalMonths)}</strong>
          <small>出差月份合计余量{money(totals.annualTripSurplus)}，先留给后续普通月。</small></article>
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
      <p>预算汇率仅用于测算。每天出差开销已从补贴中扣除，不再加进人民币支出。本地餐饮与交通按分配表预留；公司旧借款还款未计入此年度方案，实际欠款与账户余额仍在账本记录。</p>
    </details>
  </section>;
}
