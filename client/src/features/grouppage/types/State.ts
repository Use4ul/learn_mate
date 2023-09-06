import { Group, GroupItem, User } from './types';

export type State = {
  groups: Group[];
  users: User[];
  group: Group[];
  groupItem: GroupItem[];
  error: undefined | string;
};
