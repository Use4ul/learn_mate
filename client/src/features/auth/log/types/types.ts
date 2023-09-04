export type AuthUser = {
  id?: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  role: number;
};

export type AuthUserId = AuthUser['id'];
