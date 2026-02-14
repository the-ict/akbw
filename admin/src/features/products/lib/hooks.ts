import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getProductsRequest,
    createProductRequest,
    updateProductRequest,
    deleteProductRequest
} from '@/shared/config/api/product/product.request';
import type { ICreateProduct, IProductFilters } from '@/shared/config/api/product/product.model';
import { toast } from 'sonner';

export const useProducts = (params: IProductFilters) => {
    return useQuery({
        queryKey: ['products', params],
        queryFn: () => getProductsRequest(params),
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: ICreateProduct) => createProductRequest(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Mahsulot muvaffaqiyatli yaratildi');
        },
        onError: () => {
            toast.error('Mahsulot yaratishda xatolik yuz berdi');
        }
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (product: { id: number } & Partial<ICreateProduct>) => updateProductRequest(product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Mahsulot muvaffaqiyatli yangilandi');
        },
        onError: () => {
            toast.error('Mahsulot yangilashda xatolik yuz berdi');
        }
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProductRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Mahsulot muvaffaqiyatli o‘chirildi');
        },
        onError: () => {
            toast.error('Mahsulot o‘chirishda xatolik yuz berdi');
        }
    });
};
