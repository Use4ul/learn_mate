import { Category } from './types/type';

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories');
  return res.json();
};
