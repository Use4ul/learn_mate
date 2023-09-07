import { Group } from '../../grouppage/types/types';
import { ModuleId } from '../../modulitem/types/types';
import { ModuleWithCards } from '../../profilepage/types/type';

export type Task = {
  id: number;
  group_id: number;
  module_id: number;
  Module: ModuleWithCards;
};

export type TaskId = Task['id'];

export type TaskToSend = {
  groups: Group[];
  id: ModuleId;
};
