import { Card } from '../../cardsPage/types/types';
import { Module } from '../../modulitem/types/types';
import { ModuleWithCards } from './type';

type Action =
  | { type: 'user/loadModules'; payload: Module[] }
  | { type: 'user/loadModuleToUpdate'; payload: ModuleWithCards[] }
  | { type: 'user/moduleUpdate'; payload: Module[] }
  | { type: 'user/addCardToModule'; payload: Card }
  | { type: 'user/addModule'; payload: ModuleWithCards[] };

export default Action;
