import CreateContact from "../services/chatguru/CreateContact";

interface DataProps {
    data: {
        number: string,
        name: string,
    }
}
export default {
    key: "CreateAContactChatGuru",
    options: {
        attempts: 2,
        backoff: {
            type: "fixed",
            delay: 10000
        }
    },
    async handle({ data }: DataProps) {
        const {number, name} = data;
        await CreateContact(number, name);
        console.log(number, name);
        console.log("__________________________")
    }
}