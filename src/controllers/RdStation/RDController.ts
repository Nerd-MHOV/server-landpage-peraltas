import {Request, Response} from "express";
import axios from "axios";
import {rdApiAdm} from "../../services/rdstation/rdApiAdm";

export class RDController {
    async getFormSendRd(request: Request, response: Response) {
        const {nome, email, telefone, cidade, mensagem, checkin, checkout, adultos, criancas, pet, idade_crianca_1,
            idade_crianca_2, idade_crianca_3, idade_crianca_4, porte_pets_1, porte_pets_2, porte_pets_3, porte_pets_4,
            link, origem} = request.body;

        try {
            const promiseArray: Promise<any>[] = []
            //promisse all
                //get contact with email
                //if contact not exist create deal with contact,
                //else: create a deal, and put in contact


            //child age
            let childAge = ""
            if(idade_crianca_1) childAge += idade_crianca_1
            if(idade_crianca_2) childAge += idade_crianca_2
            if(idade_crianca_3) childAge += idade_crianca_3
            if(idade_crianca_4) childAge += idade_crianca_4

            //pet port
            let petPort = ""
            if(porte_pets_1) petPort += porte_pets_1
            if(porte_pets_2) petPort += porte_pets_2
            if(porte_pets_3) petPort += porte_pets_3
            if(porte_pets_4) petPort += porte_pets_4


            const getContact = (await rdApiAdm.get("/contacts", {
                params: {
                    email
                }
            })).data;

            console.log("get contact", getContact)

            if(getContact?.total > 0) {
                const contact = getContact.contacts[0]
                const dealsIds: string[] = [];
                for (const dealID of contact.deals) {
                    dealsIds.push(dealID.id)
                }
                const createDeal = (await rdApiAdm.post("/deals", {
                    deal: {
                        deal_stage_id: "649dcc5287d5af0023d4aa9e",
                        name: nome,
                        deal_custom_fields: [
                            {
                                custom_field_id: "64b7e36af4f07f001ab229e9",
                                value: checkin,
                            },
                            {
                                custom_field_id: "64b7e389d59c560018d30e20",
                                value: checkout,
                            },
                            {
                                custom_field_id: "64b7e553c69b74001c0e0048",
                                value: criancas,
                            },
                            {
                                custom_field_id: "64b7e57ec69b74000c0dfffc",
                                value: adultos,
                            },
                            {
                                custom_field_id: "64b7ed74bfabcc002b264818",
                                value: childAge,
                            },
                            {
                                custom_field_id: "64b7eda36ea9c8000c03efa8",
                                value: pet,
                            },
                            {
                                custom_field_id: "64b7edb9f217510019a64bc5",
                                value: petPort,
                            }
                        ]
                    }
                })).data
                console.log("create deal", createDeal)
                dealsIds.push(createDeal.id)
                setTimeout(async () => {
                    const updateContact = await rdApiAdm.put("/contacts/"+contact.id, {
                        contact: {
                            deals_id: dealsIds
                        }
                    })
                    console.log("UPDATED CONTACT",updateContact);
                }, 180000)
            } else {
                const createDeal = await rdApiAdm.post("/deals", {
                    deal: {
                        deal_stage_id: "649dcc5287d5af0023d4aa9e",
                        name: nome,
                        deal_custom_fields: [
                            {
                                custom_field_id: "64b7e36af4f07f001ab229e9",
                                value: checkin,
                            },
                            {
                                custom_field_id: "64b7e389d59c560018d30e20",
                                value: checkout,
                            },
                            {
                                custom_field_id: "64b7e553c69b74001c0e0048",
                                value: criancas,
                            },
                            {
                                custom_field_id: "64b7e57ec69b74000c0dfffc",
                                value: adultos,
                            },
                            {
                                custom_field_id: "64b7ed74bfabcc002b264818",
                                value: childAge,
                            },
                            {
                                custom_field_id: "64b7eda36ea9c8000c03efa8",
                                value: pet,
                            },
                            {
                                custom_field_id: "64b7edb9f217510019a64bc5",
                                value: petPort,
                            }
                        ]
                    },
                    contacts: [{
                        emails: [{email: email}],
                        name: nome,
                        phones: [{phone: telefone, type: "cellphone"}]
                    }]
                })

                console.log("create a deal", createDeal)
            }

            response.json("Negocio Criado no RD station!")
        }catch (e) {
            return response.json("Erro interno no servidor").status(500)
        }
    }
}