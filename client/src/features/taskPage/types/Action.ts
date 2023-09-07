import { GroupWithTasks } from '../../grouppage/types/types';
import { Task } from './type';

type Action =
  | { type: 'user/loadTasks'; payload: GroupWithTasks[] }
  | { type: 'group/task' }
  | { type: 'user/loadGroupTasks'; payload: Task[] };

export default Action;
