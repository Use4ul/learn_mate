import { GroupWithTasks } from '../../grouppage/types/types';

type State = {
  groups: GroupWithTasks[];
  error: undefined | string;
};

export default State;
