export interface IOrder {
    id: number;
    user_id: string;
    orderItems: IOrderItem[];
    total_price: number;
    status: 'review' | 'approved' | 'paid' | 'delivering' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    user?: {
        name: string;
        lastName: string;
        phone: string;
    }
}

export interface IOrderItem {
    id: number;
    productId: number;
    sizeId?: number;
    colorId?: number;
    quantity: number;
    price: number;
    product?: any;
    size?: any;
    color?: any;
}

export interface ICreateOrderRequest {
    items: {
        productId: number;
        sizeId?: number | null;
        colorId?: number | null;
        quantity: number;
    }[];
    total_price: number;
    coupon_id?: number;
    coupon_code?: string;
}
