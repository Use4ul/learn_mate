import { Card } from './types/types';

export const fetchCards = async (): Promise<Card[]> => {
  const res = await fetch('/api/cards');
  return res.json();
};
