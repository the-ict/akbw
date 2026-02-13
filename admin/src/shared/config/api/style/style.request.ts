import httpClient from "../httpClient";
import { ENDP_STYLE } from "../URLs";
import { IStyle, ICreateStyle } from "./style.model";

export const getStylesRequest = async (): Promise<{ ok: boolean, data: IStyle[] }> => {
    return (await httpClient.get(ENDP_STYLE)).data;
};

export const createStyleRequest = async (data: ICreateStyle): Promise<{ ok: boolean, message: string, data: IStyle }> => {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("categoryId", data.categoryId.toString());

    return (await httpClient.post(ENDP_STYLE, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })).data;
};

export const deleteStyleRequest = async (id: number): Promise<{ ok: boolean, message: string }> => {
    return (await httpClient.delete(`${ENDP_STYLE}/${id}`)).data;
};
