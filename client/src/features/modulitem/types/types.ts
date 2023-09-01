import { Category } from '../../mainpage/types/type';

export type Module = {
  id: number;
  title: string;
  user_id: number;
  category_id: number;
  Category: Category;
};
