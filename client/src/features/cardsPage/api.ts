import { ModuleId } from '../modulitem/types/types';
import { Answer, Card } from './types/types';

export const fetchCards = async (id: ModuleId): Promise<Card[]> => {
  const res = await fetch(`/api/modules/${id}`);
  return res.json();
};

export const fetchAnswer = async ({ user_id, card_id, isCorrect }: Answer): Promise<Card[]> => {
  // reshit chto otdaet
  const res = await fetch('/api/answer', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      card_id,
      isCorrect,
    }),
  });
  return res.json();
};
