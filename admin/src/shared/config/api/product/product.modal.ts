interface IProductTranslation {
    name: string;
    description: string;
    lang: string;
}

export interface ICreateProduct {
    price: number;
    product_images: string[];
    categories: string[];
    sizes: string[];
    colors: string[];
    translations: IProductTranslation[];
};

export type IUpdateProduct = Partial<ICreateProduct>;