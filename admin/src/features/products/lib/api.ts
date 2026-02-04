import httpClient from '@/shared/config/api/httpClient';
import {
    ENDP_PRODUCT,
    ENDP_PRODUCT_CATEGORIES,
    ENDP_PRODUCT_SIZES,
    ENDP_PRODUCT_COLORS
} from '@/shared/config/api/URLs';

export interface LocalizedString {
    uz: string;
    ru: string;
    en: string;
}

export interface Category {
    id: number;
    name: LocalizedString;
}

export interface Size {
    id: number;
    name: string;
}

export interface Color {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: LocalizedString;
    price: number;
    product_images: string[];
    categories: Category[];
    sizes: Size[];
    colors: Color[];
}

export interface CreateProductDto {
    name: LocalizedString;
    price: number;
    product_images: string[];
    category_id: number[];
    size_id: number[];
    color_id: number[];
}

export interface ProductResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface GetProductsParams {
    q?: string;
    category_id?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export const getProducts = async (params?: GetProductsParams): Promise<ProductResponse> => {
    const { data } = await httpClient.get(ENDP_PRODUCT, { params });
    return data;
};

export const getProductById = async (id: number): Promise<Product> => {
    const { data } = await httpClient.get(`${ENDP_PRODUCT}/${id}`);
    return data;
};

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
    const { data } = await httpClient.post(ENDP_PRODUCT, product);
    return data.product;
};

export const updateProduct = async ({ id, ...product }: Partial<CreateProductDto> & { id: number }): Promise<Product> => {
    const { data } = await httpClient.put(`${ENDP_PRODUCT}/${id}`, product);
    return data.product;
};

export const deleteProduct = async (id: number): Promise<void> => {
    await httpClient.delete(`${ENDP_PRODUCT}/${id}`);
};

export const getCategories = async (q?: string): Promise<Category[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_CATEGORIES, { params: { q } });
    return data;
};

export const createCategory = async (name: LocalizedString): Promise<Category> => {
    const { data } = await httpClient.post(ENDP_PRODUCT_CATEGORIES, { name });
    return data.category;
};

export const updateCategory = async (id: number, name: LocalizedString): Promise<Category> => {
    const { data } = await httpClient.put(`${ENDP_PRODUCT_CATEGORIES}/${id}`, { name });
    return data.category;
};

export const deleteCategory = async (id: number): Promise<void> => {
    await httpClient.delete(`${ENDP_PRODUCT_CATEGORIES}/${id}`);
};

export const getSizes = async (): Promise<Size[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_SIZES);
    return data;
};

export const getColors = async (): Promise<Color[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_COLORS);
    return data;
};
