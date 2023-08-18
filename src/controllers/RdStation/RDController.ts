import {Request, Response} from "express";
import axios from "axios";

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
}