import { Answer, CardId } from '../cardsPage/types/types';

const fetchProgress = async (id: CardId): Promise<number> => {
  const res = await fetch(`/api/answers/${id}/progress`);
  return res.json();
};

export const fetchAnswer = async ({ user_id, card_id, isCorrect }: Answer): Promise<number> => {
  const res = await fetch('/api/answers', {
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

export default fetchProgress;
