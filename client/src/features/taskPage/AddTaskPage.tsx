/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadGroups, loadGroupsWithTask } from '../grouppage/slices/groupsSlice';
import { Group } from '../grouppage/types/types';
import { useParams } from 'react-router-dom';
import { loadModulesForUserToUpdate } from '../profilepage/profileSlice';
import { ModuleId } from '../modulitem/types/types';
import { fetchGroupsToTasks } from './api';
import { taskGroup } from './taskSlice';

function AddTaskPage(): React.JSX.Element {
  const { moduleId } = useParams();
  const [search, setSearch] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [groupToAdd, setGroupToAdd] = useState<Group[]>([]);

  const groups = useSelector((store: RootState) => store.groups.groupsWithTasks);
  const user = useSelector((store: RootState) => store.auth.authUser);
  const module = useSelector((store: RootState) => store.profile.module);

  let userId: number;
  if (user) {
    userId = user.id;
  }

  let moduleid: ModuleId;
  if (moduleId) {
    moduleid = +moduleId;
  }

  const dispatch = useAppDispatch();

  const filteredGroups = groups.filter((group) =>
    group.title.toLowerCase().includes(search.toLowerCase()),
  );

  const groupsToShow = filteredGroups.filter((el) => !groupToAdd.includes(el));

  const handeleSearch: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearch(e.target.value);
    setVisibility(true);
  };

  const handleTask = (): void => {
    dispatch(taskGroup({ groups: groupToAdd, id: moduleid }));
    dispatch(loadGroupsWithTask(moduleid));
    setGroupToAdd([]);
  };

  useEffect(() => {
    dispatch(loadGroupsWithTask(moduleid));
    setVisibility(true);
    dispatch(loadModulesForUserToUpdate(userId));
  }, []);

  return (
    <div>
      <div>
        <label>
          Поиск среди своих групп
          <br />
          <input
            value={search}
            placeholder="введите название группы"
            onChange={(e) => handeleSearch(e)}
          />
          {visibility === true && (
            <ul className="list">
              {groupsToShow.map((group) => (
                <li className="list" onClick={() => setGroupToAdd((prev) => [...prev, group])}>
                  {group.title}
                </li> // "этот li кликабельный"
              ))}
            </ul>
          )}
        </label>
      </div>

      <div>
        {Boolean(module.length) && <p>Назначить модуль {module[0].title} группам:</p>}
        {groupToAdd.map((el) => (
          <div>{el.title}</div>
        ))}
        <button type="button" onClick={handleTask}>
          Добавить
        </button>
        <button type="button" onClick={() => setGroupToAdd([])}>
          Очистить
        </button>
      </div>
    </div>
  );
}

export default AddTaskPage;
