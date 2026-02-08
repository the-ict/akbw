import httpClient from "../httpClient"
import {
    ENDP_PRODUCT_CATEGORIES_CREATE,
    ENDP_PRODUCT_CREATE
} from "../URLs"
import {
    ICreateCategory,
    ICreateProduct,
    IUpdateProduct
} from "./product.modal";

export const createProductRequest = async (product: ICreateProduct) => {
    return (await httpClient.post(ENDP_PRODUCT_CREATE, product)).data;
};

export const updateProductRequest = async (product: IUpdateProduct) => {
    return (await httpClient.put(ENDP_PRODUCT_CREATE, product)).data;
}

export const createCategoriesRequest = async (category: ICreateCategory) => {
    return await httpClient.post(ENDP_PRODUCT_CATEGORIES_CREATE, category)
}

export const updateCategoriesRequest = async (category: Partial<ICreateCategory>) => {
    return await httpClient.put(ENDP_PRODUCT_CATEGORIES_CREATE, category)
}