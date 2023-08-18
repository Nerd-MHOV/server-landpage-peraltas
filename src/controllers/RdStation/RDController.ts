import {Request, Response} from "express";
import axios from "axios";
import {rdApiAdm} from "../../services/rdstation/rdApiAdm";

const rdApi = axios.create({
    baseURL: "https://crm.rdstation.com/api/v1",
});

export class RDController {
    async deleteProduct(request: Request, response: Response) {
        const {deal_id, deal_product_id} = request.body;
        const user = request.user;
        try {
            const axiosResponse = await rdApi
                .delete(`/deals/${deal_id}/deal_products/${deal_product_id}`, {
                    params: {token: user.token_rd}
                })
            return response.json(axiosResponse.data)
        } catch (e) {
            return response.status(400).json({msg: "error", debug: e});
        }

    }

    async addProduct(request: Request, response: Response) {
        const {deal_id, product_id, price, amount} = request.body
        const user = request.user;
        try {
            console.log(request.body)
            const axiosResponse = await rdApi.post(`/deals/${deal_id}/deal_products`, {
                product_id, price, amount: amount,
            }, {
                params: {token: user.token_rd}
            });
            return response.json(axiosResponse.data);
        } catch (e) {
            console.log(e);
            return response.status(400).json({msg: "error", debug: e});
        }

    }

    async changeStage(request: Request, response: Response) {
        const {deal_id, check_in, check_out, adt, chd, pet} = request.body;
        const user = request.user;
        console.log(request.body)
        try {
            const axiosResponse = await rdApi.put(`/deals/${deal_id}`, {
                deal_stage_id: "649dcc5287d5af0023d4aaa0", deal: {
                    user_id: user.user_rd, deal_custom_fields: [{
                        "custom_field_id": "64b7e36af4f07f001ab229e9", //check-in
                        "value": check_in
                    }, {
                        "custom_field_id": "64b7e389d59c560018d30e20", //check-out
                        "value": check_out
                    }, {
                        "custom_field_id": "64b7e553c69b74001c0e0048", //quantidade de crianças
                        "value": chd.length
                    }, {
                        "custom_field_id": "64b7ed74bfabcc002b264818", //idade das crianças
                        "value": chd.toString()
                    }, {
                        "custom_field_id": "64b7e57ec69b74000c0dfffc", // adultos
                        "value": adt
                    }, {
                        "custom_field_id": "64b7eda36ea9c8000c03efa8", // quantidade de pets
                        "value": pet.length
                    }, {
                        "custom_field_id": "64b7edb9f217510019a64bc5", // porte de pets
                        "value": pet.toString()
                    },{
                        "custom_field_id": "64b94d33862444000e56696e", // status orçamento
                        "value": "em andamento"
                    }]
                },
            }, {
                params: {token: user.token_rd}
            });
            return response.json(axiosResponse.data);
        } catch (e) {
            console.log(e);
            return response.status(400).json({msg: "error", debug: e});
        }

    }

    async getDeal(request: Request, response: Response) {
        const {deal_id} = request.body;
        const user = request.user;
        try {
            const axiosResponse = await rdApi.get(`/deals/${deal_id}`, {
                params: {token: user.token_rd}
            });
            return response.json(axiosResponse.data)
        } catch (e) {
            console.log(e);
            return response.status(400).json({msg: "error", debug: e});
        }

    }


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
                }, 3000)
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