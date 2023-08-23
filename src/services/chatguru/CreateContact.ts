import config from "../../config/chatGuruConfig"
import axios from "axios";

async function createContact(
    number: string,
    name: string,
    user_id = "6107ec20ba62219844e717ec",
    key = config.key,
    account_id = config.account_id,
    phone_id = config.phone_id
) {
    console.log("create contact", number);
    return (await axios.post(
        `https://s12.chatguru.app/api/v1?key=${key}&account_id=${account_id}&phone_id=${phone_id}&chat_number=${number}&action=chat_add&name=${name}&text= &user_id=${user_id}`
    )).data;
}

export default createContact;
