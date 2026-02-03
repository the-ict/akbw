import httpClient from "../httpClient";
import {
    ENDP_SEND_SMS,
    ENDP_VERIFY_SMS
} from "../URLs";

export const sendSms = (phone: string) => {
    return httpClient.post(ENDP_SEND_SMS, { phone });
}

export const verifySms = (phone: string, code: string) => {
    return httpClient.post(ENDP_VERIFY_SMS, {
        phone: phone,
        code: code,
    })
};