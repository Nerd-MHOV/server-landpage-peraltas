import axios from "axios"
import { rdstationConfig} from "../config/rdstationConfig";
import {Opportunity, OpportunityParams} from "./rdStationsService.types";
import {BadRequestError} from "../helpers/api-errors";

const { token, apiUrl } = rdstationConfig;

const api = axios.create({
    baseURL: apiUrl,
    params: {
        token: token
    }
})

async function getOpportunities(params: OpportunityParams): Promise<Opportunity> {
    const queryParameters = {
        page: params.page,
        limit: params.limit || 200,
        order: params.order || 'created_at',
        direction: params.direction || 'desc',
        name: params.name || undefined,
        win: params.win || undefined,
        user_id: params.user_id || undefined,
        closed_at: params.closed_at || undefined,
        closed_at_period: params.closed_at_period || undefined,
        created_at_period: params.created_at_period || undefined,
        prediction_date_period: params.prediction_date_period || undefined,
        start_date: params.start_date || undefined,
        end_date: params.end_date || undefined,
        campaign_id: params.campaign_id || undefined,
        deal_stage_id: params.deal_stage_id || undefined,
        deal_lost_reason_id: params.deal_lost_reason_id || undefined,
        deal_pipeline_id: params.deal_pipeline_id || undefined,
        organization: params.organization || undefined,
        hold: params.hold || undefined,
        product_presence: params.product_presence || undefined,
    }
    try{
        const response = await api.get("/deals", {
            params
        })

        return response.data
    } catch (error) {
        console.error("Error ao obter as oportunidades do RD Stations:", error);
        throw error
    }
}

export {
    getOpportunities
};