import { Module } from '../../modulitem/types/types';

type Action = { type: 'modules/loadForUser'; payload: Module[] };

export default Action;
