import { Module } from './types';

type Action = { type: 'modules/load'; payload: Module[] };

export default Action;
