import { IProduct } from "../product/product.model";

interface CategoryItem {
    id: number;
    products: IProduct[];
    createdAt: string;
    updatedAt: string;
}

interface CategoryTranslations {
    id: number;
    name: string;
    lang: string;
    categoryId: number;
    category: CategoryItem;
    createdAt: string;
    updatedAt: string;
};

export type {
    CategoryItem,
    CategoryTranslations
}