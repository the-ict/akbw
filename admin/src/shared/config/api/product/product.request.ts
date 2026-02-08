import httpClient from "../httpClient"
import { ENDP_PRODUCT_CREATE } from "../URLs"
import { ICreateProduct, IUpdateProduct } from "./product.modal";

export const createProductRequest = async (product: ICreateProduct) => {
    return (await httpClient.post(ENDP_PRODUCT_CREATE, product)).data;
};

export const updateProductRequest = async (product: IUpdateProduct) => {
    return (await httpClient.put(ENDP_PRODUCT_CREATE, product)).data;
}