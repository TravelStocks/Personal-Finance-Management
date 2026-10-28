type CashAccount = {id: string; name: string; balance: number; liquid: boolean; reserve: string | null};
type CashReservation = {id: string; name: string; current: number; locked: boolean; fundingAccountId?: string};
const round = (value: number) => Math.round((value + Number.EPSILON * Math.abs(value)) * 100) / 100;

export function calculateLiquidity(accounts: CashAccount[], projects: CashReservation[]) {
  const liquidCash = round(accounts.filter(account => account.liquid).reduce((sum, account) => sum + account.balance, 0));
  const deductions = accounts.filter(account => account.liquid && account.reserve && account.balance > 0)
    .map(account => ({id: `account-${account.id}`, name: account.name, amount: account.balance, source: account.reserve!}));
  const accountReserved = round(deductions.reduce((sum, item) => sum + item.amount, 0));
  const linked = new Map<string, number>();
  let unlinkedCount = 0;
  for (const project of projects.filter(project => project.locked && project.current > 0)) {
    const account = accounts.find(account => account.id === project.fundingAccountId);
    if (account) {
      linked.set(account.id, (linked.get(account.id) ?? 0) + project.current);
    } else {
      unlinkedCount++;
      deductions.push({id: `project-${project.id}`, name: project.name, amount: project.current, source: "未关联账户，另占通用现金"});
    }
  }
  let overallocated = 0;
  for (const [id, amount] of linked) {
    const account = accounts.find(account => account.id === id)!;
    const excess = Math.max(0, amount - Math.max(0, account.balance));
    overallocated += excess;
    // A dedicated account is already locked once. Non-liquid funds are outside the starting cash pool.
    const additional = account.liquid && !account.reserve ? amount : excess;
    if (additional > 0) deductions.push({id: `linked-${id}`, name: `${account.name} 关联项目`, amount: additional,
      source: account.reserve || !account.liquid ? "超过关联账户余额的占用" : "项目锁定"});
  }
  const reserved = round(deductions.reduce((sum, item) => sum + item.amount, 0));
  return {liquidCash, accountReserved, projectReserved: round(reserved - accountReserved), reserved,
    available: round(liquidCash - reserved), overallocated: round(overallocated), unlinkedCount, deductions};
}
