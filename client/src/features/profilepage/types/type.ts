import { Card, CardId } from '../../cardsPage/types/types';
import { Category } from '../../mainpage/types/type';

export type ModuleWithCards = {
  id: number;
  title: string;
  user_id: number;
  category_id: number;
  Cards: Card[];
  Category?: Category;
};

export type ModuleWithoutUser = {
  id?: number;
  title: string;
  category: string;
};

export type CardWithoutId = {
  term: string | null;
  definition: string;
  img: string | null ;
  audio: string | null;
  module_id: number;
};

export type CardProgress = {
  card_id: CardId;
  progress: number;
};
