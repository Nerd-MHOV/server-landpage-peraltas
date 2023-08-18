import {Deal} from "../rdStationsService.types";
import {SaveBudgets} from "@prisma/client";
import {prismaClient} from "../../database/prismaClient";
import {rdApiAdm} from "./rdApiAdm";

export const winChange = async (deal: Deal, status: string ) => {
    console.log("altomação: ", status, deal.name)

    // mudar etapa no db
    const updatedDb = prismaClient.saveBudgets.updateMany({
        where: {
            budgets: {
                path: ["0", "arrComplete", "responseForm", "rd_client"],
                string_contains: deal.id,
            },
        },
        data: {
            status: status
        }
    })

    // mudar etapa no rd
    const updateRd =  rdApiAdm.put("/deals/"+deal.id, {
        deal: {
            deal_custom_fields: [
                {
                    "custom_field_id": "64b94d33862444000e56696e", // status orçamento
                    "value": status
                }
            ]
        }
    })

    return await Promise.all([updatedDb, updateRd]).then(res => {
        return true
    }) .catch(err => {
        return false
    })
}