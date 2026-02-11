import {
    IProduct
} from "../product/product.model";

interface IColor {
    id: number;
    products: IProduct[];
    translations: IColorTranslation[];
    createdAt: string;
    updatedAt: string;
}

interface IColorTranslation {
    id: number;
    name: string;
    lang: string;
    colorId: number;
    color: IColor;
    createdAt: string;
    updatedAt: string;
}

export type { IColor, IColorTranslation };