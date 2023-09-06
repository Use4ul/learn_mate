import { AuthUserId } from '../auth/log/types/types';
import { GroupWithTasks } from '../grouppage/types/types';

export const fetchGroupForTasks = async (id: AuthUserId): Promise<GroupWithTasks[]> => {
  const res = await fetch(`/api/tasks/${id}`);
  return res.json();
};
