import { ModuleId } from '../modulitem/types/types';
import { Card } from './types/types';

export const fetchCards = async (id: ModuleId): Promise<Card[]> => {
  const res = await fetch(`/api/modules/${id}`);
  return res.json();
};
