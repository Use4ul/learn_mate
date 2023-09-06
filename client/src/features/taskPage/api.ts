import { AuthUserId } from '../auth/log/types/types';
import { Group, GroupWithTasks } from '../grouppage/types/types';
import { ModuleId } from '../modulitem/types/types';
import { TaskToSend } from './types/type';

export const fetchGroupForTasks = async (id: AuthUserId): Promise<GroupWithTasks[]> => {
  const res = await fetch(`/api/tasks/${id}`);
  return res.json();
};

export const fetchGroupsToTasks = async ({
  groups,
  id,
}: TaskToSend): Promise<{ message: string }> => {
  const res = await fetch('/api/tasks/group', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      groups,
      id,
    }),
  });
  return res.json();
};
