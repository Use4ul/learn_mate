import { Group, GroupId } from './types';

export type Action =
  | { type: 'groups/load'; payload: Group[] }
  | { type: 'group/delete'; payload: GroupId }
  | { type: 'group/add'; payload: Group };
