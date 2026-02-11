import httpClient from "../httpClient";
import { ENDP_ORDER } from "../URLs";
import { IOrder } from "./order.model";

export const orderRequest = {
    getAll: async () => {
        const response = await httpClient.get<{ data: IOrder[]; ok: boolean }>(ENDP_ORDER);
        return response.data;
    },
    updateStatus: async (id: number, status: string) => {
        const response = await httpClient.patch<{ data: IOrder; ok: boolean }>(`/order/${id}/status`, { status });
        return response.data;
    }
};
