export type AuthUser = {
  id?: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
};

export type UserSingIn = {
  email: string;
  password: string;
};

export type AuthUserId = AuthUser['id'];
