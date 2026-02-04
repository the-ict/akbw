import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

export const useProducts = (params?: api.GetProductsParams) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => api.getProducts(params),
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => api.getProductById(id),
        enabled: !!id,
    });
};

export const useCategories = (q?: string) => {
    return useQuery({
        queryKey: ['categories', q],
        queryFn: () => api.getCategories(q),
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, name }: { id: number, name: string }) => api.updateCategory(id, name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useSizes = () => {
    return useQuery({
        queryKey: ['sizes'],
        queryFn: api.getSizes,
    });
};

export const useColors = () => {
    return useQuery({
        queryKey: ['colors'],
        queryFn: api.getColors,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.updateProduct,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ['products', data.id] });
            }
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};
