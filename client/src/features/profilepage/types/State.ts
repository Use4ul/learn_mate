import { Module } from '../../modulitem/types/types';
import { CardProgress, GroupProgress, ModuleWithCards } from './type';

type State = {
  modules: Module[];
  module: ModuleWithCards[];
  modulesForStat: ModuleWithCards[]
  cardsProgress: CardProgress[]
  groupProgess: GroupProgress[]

  error: undefined | string;
};

export default State;
