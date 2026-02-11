import {
    IProduct
} from "../product/product.model";

interface ISize {
    id: number;
    name: string;
    translations: ISizeTranslation[];
    products: IProduct[]
    createdAt: string;
    updatedAt: string;
}

interface ISizeTranslation {
    id: number;
    name: string;
    lang: string;
    sizeId: number;
    size: ISize;
    createdAt: string;
    updatedAt: string;
}

export type {
    ISize,
    ISizeTranslation
}