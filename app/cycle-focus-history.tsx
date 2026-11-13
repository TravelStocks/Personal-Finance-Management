import {cycleFocusHistory} from './cycle-focus-model';
import type {FinanceReview} from './finance-review-model';
import type {ReviewUpdate} from './review-dashboard-sync';

export default function CycleFocusHistory({today,records,updates}:{today:string;records:FinanceReview[];updates:ReviewUpdate[]}) {
  const {cycle,weeks}=cycleFocusHistory(today,records,updates);
  const labels={projects:'大花费项目',bills:'账单与订阅',balance:'资产及负债明细',accounts:'现金账户',investments:'投资账户'};
  return <section className="review-activity" aria-label="本账期每周关键变化"><div className="section-title compact"><div>
    <h3>每周变化：大花费项目支出、订阅与资产负债</h3><p>{cycle.start} 至 {cycle.limit} · 按复盘截至日归属，每月 10 日切换</p>
  </div></div><p className="review-caption">对比已保存的项目实际金额、订阅登记和账户余额；项目目标和账单提醒不代表已付款。</p>
  {weeks.map(w=><details key={w.start} open={w.start<=today&&today<=w.end} className="review-method"><summary>{w.start} 至 {w.end} · {w.start>today?'未到本周':w.sections.some(s=>s.asOf)?'有核对记录':'未记录'}</summary>
    <div className="review-week-table"><table><thead><tr><th>类别</th><th>本周变化</th></tr></thead><tbody>{w.sections.map(s=><tr key={s.scope}><th scope="row">{labels[s.scope]}</th><td><strong>{s.status}</strong>{s.asOf&&<small>核对截至 {s.asOf} · {s.comparison}</small>}
      {s.lines.length>0&&<ul>{s.lines.map((line,i)=><li key={i}>{line}</li>)}</ul>}{s.note&&<p>{s.note}</p>}</td></tr>)}</tbody></table></div></details>)}
  </section>;
}
