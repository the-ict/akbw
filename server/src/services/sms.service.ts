import axios from "axios";
import { sendSms } from "../config/telegram";

const token = "8565589355:AAF-MfPKkaM0dWd0lEwlkWelh2SSCmLwy9g";
const chat_id = "6299965585";

const telegramSms = async (text: string) => {
    try {
        await axios(sendSms(token, chat_id, text));
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong with sms service")
    }
}

export { telegramSms };