interface IProductTranslation {
  name: string;
  description: string;
  lang: string;
}

export interface ICategory {
  id: number;
  name: string;
  parentId?: number | null;
  children?: ICategory[];
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  id: number;
  name: string;
}

export interface IColor {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  product_images: string[];
  categories: ICategory[];
  sizes: ISize[];
  colors: IColor[];
  createdAt: string;
  updatedAt: string;
  rating: number;
  discount: number;
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
  category_id?: string;
  color_id?: string;
  size_id?: string;
  min_price?: number;
  max_price?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IRecommendedProductsResponse {
  newest: IProduct[];
  mostSold: IProduct[];
}
