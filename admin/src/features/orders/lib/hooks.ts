import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderRequest } from "@/shared/config/api/order/order.request";

export const useOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => orderRequest.getAll(),
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => orderRequest.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
};
