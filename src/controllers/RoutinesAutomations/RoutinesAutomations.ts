import {Request, Response} from "express";
import {getOpportunities} from "../../services/rdstationService";
import {assistOpportunity} from "../../helpers/assistOpportunity";

export class RoutinesAutomations {
    async getOpportunities (request: Request, response: Response) {
        const opportunities = await getOpportunities({});
        return response.json(opportunities);
    }

    async assistOpportunities (request: Request, response: Response) {
        const {has_change} = await assistOpportunity()
        return response.json(has_change ? "I found changes" : "All is ok")
    }
}