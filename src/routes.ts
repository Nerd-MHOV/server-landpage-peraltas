import express from "express";
import {RDController} from "./controllers/RdStation/RDController";

const routes = express.Router();

const rd = new RDController();



routes.get("/api-nodejs", (req,res) => {
    res.send("unit ok")
})
routes.post("/api-nodejs/sendForm", rd.getFormSendRd);




// routes.post("/pipedrive", changeDeal.handle);
export default routes;
