export type AuthUser = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  role_id: number;
};

export type AuthUserId = AuthUser['id'];

export type AuthUserWithoutId = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  role_id: number;
};
