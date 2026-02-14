import httpClient from '@/shared/config/api/httpClient';
import {
    ENDP_PRODUCT,
    ENDP_PRODUCT_CATEGORIES,
    ENDP_PRODUCT_SIZES,
    ENDP_PRODUCT_COLORS
} from '@/shared/config/api/URLs';

export interface Category {
    id: number;
    name: string;
    parentId?: number | null;
    children?: Category[];
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
    name: string;
    price: number;
    product_images: string[];
    categories: Category[];
    sizes: Size[];
    colors: Color[];
}

export interface CreateProductDto {
    name: string;
    price: number;
    product_images: string[];
    category_id: number[];
    size_id: number[];
    color_id: number[];
}

export const getProducts = async (): Promise<Product[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT);
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

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_CATEGORIES);
    return data;
};

export const getSizes = async (): Promise<Size[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_SIZES);
    return data;
};

export const getColors = async (): Promise<Color[]> => {
    const { data } = await httpClient.get(ENDP_PRODUCT_COLORS);
    return data;
};
