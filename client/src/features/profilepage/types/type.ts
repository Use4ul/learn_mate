import { Card } from '../../cardsPage/types/types';

export type ModuleWithCards = {
  id: number;
  title: string;
  user_id: number;
  category_id: number;
  Cards: Card[];
};

export type ModuleWithoutUser = {
  id: number;
  title: string;
  category: string;
};

export type CardWithoutId = {
  term: string | null;
  definition: string;
  img: string | null;
  audio: string | null;
  module_id: number;
};
