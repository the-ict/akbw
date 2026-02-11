import httpClient from "../httpClient";
import { IUser, IUpdateUserRequest } from "./user.model";

export const userRequest = {
    getMe: async () => {
        const response = await httpClient.get<{ data: IUser; ok: boolean }>("/user/me");
        return response.data;
    },
    updateProfile: async (data: IUpdateUserRequest) => {
        const response = await httpClient.put<{ message: string; data: IUser; ok: boolean }>("/user/me", data);
        return response.data;
    }
};
