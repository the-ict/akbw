import httpClient from '../httpClient';
import { ENDP_CATEGORIES } from '../URLs';
import type { CategoryItem } from './categories.model';

export const getCategories = async (): Promise<CategoryItem[]> => {
  return (await httpClient.get(ENDP_CATEGORIES)).data;
};
