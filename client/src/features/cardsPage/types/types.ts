export type Card = {
  id: number;
  term: string | null;
  definition: string;
  img: string | null;
  audio: string | null;
  module_id: number;
};

export type CardId = Card['id'];

export type Answer = {
  id?: number;
  user_id: number;
  card_id: number;
  isCorrect: boolean;
};
