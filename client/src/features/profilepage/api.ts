import { Module, ModuleId } from '../modulitem/types/types';
import { AuthUserId } from '../auth/log/types/types';
import { CardWithoutId, ModuleWithCards, ModuleWithoutUser } from './types/type';
import { Card } from '../cardsPage/types/types';

export const fetchModulesForUser = async (id: AuthUserId): Promise<Module[]> => {
  const res = await fetch(`/api/user/${id}/modules/`);
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
  console.log(title);
  
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
  console.log(term, definition, img, audio, module_id);
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
