import { ModuleId } from '../modulitem/types/types';
import { Card } from './types/types';

const fetchCards = async (id: ModuleId): Promise<Card[]> => {
  const res = await fetch(`/api/modules/${id}`);
  return res.json();
};

export default fetchCards;
