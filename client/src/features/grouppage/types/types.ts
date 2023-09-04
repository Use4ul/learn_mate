export type Group = {
  id: number;
  teacher_id: number;
  title: string;
};
export type NewGroup = {
  title: string;
};

export type GroupId = Group['id'];
