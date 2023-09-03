import { AuthUser, UserSingIn } from './types/types';

export const fetchSignUp = async (user: AuthUser): Promise<AuthUser> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const fetchSignIn = async (user: UserSingIn): Promise<AuthUser> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const fetchCheckUser = async (): Promise<AuthUser> => {
  const res = await fetch('/api/auth/check');
  return res.json();
};

export const fetchLogOut = async (): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/logout');
  return res.json();
};
