const sendSms = (botToken: string, chatId: string, text: string) => {
    return `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`;
};

export {
    sendSms
}