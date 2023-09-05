import { Module } from '../../modulitem/types/types';
import { CardProgress, ModuleWithCards } from './type';

type State = {
  modules: Module[];
  module: ModuleWithCards[];
  modulesForStat: ModuleWithCards[]
  cardsProgress: CardProgress[]

  error: undefined | string;
};

export default State;
