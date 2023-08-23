import express from "express";
import {RDController} from "./controllers/RdStation/RDController";
import {ChatGuruController} from "./controllers/ChatGuru/ChatGuruController";

const routes = express.Router();

const rd = new RDController();
const cg = new ChatGuruController();


routes.get("/api-nodejs", (req,res) => {
    res.send("unit ok")
})
routes.post("/api-nodejs/sendForm", rd.getFormSendRd);
routes.post("/api-nodejs/chat-start", cg.initialMessage);



// routes.post("/pipedrive", changeDeal.handle);
export default routes;
