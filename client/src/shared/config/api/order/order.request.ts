import httpClient from "../httpClient";
import { ICreateOrderRequest, IOrder } from "./order.model";

export const orderRequest = {
    create: async (data: ICreateOrderRequest) => {
        const response = await httpClient.post<{ data: IOrder; ok: boolean }>('/order', data);
        return response.data;
    },
    getAll: async () => {
        const response = await httpClient.get<{ data: IOrder[]; ok: boolean }>('/order');
        return response.data;
    }
};
