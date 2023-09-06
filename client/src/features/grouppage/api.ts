import { Group, GroupId, GroupItem, GroupItemID, NewGroup, User } from './types/types';

export const fetchGroups = async (): Promise<Group[]> => {
  const res = await fetch('/api/groups');
  return res.json();
};

export const fetchGroupsDelete = async (id: GroupId): Promise<GroupId> => {
  const res = await fetch(`/api/groups/${id}`, { method: 'DELETE' });
  const data = await res.json();
  console.log(data);

  return data;
};

export const fetchGroupAdd = async (group: NewGroup): Promise<Group[]> => {
  const res = await fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(group),
  });

  console.log(res);
  return res.json();
};

export const fetchGroupUpdate = async (group: Group): Promise<Group> => {
  const res = await fetch(`/api/groups/${group.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(group),
  });

  console.log(res);

  return res.json();
};
export const fetchUsersInGroup = async (group: Group): Promise<GroupItem[]> => {
  const res = await fetch(`/api/groups/${group.id}`);
  console.log(res);

  return res.json();
};

export const fetchGroupItemDelete = async ({
  groupIt,
  deleteGroup,
}: {
  groupIt: GroupItem;
  deleteGroup: Group;
}): Promise<GroupItemID> => {
  const res = await fetch(`/api/groups/${groupIt.id}/${deleteGroup.id}`, { method: 'DELETE' });
  return res.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/user');
  return res.json();
};

export const featchAddUser = async ({
  student_id,
  group_id,
}: {
  student_id: number;
  group_id: number;
}): Promise<GroupItem> => {
  const res = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ student_id, group_id }),
  });
  return res.json();
};
