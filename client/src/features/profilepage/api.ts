import { Module, ModuleId } from '../modulitem/types/types';
import { AuthUserId } from '../auth/log/types/types';
import { CardProgress, GroupProgress, ModuleWithCards, ModuleWithoutUser } from './types/type';
import { Card, CardId } from '../cardsPage/types/types';

export const fetchModulesForUser = async (id: AuthUserId): Promise<Module[]> => {
  const res = await fetch(`/api/user/${id}/modules/`);
  return res.json();
};

export const fetchModulesForUserStat = async (id: AuthUserId): Promise<ModuleWithCards[]> => {
  const res = await fetch(`/api/user/${id}/modules/stat`);
  return res.json();
};

export const fetchModuleForUserToUpdate = async (id: ModuleId): Promise<ModuleWithCards[]> => {
  const res = await fetch(`/api/user/modules/${id}`);
  return res.json();
};

export const fetchModuleToUpdate = async ({
  title,
  category,
  id,
}: ModuleWithoutUser): Promise<Module> => {
  const res = await fetch(`/api/modules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      categ: category,
    }),
  });
  return res.json();
};

export const fetchCardToAdd = async (formData: FormData): Promise<Card> => {
  const res = await fetch('/api/cards', {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export const fetchModuleToAdd = async ({
  title,
  category,
}: ModuleWithoutUser): Promise<ModuleWithCards[]> => {
  const res = await fetch('/api/modules', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      category,
    }),
  });
  return res.json();
};

export const fetchModuleDelete = async (id: ModuleId): Promise<ModuleId> => {
  const res = await fetch(`/api/modules/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const fetchCardDelete = async (id: CardId): Promise<CardId> => {
  const res = await fetch(`/api/cards/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const fetchCardStat = async (id: AuthUserId): Promise<CardProgress[]> => {
  const res = await fetch(`/api/answers/${id}/stat`);
  return res.json();
};

export const fetchGroupStat = async (id: AuthUserId): Promise<GroupProgress[]> => {
  const res = await fetch(`/api/answers/${id}/group`);
  return res.json();
};
