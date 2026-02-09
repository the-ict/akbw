interface IUser {
    id: string;
    phone: string;
    name: string;
    lastName: string;
    gender: string;
    profile_picture: string;
    createdAt: string;
    updatedAt: string;
}

export interface IReview {
    id: number;
    rating: number;
    comment: string;
    product_id: number;
    user: IUser;
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