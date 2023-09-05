import { Module, ModuleId } from '../modulitem/types/types';
import { AuthUserId } from '../auth/log/types/types';
import { CardWithoutId, ModuleWithCards, ModuleWithoutUser } from './types/type';
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

export const fetchCardToAdd = async ({
  term,
  definition,
  img,
  audio,
  module_id,
}: CardWithoutId): Promise<Card> => {
  const res = await fetch('/api/cards', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      term,
      definition,
      img,
      audio,
      module_id,
    }),
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
