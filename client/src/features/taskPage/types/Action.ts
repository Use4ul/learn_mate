import { GroupWithTasks } from '../../grouppage/types/types';

type Action = { type: 'user/loadTasks'; payload: GroupWithTasks[] } | { type: 'group/task' };

export default Action;
