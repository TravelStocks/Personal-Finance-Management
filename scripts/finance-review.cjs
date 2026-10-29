const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadModel(name) {
  const source = path.resolve(__dirname, `../app/${name}.ts`);
  const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
  }).outputText;
  const exported = {};
  new Function('exports', 'require', compiled)(exported, name => {
    if (name.startsWith('./') && /^[a-z-]+$/.test(name.slice(2))) return loadModel(name.slice(2));
    return require(name);
  });
  return exported;
}
const model = loadModel('finance-review-model');
module.exports = {loadModel};

function run(args) {
  const command = args.shift();
  const options = {};
  while (args.length) {
    const key = args.shift();
    if (key === '--replace') options.replace = true;
    else if (['--type','--end','--dir','--input','--mode','--month-start'].includes(key) && args[0] && !args[0].startsWith('--')) options[key.slice(2)] = args.shift();
    else throw new Error(`Unknown or incomplete option: ${key}`);
  }
  if (!['template','save','aggregate'].includes(command)) throw new Error('Usage: node scripts/finance-review.cjs template|save|aggregate [--type week|month|quarter] [--end YYYY-MM-DD] [--month-start 10|1] [--input file.json] [--dir private-directory] [--replace]');
  const directory = path.resolve(options.dir || path.join(__dirname, '../.private-finance'));
  const publicDocs = path.resolve(__dirname, '../docs');
  if (directory === publicDocs || directory.startsWith(publicDocs + path.sep)) throw new Error('Private financial records must not be written into the public docs directory.');
  const historyPath = path.join(directory, 'history.json');
  const history = fs.existsSync(historyPath) ? model.parseFinanceReviews(JSON.parse(fs.readFileSync(historyPath, 'utf8'))) : [];
  const envelope = records => JSON.stringify({app:'personal-finance-review', version:1, records}, null, 2) + '\n';
  const write = (name, content, replace = false) => {
    const target = path.join(directory, name);
    fs.writeFileSync(target, content, {encoding:'utf8', flag:replace ? 'w' : 'wx'});
    return target;
  };
  if (command === 'template' || command === 'aggregate') {
    const type = options.type || 'week';
    if (!['week','month','quarter'].includes(type)) throw new Error('Invalid review type');
    const end = options.end || model.reviewToday();
    if (command === 'aggregate' && type === 'week') throw new Error('Aggregate supports month or quarter only');
    const monthStart = Number(options['month-start'] || 10);
    if (![1,10].includes(monthStart)) throw new Error('Month start must be 1 or 10');
    const draft = command === 'template' ? model.newReviewDraft(type, end, monthStart) : model.aggregateFinanceReviews(history,type,end,monthStart);
    if (type === 'month') {
      const mode = options.mode || 'normal';
      if (!['normal','trip'].includes(mode)) throw new Error('Invalid month budget mode');
      const plan = loadModel('annual-budget-model').initialAnnualBudgetPlan;
      draft.budget = {mode, amounts:Object.fromEntries(plan.rows.map(row=>[row.id,row[mode]]))};
    }
    const stem = `${command}-${type}-${draft.start}`;
    if (fs.existsSync(path.join(directory, `${stem}.json`)) || fs.existsSync(path.join(directory, `${stem}.md`))) throw new Error('Template already exists; keep its inputs or use a separate private directory.');
    const previous = history.filter(row=>row.type===type && (type!=='month'||(row.monthStartDay??1)===(draft.monthStartDay??1)) && row.end<draft.start).sort((a,b)=>b.end.localeCompare(a.end))[0];
    if (command === 'template' && previous?.accounts) draft.accounts = previous.accounts.map(row=>({...row,balance:null,note:''}));
    if (command === 'template' && previous?.focus) draft.focus = model.newReviewFocus(previous.focus);
    const template = [
      `# ${model.reviewTypeNames[type]}数据更新`, `期间：${draft.start} 至 ${draft.end}（人民币）`,
      previous ? `上期基准：${previous.start} 至 ${previous.end}；期末净资产 ${model.reviewMoney(model.reviewTotals(previous).netWorth)}` : '暂无同类上期，本次建立首次基准。', '',
      '本期外部收入：', '工资与其他到账请分别提供实际日期、金额和事项；未到账的工资规划不计收入。', '', '| 项目 | 本期金额 | 发生事项（可选） |', '|---|---:|---|',
      ...model.reviewCategories.map(row=>`| ${row.name}${row.flow==='transfer'?'（净划拨）':''} | | |`), '',
      '## 本期期末账户', '| 账户编号 / 名称 | 期末余额 | 计入个人现金 | 本期变动说明 |', '|---|---:|---|---|',
      ...(previous?.accounts ?? []).map(row=>`| ${row.id.replace(/[|\r\n]/g,' ')} / ${row.name.replace(/[|\r\n]/g,' ')} | | ${row.included?'是':'否'} | |`), '',
      '余额须重新核对；计入账户合计须等于现金及存款，证券账户和他人资金不能重复计入。', '',
      '## 期末余额', ...Object.values(model.balanceLabels).map(label=>`- ${label}：`), '',
      '## 关键事项核对（无变化也请核对）',
      '- 大花费项目：目标、已准备、截止日期；本期新增、完成、延期或取消事项：',
      '- 账单与订阅：登记金额、提醒日期；新增、调价、续费、支付或取消事项：',
      '- 资产负债：补录资产、负债余额、持仓参考市值及变化原因：',
      '来源清单由网页模块或用户提供。上期带入值仅供参考，未确认不得勾选 focus.checks；旧日期提醒不直接视为欠款，移出清单不直接视为已付款或已取消。', '',
      '本期补充事项：', '',
      '没有发生填 0，未知留空待补。七类消费填实际付款减退款；投资和应急填净转入，不计消费。',
      '微信充值、自有账户转账、专项基金预留不记消费。自有证券账户转入转出不算收入。',
      '应急&学习金预算合计1,500元：应急500、学习1,000；复盘仍分开记录净转入与学习实际消费。学习备注写明课程、书籍、工具或会员名称及用途。',
      '咔皮日常账户报告若仅包含单笔超过10元，请另核对未包含的小额支出；不能默认全部包含在小额支付钱包里。',
      '小额支付可用期初支付余额 + 本期净充值 - 期末余额核算，但须排除其他转账、理财及已另记的大额付款。',
      '现金及存款含本人专项现金；证券账户含持仓和账户现金，不能重复。给家人的钱不再属于个人资产。',
      '偿还借款本金不计消费或投资划拨，更新现金和负债；利息及费用计实际消费。外币资产统一按同一截至日汇率折算人民币。',
      ...(type==='month'?[monthStart===10?'月度按每月10日至下月9日；10号只属于新账期。':'本模板沿用自然月。', '月预算参考来自仓库当前方案；普通月日常使用1,000元。已在网页修改预算时，用实际确认方案替换 JSON budget。']:[]), '',
    ].join('\n');
    fs.mkdirSync(directory,{recursive:true});
    const output = write(`${stem}.json`, JSON.stringify(draft,null,2)+'\n');
    write(`${stem}.md`,template);
    console.log(JSON.stringify({draft:output,template:path.join(directory,`${stem}.md`),saved:false}));
    return;
  }
  if (!options.input) throw new Error('save requires --input');
  const incoming = model.parseFinanceReviews(JSON.parse(fs.readFileSync(path.resolve(options.input),'utf8')));
  if (!incoming.length) throw new Error('No records to save');
  const conflicts = incoming.filter(row=>history.some(old=>old.id===row.id));
  if (conflicts.length && !options.replace) throw new Error(`Existing periods: ${conflicts.map(row=>row.id).join(', ')}. Review changes first; use --replace for an intentional revision.`);
  const now = new Date().toISOString();
  const records = incoming.map(row=>({...row,savedAt:now})).reduce(model.upsertFinanceReview,history);
  const reports = incoming.map(record=>({name:`report-${record.type}-${record.start}.md`, text:model.financeReviewReport(record,records)}));
  // All input and history are validated before any output or backup is written.
  fs.mkdirSync(directory,{recursive:true});
  if (fs.existsSync(historyPath)) fs.copyFileSync(historyPath,path.join(directory,`history-backup-${now.replace(/[:.]/g,'-')}-${process.pid}.json`),fs.constants.COPYFILE_EXCL);
  const temporary = `${historyPath}.${process.pid}.tmp`;
  fs.writeFileSync(temporary,envelope(records),{encoding:'utf8',flag:'wx'});
  fs.renameSync(temporary,historyPath);
  for (const report of reports) write(report.name,report.text,true);
  write('website-import.json',envelope(records),true);
  console.log(JSON.stringify({history:historyPath,reports:reports.map(report=>path.join(directory,report.name)),websiteImport:path.join(directory,'website-import.json'),records:records.length}));
}
if (require.main === module) {
  try {run(process.argv.slice(2));}
  catch (error) {console.error(error.message);process.exitCode=1;}
}
