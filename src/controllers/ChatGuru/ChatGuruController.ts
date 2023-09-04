import {Request, Response} from "express";
import {Sleep} from "../../services/chatguru/Sleep";
import Queue from '../../lib/Queue'
export class ChatGuruController {
    async initialMessage(request: Request, response: Response) {
        const {number, name} = request.body;

        if(!number || !name) return response.json("incorrect params").status(501);

        console.log("bateu aqui")
        Queue.add('CreateAContactChatGuru', { number, name })
        await Sleep(1000);
        Queue.add('SendFirstMessageChatGuru', { number })

        return response.json("Number include in list to start-message");
    }
}