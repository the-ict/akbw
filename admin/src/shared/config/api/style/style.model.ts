import { ICategory } from "../product/product.modal";

export interface IStyle {
    id: number;
    image: string;
    categoryId: number;
    category: ICategory;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateStyle {
    image: string;
    categoryId: number;
}
