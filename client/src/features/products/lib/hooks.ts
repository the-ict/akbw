import { getProductsRequest, getProductByIdRequest, getRecommendedProductsRequest, getStylesRequest } from '@/shared/config/api/product/product.request';
import { IProductFilters } from '@/shared/config/api/product/product.model';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (params: IProductFilters = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProductsRequest(params),
    });
};

export const useProduct = (id: string | number) => {
    return useQuery({
        queryKey: ['product'],
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

export const useStyles = () => {
    return useQuery({
        queryKey: ['styles'],
        queryFn: () => getStylesRequest(),
    });
};

