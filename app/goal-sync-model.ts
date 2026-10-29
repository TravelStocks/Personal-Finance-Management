export type GoalBalance = {id:string;name:string;current:number;parentReviewAmounts?:Record<string,number>};
export type GoalAccount = {id:string;name:string;purpose:string;type:string;balance:number;includedInPersonal?:boolean};
export type GoalKind = "travel"|"learning"|"parent"|"partner"|"emergency"|"other";
export function goalKind(goal:{name:string}):GoalKind {
  const text=goal.name.toLowerCase();
  if(/旅游|旅行/.test(text))return "travel";
  if(/学习|教育|成长/.test(text))return "learning";
  if(/父母|爸妈|孝敬/.test(text))return "parent";
  if(/伴侣|情侣|共同/.test(text))return "partner";
  if(/应急|紧急/.test(text))return "emergency";
  return "other";
}
export function goalBalanceSource(goal:GoalBalance,goals:GoalBalance[],accounts:GoalAccount[]) {
  const kind=goalKind(goal);
  const primary=goals.find(row=>goalKind(row)===kind)?.id===goal.id;
  if(kind==="parent" && primary)return {mode:"parents" as const,accounts:[],label:"累计已给家用"};
  if(primary && ["travel","learning","emergency"].includes(kind)) {
    const matches=accounts.filter(account=>{
      const text=`${account.name} ${account.type} ${account.purpose}`;
      if(/投资|股票|A股|美股|港股|证券/i.test(text))return false;
      if(/应急|紧急/.test(text))return kind==="emergency";
      if(/旅游|旅行/.test(text))return kind==="travel";
      return /学习|教育|成长/.test(text) && kind==="learning";
    });
    if(matches.length)return {mode:"accounts" as const,accounts:matches,label:matches.map(row=>row.name).join("、")};
    return {mode:"manual" as const,accounts:[],label:"未关联账户，保留原金额"};
  }
  return {mode:"manual" as const,accounts:[],label:kind==="partner"?"手填当前金额":"手填"};
}
export function syncAccountGoals<T extends GoalBalance>(goals:T[],accounts:GoalAccount[]):T[] {
  return goals.map(goal=>{
    const source=goalBalanceSource(goal,goals,accounts);
    if(source.mode!=="accounts")return goal;
    const current=source.accounts.filter(row=>row.includedInPersonal!==false).reduce((sum,row)=>sum+Math.round(row.balance*100),0)/100;
    if(!Number.isFinite(current)||current<0)throw new Error("目标关联账户余额无效，请先核对账户。");
    return {...goal,current};
  });
}
// Automatic balances cannot be overwritten by a stale review snapshot or a manual goal input.
export function mergeManualGoals<T extends GoalBalance>(goals:T[],updates:GoalBalance[],accounts:GoalAccount[]):T[] {
  return syncAccountGoals(goals.map(goal=>goalBalanceSource(goal,goals,accounts).mode==="manual" ? {...goal,current:updates.find(row=>row.id===goal.id)?.current ?? goal.current} : goal),accounts);
}
export function addParentSupport<T extends GoalBalance>(goals:T[],reviewId:string,amount:number):T[] {
  if(!/^week:\d{4}-\d{2}-\d{2}$/.test(reviewId)||!Number.isFinite(amount))throw new Error("家用复盘金额或周期无效。");
  const parent=goals.find(row=>goalKind(row)==="parent");
  if(!parent)return goals;
  const previous=parent.parentReviewAmounts?.[reviewId] ?? 0;
  const current=(Math.round(parent.current*100)+Math.round(amount*100)-Math.round(previous*100))/100;
  if(current<0)throw new Error("家用退款或修订超过已有累计金额，请核对父母累计金额。");
  return goals.map(goal=>goal.id===parent.id ? {...goal,current,parentReviewAmounts:{...goal.parentReviewAmounts,[reviewId]:Math.round(amount*100)/100}} : goal);
}
export function parseParentReviewAmounts(value:unknown):Record<string,number>|undefined {
  if(value===undefined)return undefined;
  if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("父母家用累计记录无效。");
  return Object.fromEntries(Object.entries(value).map(([id,amount])=>{
    if(!/^week:\d{4}-\d{2}-\d{2}$/.test(id)||typeof amount!=="number"||!Number.isFinite(amount)||Math.abs(amount)>1e12)throw new Error("父母家用累计记录无效。");
    return [id,Math.round(amount*100)/100];
  }));
}
