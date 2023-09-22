import express from "express";
import {RDController} from "./controllers/RdStation/RDController";
import {ChatGuruController} from "./controllers/ChatGuru/ChatGuruController";
import {ClickToCallMe} from "./controllers/ClickToCallMe/ClickToCallMe";

const routes = express.Router();

const rd = new RDController();
const cg = new ChatGuruController();
const callMe = new ClickToCallMe();


routes.get("/api-nodejs", (req,res) => {
    res.send("unit ok")
})
routes.post("/api-nodejs/sendForm", rd.getFormSendRd);
routes.post("/api-nodejs/chat-start", cg.initialMessage);
routes.get('/api-nodejs/click-to-call-me/:number', callMe.handle)
routes.get('/api-nodejs/click-to-call-me/:number', callMe.chatGuru)








// routes.post("/pipedrive", changeDeal.handle);
export default routes;
