import { Group, GroupId, User } from './types';

export type Action =
  | { type: 'groups/load'; payload: Group[] }
  | { type: 'group/delete'; payload: GroupId }
  | { type: 'group/add'; payload: Group }
  | { type: 'group/update'; payload: Group }
  | { type: 'group/User'; payload: User[] };
