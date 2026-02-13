import { ICategory } from "../product/product.model";

export interface IStyle {
    id: number;
    image: string;
    categoryId: number;
    category: ICategory;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateStyle {
    image: File;
    categoryId: number;
}
