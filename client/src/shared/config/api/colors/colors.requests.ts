import httpClient from "../httpClient";
import { ENDP_COLORS } from "../URLs";
import { IColor } from "../product/product.model";

export const getColors = async (): Promise<IColor[]> => {
    return (await httpClient.get(ENDP_COLORS)).data;
};