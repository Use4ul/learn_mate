import { Category } from './type';

type Action = { type: 'categories/load'; payload: Category[] };

export default Action;
