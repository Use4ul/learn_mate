import { Module } from '../../modulitem/types/types';
import { ModuleWithCards } from './type';

type State = {
  modules: Module[];
  module: ModuleWithCards[];

  error: undefined | string;
};

export default State;
