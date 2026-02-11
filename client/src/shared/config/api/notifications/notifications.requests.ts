import httpClient from "../httpClient";
import { ENDP_NOTIFICATIONS } from "../URLs";
import { NotificationResponse } from "./notifications.model";

export const getNotifications = async (): Promise<NotificationResponse> => {
    return (await httpClient.get(ENDP_NOTIFICATIONS)).data;
};