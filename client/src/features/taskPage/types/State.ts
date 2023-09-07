import { GroupWithTasks } from '../../grouppage/types/types';
import { Task } from './type';

type State = {
  groups: GroupWithTasks[];
  tasks: Task[];
  error: undefined | string;
};

export default State;
