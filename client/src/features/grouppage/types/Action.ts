import { Group, GroupId, GroupItem, GroupItemID, GroupWithTasks, User } from './types';

export type Action =
  | { type: 'groups/load'; payload: Group[] }
  | { type: 'group/delete'; payload: GroupId }
  | { type: 'group/add'; payload: Group }
  | { type: 'group/update'; payload: Group }
  | { type: 'group/User'; payload: GroupItem[] }
  | { type: 'user/delete'; payload: GroupItemID }
  | { type: 'user/lod'; payload: User[] }
  | { type: 'user/add'; payload: GroupItem }
  | { type: 'groupsWithTask/load'; payload: GroupWithTasks[] };
