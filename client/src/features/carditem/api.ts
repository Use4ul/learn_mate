import { CardId } from '../cardsPage/types/types';

export const fetchProgress = async (id: CardId) => {
  const res = await fetch(`/api/answers/${id}/progress`);
  return res.json();
};
