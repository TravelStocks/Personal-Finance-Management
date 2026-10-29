import {dashboardSnapshotTotals, type DashboardState, type ReviewUpdate} from "./review-dashboard-sync";
import {reviewMoney} from "./finance-review-model";
import {reviewModuleLabels} from "./review-module-sync";

export default function ReviewUpdateHistory({updates,onExport}:{updates:ReviewUpdate[];onExport:(update:ReviewUpdate,side:"before"|"after")=>void}) {
  return <details className="review-method"><summary>更新历史与趋势 · {updates.length} 次</summary>
    <div className="table-wrap"><table className="review-table"><thead><tr><th>数据截至 / 保存时间</th><th>范围</th><th>现金</th><th>投资</th><th>负债</th><th>净资产</th><th>完整版本</th></tr></thead><tbody>{[...updates].reverse().map(update=>{
      const totals=dashboardSnapshotTotals(update.after as unknown as DashboardState);
      return <tr key={update.id}><th>{update.asOf}<small>{new Date(update.savedAt).toLocaleString("zh-CN")}</small></th><td>{update.module?`${reviewModuleLabels[update.module]}更新`:update.published?"全部更新":"仅存报告"}</td><td>{reviewMoney(totals.cash)}</td><td>{reviewMoney(totals.investments)}</td><td>{reviewMoney(totals.debt)}</td><td>{reviewMoney(totals.netWorth)}</td><td><div className="data-actions"><button type="button" className="secondary-button" onClick={()=>onExport(update,"before")}>导出更新前</button><button type="button" className="secondary-button" onClick={()=>onExport(update,"after")}>导出更新后</button></div></td></tr>;
    })}</tbody></table></div><p className="review-caption">每次保存保留更新前后完整数据，含同周修订。仅存报告不会改变表内看板余额；不同日期的整期更新用于趋势比较。</p>
  </details>;
}
