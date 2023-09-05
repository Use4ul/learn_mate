import { Group, GroupItem, User } from './types';

export type State = {
  groups: Group[];
  users: User[];
  groupItem: GroupItem[];
  error: undefined | string;
};
