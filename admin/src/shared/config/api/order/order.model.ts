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
    },
    coupon?: {
        id: number;
        code: string;
        discount: number;
    }
}
