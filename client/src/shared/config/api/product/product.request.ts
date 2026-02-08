import httpClient from "../httpClient"
import { ENDP_PRODUCT } from "../URLs"
import { IProductListResponse, IProductFilters, IProduct } from "./product.model";

export const getProductsRequest = async (params: IProductFilters = {}): Promise<IProductListResponse> => {
    return (await httpClient.get(ENDP_PRODUCT, { params })).data;
}

export const getProductByIdRequest = async (id: string | number): Promise<IProduct> => {
    return (await httpClient.get(`${ENDP_PRODUCT}/${id}`)).data;
}

