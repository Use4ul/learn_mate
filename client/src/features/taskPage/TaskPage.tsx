import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadGroupForTasks } from './taskSlice';
import { AuthUserId } from '../auth/log/types/types';
import ModulItem from '../modulitem/ModulItem';
import './styles/style.scss';

function TaskPage(): React.JSX.Element {
  const { userId } = useParams();

  let id: AuthUserId;
  if (userId) {
    id = +userId;
  }

  const dispatch = useAppDispatch();

  const groupsWithTasks = useSelector((store: RootState) => store.tasks.groups);

  useEffect(() => {
    dispatch(loadGroupForTasks(id));
  }, []);

  return (
    <div >
      {groupsWithTasks.length ? (
        groupsWithTasks.map((group) => (
          <>
            <div>{group.title}</div>
            <div>
              {group.Tasks.length ? (
                group.Tasks.map((task) => <ModulItem module={task.Module} />)
              ) : (
                <div>Нет назначенных модулей</div>
              )}
            </div>
          </>
        ))
      ) : (
        <div>Нет назначенных модулей</div>
      )}
    </div>
  );
}

export default TaskPage;
