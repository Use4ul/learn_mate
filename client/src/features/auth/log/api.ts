import { AuthUser, AuthUserWithoutId } from './types/types';

export const fetchSignUp = async (user: AuthUserWithoutId): Promise<AuthUser> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};

export const fetchSignIn = async (user: Partial<AuthUser>): Promise<AuthUser> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
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

export const fetchCheckNick = async (nickname: string): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/checkNickname', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
    }),
  });
  return res.json();
};

export const fetchCheckEmail = async (email: string): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/checkEmail', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  return res.json();
};
