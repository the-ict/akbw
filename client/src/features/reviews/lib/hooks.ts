import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createReviewRequest, getProductReviewsRequest } from '@/shared/config/api/review/review.request';
import { ICreateReviewRequest } from '@/shared/config/api/review/review.model';

export const useProductReviews = (productId: number, page: number = 1, limit: number = 10) => {
    return useQuery({
        queryKey: ['reviews', productId, page, limit],
        queryFn: () => getProductReviewsRequest(productId, page, limit),
        enabled: !!productId,
    });
};

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ICreateReviewRequest) => createReviewRequest(data),
        onSuccess: (_, variables) => {
            // Invalidate reviews query for the product
            queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
        },
    });
};
