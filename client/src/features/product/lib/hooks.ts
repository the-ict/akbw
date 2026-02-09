import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './api';
import { deleteReviewRequest } from '@/shared/config/api/review/review.request';

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: api.getProducts,
    });
};

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => api.getProductById(id),
        enabled: !!id,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: api.getCategories,
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
            queryClient.invalidateQueries({ queryKey: ['products', data.id] });
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

export const useDeleteReviewMutation = (reviewId: number) => {
    return useMutation({
        mutationKey: ["delete-review"],
        mutationFn: () => deleteReviewRequest(reviewId)
    })
};