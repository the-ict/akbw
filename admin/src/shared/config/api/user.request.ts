import httpClient from "./httpClient";
import { ENDP_USERS } from "./URLs";

export const getUsers = async () => {
    const response = await httpClient.get(ENDP_USERS);
    return response.data;
};
