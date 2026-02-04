import httpClient from "../httpClient";
import {
    ENDP_LOGIN,
    ENDP_REGISTER
} from "../URLs";
import type {
    LoginRequest,
    RegisterRequest
} from "./auth.model";

export const login = (data: LoginRequest) => {
    return httpClient.post(ENDP_LOGIN, data);
}

export const register = (data: RegisterRequest) => {
    return httpClient.post(ENDP_REGISTER, data);
};