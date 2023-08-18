import {SaveBudgets} from "@prisma/client";
import {addDays} from "date-fns";

export const findStatusBudget = (budget: SaveBudgets, verifyAll = true) => {
    if (verifyAll)  {
        if(budget.status === 'ganho'
            || budget.status === 'perdido'
            || budget.status === 'none'
            || budget.status === 'refeito'
        ) {
            return budget.status
        }
    }
    const expirationDate = addDays(new Date(), 3)
    const lostDate = addDays(new Date(), 5)
    if(budget.createdAt > lostDate) return 'perdido'
    if(budget.createdAt > expirationDate) return 'vencido'
    return 'em andamento'
}