import { useQuery } from '@tanstack/react-query';
import { getProductsRequest, getProductByIdRequest, getRecommendedProductsRequest } from '@/shared/config/api/product/product.request';
import { IProductFilters } from '@/shared/config/api/product/product.model';

export const useProducts = (params: IProductFilters = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProductsRequest(params),
    });
};

export const useProduct = (id: string | number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductByIdRequest(id),
        enabled: !!id,
    });
};

export const useRecommendedProducts = () => {
    return useQuery({
        queryKey: ['recommended-products'],
        queryFn: () => getRecommendedProductsRequest(),
    });
};

