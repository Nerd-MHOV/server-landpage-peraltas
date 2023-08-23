import axios from "axios";
import config from "../../config/chatGuruConfig"

export async function editContext(
    number: string,
    context: string,
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id
) {
    console.log("context to:", number);
    // &var__context=context;
    return (await axios.post(
        `https://s12.chatguru.app/api/v1?key=${key}&account_id=${account_id}&phone_id=${phone_id}&chat_number=${number}&action=chat_update_context${context}`
    )).data;
}
