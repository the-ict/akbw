import { useQuery } from '@tanstack/react-query';
import { getProductsRequest } from '@/shared/config/api/product/product.request';
import { IProductFilters } from '@/shared/config/api/product/product.model';

export const useProducts = (params: IProductFilters = {}) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProductsRequest(params),
    });
};
