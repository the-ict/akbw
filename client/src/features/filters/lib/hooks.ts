import { useQuery } from "@tanstack/react-query";
import { getColors, getSizes } from "@/features/product/lib/api";
import { getProductsRequest } from "@/shared/config/api/product/product.request";
import { IProductFilters } from "@/shared/config/api/product/product.model";

export const useColors = () => {
    return useQuery({
        queryKey: ["colors"],
        queryFn: getColors,
    })
};

export const useSizes = () => {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: getSizes,
    })
};

export const useProducts = (filters: IProductFilters) => {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => getProductsRequest(filters),
    })
};