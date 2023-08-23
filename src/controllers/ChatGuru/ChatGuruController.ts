import {Request, Response} from "express";
import CreateContact from "../../services/chatguru/CreateContact";
import {Sleep} from "../../services/chatguru/Sleep";
import {editContext} from "../../services/chatguru/EditContext";
import {Dialog} from "../../services/chatguru/Dialog";

export class ChatGuruController {
    async initialMessage(request: Request, response: Response) {
        const {number, name} = request.body;

        if(!number || !name) return response.json("incorrect params").status(501);

        const contact = await CreateContact(number, name);
        await Sleep(1000);
        await editContext(number, "&var__Entrada_brotaseco=true")
        await Sleep( 1000);
        const dialogResponse = await Dialog(number, "64e6049402c43618f156d736")

        return response.json(dialogResponse);
    }
}