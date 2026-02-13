import { ICategory } from "./product.model";

export interface IStyle {
    id: number;
    image: string;
    categoryId: number;
    category: ICategory;
    createdAt: string;
    updatedAt: string;
}
