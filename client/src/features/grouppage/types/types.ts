export type Group = {
  id: number;
  teacher_id: number;
  title: string;
};
export type NewGroup = {
  title: string;
};
export type GroupItem = {
  id: number;
  student_id: number;
  group_id: number;
  User: User;
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
export type GroupItemID = GroupItem['id'];
