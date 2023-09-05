import express from "express";
import routes from "./routes";
import cors from "cors";
import morgan from "morgan"
import Queue from "./lib/Queue";
import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter} from "@bull-board/api/bullAdapter";
import queue from "./lib/Queue";


require("dotenv").config();

const app = express();
const port = process.env.PORT_SERVER || 3333;

//bull-board
const basePath = '/api-nodejs/bull/dashboard';
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(basePath);
createBullBoard({
    serverAdapter,
    queues: Queue.queues.map(queue => new BullAdapter(queue.bull)),
    options: {
        uiConfig: {
            boardTitle: "Grupo Peraltas",
        }
    }
})


//cors
const whiteList = [
    "http://localhost:5173",
    "http://192.168.99.105:5173",
    "http://localhost:4173",
    "http://192.168.10.87:81",
    "http://localhost:81",
    "http://192.168.10.87:3333",
    "https://www.whatsapp.brotasecoresort.com.br",
];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || whiteList.indexOf(origin) !== -1) callback(null, true);
            else callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(morgan("dev"))
app.use(routes);
app.use(basePath, serverAdapter.getRouter());


//app.use(errorMiddleware);
app.listen(3333, () => {
    console.log("Server is running in " + port);
});
