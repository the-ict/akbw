import httpClient from "../httpClient";
import { ENDP_NOTIFICATION } from "../URLs";

export interface INotification {
    id: number;
    title: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateNotificationRequest {
    title: string;
    message: string;
}

export const notificationRequest = {
    getNotifications: async () => {
        const response = await httpClient.get<{ data: INotification[], ok: boolean }>(ENDP_NOTIFICATION);
        return response.data;
    },
    createNotification: async (data: ICreateNotificationRequest) => {
        const response = await httpClient.post<{ message: string, data: INotification, ok: boolean }>(ENDP_NOTIFICATION, data);
        return response.data;
    },
    deleteNotification: async (id: number) => {
        const response = await httpClient.delete<{ message: string, ok: boolean }>(`${ENDP_NOTIFICATION}/${id}`);
        return response.data;
    }
};
