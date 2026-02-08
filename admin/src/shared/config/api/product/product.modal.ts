interface IProductTranslation {
    name: string;
    description: string;
    lang: string;
}

export interface ICreateProduct {
    price: number;
    product_images: string[];
    categories: number[];
    sizes: number[];
    colors: number[];
    translations: IProductTranslation[];
};


export interface ICreateCategoryTranslation {
    name: string;
    lang: string;
}

export interface ICreateCategory {
    translations: ICreateCategoryTranslation[];
};


export type IUpdateProduct = Partial<ICreateProduct>;

export interface ICategory {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    product_images: string[];
    categories: ICategory[];
    sizes: any[];
    colors: any[];
    createdAt: string;
    updatedAt: string;
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