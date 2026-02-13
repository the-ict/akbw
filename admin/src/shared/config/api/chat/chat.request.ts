import httpClient from "../httpClient";

export const getAllHelpChats = async () => {
    const response = await httpClient.get("/chat/admin/help-chats");
    return response.data;
}

export const sendAdminHelpMessage = async (data: { chat_id: number, message: string }) => {
    const response = await httpClient.post("/chat/admin/help-chat-message", data);
    return response.data;
}

export const getAllAskForChats = async () => {
    const response = await httpClient.get("/chat/admin/ask-for-product-chats");
    return response.data;
}

export const sendAdminAskMessage = async (data: { chat_id: number, message: string }) => {
    const response = await httpClient.post("/chat/admin/ask-for-product-message", data);
    return response.data;
}
