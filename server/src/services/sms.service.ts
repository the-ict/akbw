import axios from "axios";
import { sendSms } from "../config/telegram";

const telegramSms = async (text: string, chatId?: string) => {
    try {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const targetChatId = chatId || process.env.TELEGRAM_CHAT_ID;

        if (!token || !targetChatId) {
            console.error("Telegram credentials missing in environment variables");
            return;
        }

        await axios(sendSms(token, targetChatId, text));
    } catch (error) {
        console.error("Telegram SMS service error:", error);
        throw new Error("Something went wrong with sms service")
    }
}

export { telegramSms };