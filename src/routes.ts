import express from "express";
import {RDController} from "./controllers/RdStation/RDController";

const routes = express.Router();

const rd = new RDController();




routes.post("/rd/get_a_deal", rd.getDeal)
routes.post("/rd/delete_product", rd.deleteProduct)
routes.post("/rd/add_product", rd.addProduct)
routes.post("/rd/change_stage", rd.changeStage)
routes.post("/rd/sendForm", rd.getFormSendRd);



// routes.post("/pipedrive", changeDeal.handle);
export default routes;
