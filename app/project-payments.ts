type PaymentSource = {actualDate?:string; current:number; includedInLedger?:boolean};

// Older project balances are earmarks. Never infer a payment date from a deadline.
export function projectPayments<T extends PaymentSource>(projects:T[], start:string, end:string) {
  const rows=projects.filter(p=>p.actualDate && p.actualDate>=start && p.actualDate<=end && !p.includedInLedger && p.current!==0);
  return {rows,total:rows.reduce((sum,p)=>sum+Math.round(p.current*100),0)/100};
}
