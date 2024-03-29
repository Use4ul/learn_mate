import { Card, CardId } from '../../cardsPage/types/types';
import { Module, ModuleId } from '../../modulitem/types/types';
import { GroupProgress, ModuleWithCards } from './type';

type Action =
  | { type: 'user/loadModules'; payload: Module[] }
  | { type: 'user/loadModuleToUpdate'; payload: ModuleWithCards[] }
  | { type: 'user/moduleUpdate'; payload: Module[] }
  | { type: 'user/addCardToModule'; payload: Card }
  | { type: 'user/addModule'; payload: ModuleWithCards[] }
  | { type: 'user/deleteModule'; payload: ModuleId }
  | { type: 'user/deleteCard'; payload: CardId }
  | { type: 'user/loadModulesForStat'; payload: ModuleWithCards[] }
  | { type: 'user/loadGroupStat'; payload: GroupProgress[] };

export default Action;
