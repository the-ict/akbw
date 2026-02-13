import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getStylesRequest,
    createStyleRequest,
    deleteStyleRequest
} from "@/shared/config/api/style/style.request";
import { toast } from "sonner";

export const useStyles = () => {
    return useQuery({
        queryKey: ["styles"],
        queryFn: getStylesRequest
    });
};

export const useCreateStyle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStyleRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["styles"] });
            toast.success("Style yaratildi");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Style yaratishda xatolik yuz berdi");
        }
    });
};

export const useDeleteStyle = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStyleRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["styles"] });
            toast.success("Style o'chirildi");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "O'chirishda xatolik yuz berdi");
        }
    });
};
