import { getCategories } from '@/features/product/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });
};
