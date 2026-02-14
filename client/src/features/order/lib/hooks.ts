import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { orderRequest } from '@/shared/config/api/order/order.request';
import { ICreateOrderRequest } from '@/shared/config/api/order/order.model';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => orderRequest.getAll(),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateOrderRequest) => orderRequest.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
