import { AuthUser, UserSingIn } from './types';

export type State = {
  authUser: AuthUser | undefined;
  error: undefined | string;
  userSingIn: UserSingIn | undefined;
};
