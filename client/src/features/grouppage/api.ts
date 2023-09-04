import { Group } from './types/types';

export const fetchGroups = async (): Promise<Group[]> => {
  const res = await fetch('/api/groups');
  return res.json();
};
