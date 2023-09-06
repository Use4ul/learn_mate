import { GroupWithTasks } from '../../grouppage/types/types';

type Action = { type: 'user/loadTasks'; payload: GroupWithTasks[] };

export default Action;
