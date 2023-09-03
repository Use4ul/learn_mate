import { AuthUser } from './types';

export type Action =
  | { type: 'auth/sign-up'; payload: AuthUser }
  | { type: 'auth/check'; payload: AuthUser }
  | { type: 'auth/logout' };
