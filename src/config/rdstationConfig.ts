import dotenv from "dotenv";

dotenv.config();
export const rdstationConfig = {
    token: process.env.RD_TOKEN,
    apiUrl: process.env.RD_API_URL,
}