import httpClient from "../httpClient";
import { ENDP_USERS } from "../URLs";

export const getUsers = async () => {
    return (await httpClient.get(ENDP_USERS)).data;
};