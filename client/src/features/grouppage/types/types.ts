export type Group = {
  id: number;
  teacher_id: number;
  title: string;
};
export type NewGroup = {
  title: string;
};

export type User = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  password: string;
  role_id: number;
};
export type GroupId = Group['id'];
