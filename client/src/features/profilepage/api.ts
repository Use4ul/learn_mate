import { Module } from '../modulitem/types/types';
import { AuthUserId } from '../auth/log/types/types';

export const fetchModulesForUser = async (id: AuthUserId): Promise<Module[]> => {
  const res = await fetch(`/api/user/${id}/modules/`)
  return res.json();
};
