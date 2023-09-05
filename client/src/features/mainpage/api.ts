import { Category } from './types/type';

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories');
  return res.json();
};

export default fetchCategories;
