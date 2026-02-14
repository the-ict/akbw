import httpClient from '../httpClient';
import { ENDP_PRODUCT, ENDP_STYLE } from '../URLs';
import { useQuery } from '@tanstack/react-query';
import {
  IProductListResponse,
  IProductFilters,
  IProduct,
  IRecommendedProductsResponse,
} from './product.model';
import { IStyle } from './style.model';

export const getProductsRequest = async (
  params: IProductFilters = {},
): Promise<IProductListResponse> => {
  return (await httpClient.get(ENDP_PRODUCT, { params })).data;
};

export const getProductByIdRequest = async (
  id: string | number,
): Promise<IProduct> => {
  return (await httpClient.get(`${ENDP_PRODUCT}/${id}`)).data;
};

export const getRecommendedProductsRequest =
  async (): Promise<IRecommendedProductsResponse> => {
    return (await httpClient.get(`${ENDP_PRODUCT}/recommended/all`)).data;
  };

export const getStylesRequest = async (): Promise<{
  ok: boolean;
  data: IStyle[];
}> => {
  return (await httpClient.get(`${ENDP_STYLE}`)).data;
};
