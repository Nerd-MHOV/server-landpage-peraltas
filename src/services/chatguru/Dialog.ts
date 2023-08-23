import axios from "axios";
import config from "../../config/chatGuruConfig"

export async function Dialog(
    number:string,
    dialog_id = "64ae9dc9b2af1dec7a14c7fb",
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id
) {
    console.log("dialog");
    return (await axios.post(
        `https://s12.chatguru.app/api/v1?key=${key}&account_id=${account_id}&phone_id=${phone_id}&chat_number=${number}&action=dialog_execute&dialog_id=${dialog_id}`
    )).data;
}
