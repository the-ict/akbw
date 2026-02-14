import httpClient from '../httpClient';
import { ENDP_REVIEW } from '../URLs';
import {
  IReviewListResponse,
  ICreateReviewRequest,
  IReview,
} from './review.model';

export const createReviewRequest = async (
  data: ICreateReviewRequest,
): Promise<IReview> => {
  return (await httpClient.post(ENDP_REVIEW, data)).data;
};

export const getProductReviewsRequest = async (
  productId: number,
  page: number = 1,
  limit: number = 10,
): Promise<IReviewListResponse> => {
  console.log('product-id: ', productId);
  return (
    await httpClient.get(`${ENDP_REVIEW}/product/${productId}`, {
      params: { page, limit },
    })
  ).data;
};

export const deleteReviewRequest = async (reviewId: number): Promise<void> => {
  await httpClient.delete(`${ENDP_REVIEW}/${reviewId}`);
};

export const updateReviewRequest = async (
  reviewId: number,
  data: ICreateReviewRequest,
): Promise<IReview> => {
  return (await httpClient.put(`${ENDP_REVIEW}/${reviewId}`, data)).data;
};

export const getTopReviewsRequest = async (): Promise<{
  data: IReview[];
  ok: boolean;
}> => {
  return (await httpClient.get(`${ENDP_REVIEW}/top`)).data;
};
