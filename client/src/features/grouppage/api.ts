import { Group, GroupId, NewGroup } from './types/types';

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

export const fetchGroupAdd = async (group: NewGroup): Promise<Group> => {
  const res = await fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(group),
  });

  return res.json();
};
// export const fetchUserInGroup = async (: NewGroup): Promise<Group> => {
//   const res = await fetch('/api/groups', {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(group),
//   });

//   return res.json();
// };

export const fetchGroupUpdate = async (group: Group): Promise<Group> => {
  const res = await fetch(`/api/groups/${group.id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(group.title),
  });

  return res.json();
};
