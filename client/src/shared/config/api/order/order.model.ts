export interface IOrder {
    id: number;
    user_id: string;
    items: number[];
    total_price: number;
    status: 'review' | 'approved' | 'delivering' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    user?: {
        name: string;
        lastName: string;
        phone: string;
    }
}

export interface ICreateOrderRequest {
    items: number[];
    total_price: number;
    coupon_id?: number;
    coupon_code?: string;
}
