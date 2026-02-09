interface IProductTranslation {
    name: string;
    description: string;
    lang: string;
}

export interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISize {
    id: number;
    name: string;
}

export interface IColor {
    id: number;
    name: string;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    product_images: string[];
    categories: ICategory[];
    sizes: ISize[];
    colors: IColor[];
    createdAt: string;
    updatedAt: string;
    rating: number;
    discount: number;
}

export interface IProductListResponse {
    data: IProduct[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface IProductFilters {
    page?: number;
    limit?: number;
    q?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
