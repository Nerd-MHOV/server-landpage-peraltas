import {Dialog} from "../services/chatguru/Dialog";

interface DataProps {
    data: {
        number: string,
        dialog_id?: string,
    }
}
export default {
    key: "SendFirstMessageChatGuru",
    options: {
        attempts: 3,
        backoff: {
            type: "fixed",
            delay: 180000
        }
    },
    async handle({data: {number, dialog_id = "64e6049402c43618f156d736"
    } }: DataProps ) {
        await Dialog(number, "64e6049402c43618f156d736")
        console.log(number, dialog_id);
        console.log("__________________________")
    }
}