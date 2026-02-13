import httpClient from "../httpClient";
import {
    HelpChatRequest,
    HelpChatMessageRequest,
    AskChatRequest,
    AskChatMessageRequest,
    HelpChat,
    AskChat
} from "./profile.model";

export const createHelpChat = async (data: HelpChatRequest) => {
    const response = await httpClient.post<HelpChat>("/chat", data);
    return response.data;
}

export const getHelpChat = async () => {
    const response = await httpClient.get<HelpChat>("/chat/help-chat");
    return response.data;
}

export const sendHelpMessage = async (data: HelpChatMessageRequest) => {
    const response = await httpClient.post("/chat/help-chat-message", data);
    return response.data;
}

export const createAskChat = async (data: AskChatRequest) => {
    const response = await httpClient.post<AskChat>("/chat/ask-for-product-chat", data);
    return response.data;
}

export const getAskChat = async () => {
    const response = await httpClient.get<AskChat>("/chat/ask-for-product-chat");
    return response.data;
}

export const sendAskMessage = async (data: AskChatMessageRequest) => {
    const response = await httpClient.post("/chat/ask-for-product-message", data);
    return response.data;
}