import { Group, GroupItem, GroupWithTasks, User } from './types';

export type State = {
  groups: Group[];
  users: User[];
  group: Group[];
  groupItem: GroupItem[];
  groupsWithTasks: GroupWithTasks[];
  error: undefined | string;
};
