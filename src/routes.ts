import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { isAdmin } from "./middlewares/isAdmin";
import {RDController} from "./controllers/RdStation/RDController";
import {RoutinesAutomations} from "./controllers/RoutinesAutomations/RoutinesAutomations";

const routes = express.Router();

const rd = new RDController();
const routinesAutomations = new RoutinesAutomations();



routes.get("/routines/opportunities", routinesAutomations.getOpportunities)
routes.get("/routines/assist-opportunities", routinesAutomations.assistOpportunities)


routes.use(authMiddleware);

routes.post("/rd/get_a_deal", rd.getDeal)
routes.post("/rd/delete_product", rd.deleteProduct)
routes.post("/rd/add_product", rd.addProduct)
routes.post("/rd/change_stage", rd.changeStage)



// routes.post("/pipedrive", changeDeal.handle);
export default routes;
