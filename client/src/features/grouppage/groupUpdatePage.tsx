import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { Group, GroupId } from './types/types';
import './styles/style.scss';
import {
  loadGroups,
  loadUsers,
  updateTitleGroup,
  userAdd,
  userGroupItemDelete,
  userInGroup,
} from './slices/groupsSlice';
import { deleteTask, loadTasks } from '../taskPage/taskSlice';
import ModulItem from '../modulitem/ModulItem';
import { TaskId } from '../taskPage/types/type';

function GroupUpdatePage(): JSX.Element {
  const { userId } = useParams();
  const { groupId } = useParams();
  const [searchName, setSearchName] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [changeTitle, setchangeTitle] = useState(false);

  const dispatch = useAppDispatch();
  const group = useSelector((store: RootState) => store.groups.groups);
  const users = useSelector((store: RootState) => store.groups.users);
  const oneGroupIt = useSelector((store: RootState) => store.groups.groupItem);
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  console.log(tasks);

  let id: GroupId;
  if (groupId) {
    id = +groupId;
  }
  const groupItem = group.filter((el) => el.id === id);

  const deleteGroup: Group = groupItem[0];

  const [title, setNewTitle] = useState(groupItem[0]?.title);
  const groupToSend = { ...groupItem[0], title };

  const handeleNewTitleGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (id) {
      dispatch(updateTitleGroup(groupToSend));
    }
  };

  const filterNikname = users.filter((user) =>
    user.nickname.toLowerCase().includes(searchName.toLowerCase()),
  );
  const handeleSearch: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearchName(e.target.value);
    setVisibility(true);
  };
  const handeleNewUser = async ({
    student_id,
    group_id,
  }: {
    student_id: number;
    group_id: number;
  }): Promise<void> => {
    dispatch(userAdd({ student_id, group_id }));
  };

  const handleDeleteTask = (taskId: TaskId): void => {
    dispatch(deleteTask(taskId));
  };

  useEffect(() => {
    dispatch(userInGroup(groupItem[0]));
    dispatch(loadUsers());
    dispatch(loadGroups());
    dispatch(loadTasks(id));
  }, []);

  return (
    <div className="group__container">
      <div>
        <div>
          <form onSubmit={handeleNewTitleGroup}>
            <input
              className="group__fomName"
              placeholder="введите новое название группы"
              value={title}
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button type="submit" onClick={() => setchangeTitle(true)}>
              Изменить название группы
            </button>
            {changeTitle === true && <div>Новое название: {title}</div>}
          </form>
        </div>
        <div className="group__formSearch">
          <form>
            <input
              className="group__formSearchInput"
              type="text"
              placeholder="Введите никнейм "
              value={searchName}
              onChange={(e) => handeleSearch(e)}
            />
            {visibility === true && (
              <ul className="list">
                {filterNikname.map((user) => (
                  <li className="list">
                    <div className="group__listOne">
                      {user.nickname}
                      <button
                        type="button"
                        onClick={() =>
                          handeleNewUser({ student_id: user.id, group_id: groupToSend.id })
                        }
                      >
                        Добавить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        <div>
          <div className="group__userInGroup">
            {oneGroupIt.map((groupIt) => (
              <div className="group__oneUserInGroup">
                {groupIt.User.nickname}
                <button
                  className="group__userButton"
                  type="button"
                  onClick={() => dispatch(userGroupItemDelete({ groupIt, deleteGroup }))}
                >
                  Удалить из группы
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="group__modulesTitle">Модули, назначенные группе:</div>
      <div className="group__modules">
        {Boolean(tasks.length) &&
          tasks.map((task) => (
            <div className="group__modulesOne">
              <ModulItem module={task.Module} />
              <button
                className="group__modulesOneButton"
                type="button"
                onClick={() => handleDeleteTask(task.id)}
              >
                удалить назначение модуля {task.Module.title} группе {title}
              </button>
            </div>
          ))}
      </div>
      <Link to={`/profile/${userId}`}>
        <button type="button">Вернуться в личный кабинет</button>
      </Link>
    </div>
  );
}
export default GroupUpdatePage;
