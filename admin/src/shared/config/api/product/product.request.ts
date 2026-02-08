import httpClient from "../httpClient"
import {
    ENDP_PRODUCT_CATEGORIES_CREATE,
    ENDP_PRODUCT_CREATE,
    ENDP_PRODUCT,
    ENDP_PRODUCT_SIZES,
    ENDP_PRODUCT_COLORS
} from "../URLs"


import {
    ICreateCategory,
    ICreateProduct,
    IUpdateProduct,
    ICategory,
    IProductListResponse,
    IProductFilters
} from "./product.modal";



export const createProductRequest = async (product: ICreateProduct) => {
    return (await httpClient.post(ENDP_PRODUCT_CREATE, product)).data;
};

export const getProductsRequest = async (params: IProductFilters): Promise<IProductListResponse> => {
    return (await httpClient.get(ENDP_PRODUCT, { params })).data;
}

export const deleteProductRequest = async (id: number) => {
    return await httpClient.delete(`${ENDP_PRODUCT}/${id}`)
}


export const updateProductRequest = async (product: IUpdateProduct) => {
    return (await httpClient.put(ENDP_PRODUCT_CREATE, product)).data;
}

export const createCategoriesRequest = async (category: ICreateCategory) => {
    return await httpClient.post(ENDP_PRODUCT_CATEGORIES_CREATE, category)
}

export const updateCategoriesRequest = async (category: Partial<ICreateCategory> & { id: number }) => {
    return await httpClient.put(`${ENDP_PRODUCT_CATEGORIES_CREATE}/${category.id}`, category)
}

export const getCategoriesRequest = async (q?: string): Promise<ICategory[]> => {
    return (await httpClient.get(ENDP_PRODUCT_CATEGORIES_CREATE, { params: { q } })).data;
}

export const getCategoryByIdRequest = async (id: number): Promise<any> => {
    return (await httpClient.get(`${ENDP_PRODUCT_CATEGORIES_CREATE}/${id}`)).data;
}

export const deleteCategoriesRequest = async (id: number) => {
    return await httpClient.delete(`${ENDP_PRODUCT_CATEGORIES_CREATE}/${id}`)
}

export const getSizesRequest = async (): Promise<any[]> => {
    return (await httpClient.get(ENDP_PRODUCT_SIZES)).data;
}

export const getColorsRequest = async (): Promise<any[]> => {
    return (await httpClient.get(ENDP_PRODUCT_COLORS)).data;
}