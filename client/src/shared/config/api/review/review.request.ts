import httpClient from "../httpClient"
import { ENDP_REVIEW } from "../URLs"
import { IReviewListResponse, ICreateReviewRequest, IReview } from "./review.model";

export const createReviewRequest = async (data: ICreateReviewRequest): Promise<IReview> => {
    return (await httpClient.post(ENDP_REVIEW, data)).data;
}

export const getProductReviewsRequest = async (productId: number, page: number = 1, limit: number = 10): Promise<IReviewListResponse> => {
    return (await httpClient.get(`${ENDP_REVIEW}/product/${productId}`, { params: { page, limit } })).data;
}
