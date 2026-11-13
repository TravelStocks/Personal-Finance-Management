import {cycleFocusHistory} from './cycle-focus-model';
import {reviewMoney, type FinanceReview, type ReviewFocusSource} from './finance-review-model';
import {projectPayments} from './project-payments';
import type {ReviewUpdate} from './review-dashboard-sync';

export default function CycleFocusHistory({today,records,updates,projects}:{today:string;records:FinanceReview[];updates:ReviewUpdate[];projects:ReviewFocusSource['projects']}) {
  const {cycle,weeks}=cycleFocusHistory(today,records,updates);
  const labels={projects:'大花费项目',bills:'账单与订阅',balance:'资产及负债明细',accounts:'现金账户',investments:'投资账户'};
  return <section className="cycle-journal" aria-label="本账期每周关键变化">
    <header><h3>每周变化</h3><span>{cycle.start} 至 {cycle.limit} · 10 号账期</span></header>
    {weeks.map(w=>{
      const end=w.end<today?w.end:today;
      const payments=projects.filter(p=>p.actualDate && p.actualDate>=w.start && p.actualDate<=end && p.current!==0);
      const added=projectPayments(payments,w.start,end).total;
      const current=w.start<=today&&today<=w.end;
      return <details key={w.start} open={current} className="cycle-week"><summary>
        <span>{w.start.slice(5)} 至 {w.end.slice(5)}</span><small>{current?'本周':w.start>today?'未到本周':w.sections.some(s=>s.asOf)?'已核对':'无核对记录'}</small>
        {payments.length>0&&<strong>项目付款 {payments.length} 笔</strong>}
      </summary><div className="cycle-body">
        <div className="cycle-paid"><div><strong>项目实付补计</strong><b>{reviewMoney(added)}</b></div>
          {!payments.length ? <p>本周暂无已登记的项目付款。</p> : <ul>{payments.map(p=><li key={p.id}><time>{p.actualDate}</time><span>{p.name}</span><strong>{reviewMoney(p.current)}</strong><small>{p.includedInLedger?'已入账 · 不再加计':'按付款日补计'}</small></li>)}</ul>}
        </div>
        <h4>复盘核对记录</h4>
        <div className="cycle-records">{w.sections.map(s=><div key={s.scope} className={`cycle-record cycle-${s.scope}`}>
          <div className="cycle-label"><strong>{labels[s.scope]}</strong><small>{s.status}</small></div>
          <div className="cycle-lines">{s.asOf&&<small>截至 {s.asOf} · {s.comparison}</small>}
            {s.lines.length>0&&<ul>{s.lines.map((line,i)=><li key={i}>{line}</li>)}</ul>}{s.note&&<p>{s.note}</p>}
          </div></div>)}</div></div></details>;
    })}
  </section>;
}
