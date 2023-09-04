import { AuthUser } from './types';

export type State = {
  authUser: AuthUser | undefined;
  error: undefined | string;
};
