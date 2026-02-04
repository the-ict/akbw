import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

export const useAdmins = () => {
    return useQuery({
        queryKey: ['admins'],
        queryFn: api.getAdmins,
    });
};

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.createAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
    });
};

export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...admin }: { id: number } & Partial<api.CreateAdminDto>) => api.updateAdmin(id, admin),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
    });
};

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.deleteAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admins'] });
        },
    });
};
