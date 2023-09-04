import { Module } from './types';

type State = {
  modules: Module[];
  error: undefined | string;
};

export default State;
