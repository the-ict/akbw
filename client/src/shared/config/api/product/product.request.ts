import httpClient from "../httpClient"
import { ENDP_PRODUCT } from "../URLs"
import { IProductListResponse, IProductFilters } from "./product.model";

export const getProductsRequest = async (params: IProductFilters = {}): Promise<IProductListResponse> => {
    return (await httpClient.get(ENDP_PRODUCT, { params })).data;
}
