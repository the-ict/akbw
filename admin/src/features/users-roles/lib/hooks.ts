import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdminRequest, deleteAdminRequest, getAdminsRequest } from "@/shared/config/api/admin/admin.request";
import { toast } from "sonner";

export const useAdmins = () => {
    return useQuery({
        queryKey: ["admins"],
        queryFn: getAdminsRequest
    });
};

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAdminRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Admin yaratishda xatolik yuz berdi");
        }
    });
};

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAdminRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            toast.success("Admin o'chirildi");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "O'chirishda xatolik yuz berdi");
        }
    });
};
