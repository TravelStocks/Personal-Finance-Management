import {analyzeFinanceReview, latestWeeklyReview, reviewMoney, type FinanceReview} from "./finance-review-model";

export default function ReviewOverview({records, onOpen}: {records: FinanceReview[]; onOpen: () => void}) {
  const latest = latestWeeklyReview(records);
  const analysis = latest ? analyzeFinanceReview(latest, records) : null;
  const delta = (value: number | null) => value === null ? "首次基准" : `较上期 ${value > 0 ? "+" : ""}${reviewMoney(value)}`;
  const cards = analysis && latest ? [
    {title:"本周收入", value:analysis.totals.income, detail:delta(analysis.prior ? analysis.totals.income-analysis.prior.income : null), tone:"blue"},
    {title:"本周实际消费", value:analysis.totals.spending, detail:delta(analysis.prior ? analysis.totals.spending-analysis.prior.spending : null), tone:"green"},
    {title:"本周收支结余", value:analysis.totals.surplus, detail:"收入减消费；投资、应急划拨不计消费", tone:analysis.totals.surplus < 0 ? "red" : "green"},
    {title:"复盘期末净资产", value:analysis.totals.netWorth, detail:delta(analysis.netWorthDelta), tone:"violet"},
  ] : [];
  return <section aria-label="最近周复盘" className="review-overview">
    <div className="section-title compact"><div><h3>最近周复盘</h3>
      <p>{latest ? `${latest.start} 至 ${latest.end} · ${analysis!.totals.days} 天 · 已保存快照` : "尚未保存周复盘"}</p>
      {analysis?.prior && <p>上期：{analysis.previous!.start} 至 {analysis.previous!.end} · {analysis.prior.days} 天{analysis.prior.days !== analysis.totals.days ? " · 天数不同，金额不直接代表增减趋势" : ""}</p>}
    </div><button type="button" onClick={onOpen}>查看周复盘</button></div>
    <div className="overview-grid">{cards.map(card => <article key={card.title} className={`overview-card ${card.tone}`}><span>{card.title}</span><strong>{reviewMoney(card.value)}</strong><small>{card.detail}</small></article>)}</div>
  </section>;
}
