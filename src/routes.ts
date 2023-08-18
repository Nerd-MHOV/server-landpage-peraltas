import express from "express";
import {RDController} from "./controllers/RdStation/RDController";

const routes = express.Router();

const rd = new RDController();



routes.get("/api-nodejs", (req,res) => {
    res.send("unit ok")
})
routes.post("/api-nodejs/get_a_deal", rd.getDeal)
routes.post("/api-nodejs/delete_product", rd.deleteProduct)
routes.post("/api-nodejs/add_product", rd.addProduct)
routes.post("/api-nodejs/change_stage", rd.changeStage)
routes.post("/api-nodejs/sendForm", rd.getFormSendRd);



// routes.post("/pipedrive", changeDeal.handle);
export default routes;
