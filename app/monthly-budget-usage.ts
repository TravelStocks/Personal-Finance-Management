import type {AnnualBudgetPlan} from "./annual-budget-model";

// Fund earmarks consume the monthly spending envelope, not personal assets.
export function monthlyBudgetUsage(income:number, consumption:number, plan:AnnualBudgetPlan) {
  const cents=(value:number)=>Math.round(value*100);
  const total=(values:number[])=>values.reduce((sum,value)=>sum+cents(value),0)/100;
  const investment=total(plan.rows.filter(row=>row.kind==="investment").map(row=>row[plan.mode]));
  const emergency=total(plan.rows.filter(row=>row.kind==="emergency").map(row=>row[plan.mode]));
  const reserved=total([investment,emergency]);
  const budget=total(plan.rows.map(row=>row[plan.mode]));
  const spending=total([consumption,reserved]);
  return {consumption,investment,emergency,reserved,budget,spending,surplus:total([income,-spending]),remaining:total([budget,-spending])};
}
