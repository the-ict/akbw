export interface IReview {
    id: number;
    rating: number;
    comment: string;
    userName: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
}

export interface IReviewListResponse {
    data: IReview[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ICreateReviewRequest {
    rating: number;
    comment: string;
    product_id: string | number;
};