import { Group, User } from './types';

export type State = {
  groups: Group[];
  users: User[];
  error: undefined | string;
};
