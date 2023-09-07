import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import {
  addGroup,
  clearError,
  loadGroups,
  loadUsers,
  userAdd,
  userGroupItemDelete,
} from './slices/groupsSlice';
import { Group, GroupId } from './types/types';

function GroupPage(): React.JSX.Element {
  const { userId } = useParams();
  const [title, setNewTitle] = useState('');
  const [newGroup, setNewGroup] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [visibility, setVisibility] = useState(false);
  const users = useSelector((store: RootState) => store.groups.users);
  const group = useSelector((store: RootState) => store.groups.group);
  const groups = useSelector((store: RootState) => store.groups.group);
  const oneGroupIt = useSelector((store: RootState) => store.groups.groupItem);
  const { error } = useSelector((store: RootState) => store.groups);

  const groupDelete = groups.filter((el) => el.id === group[0].id);
  const deleteItemGroup: Group = groupDelete[0];

  const dispatch = useAppDispatch();
  const handeleAddGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(addGroup({ title }));
    setTimeout(() => {
      if (!error) {
        setNewGroup(true);
      }
    }, 300);
  };
  const filterNikname = users.filter((user) =>
    user.nickname.toLowerCase().includes(searchName.toLowerCase()),
  );
  const handeleSearch: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearchName(e.target.value);
    setVisibility(true);
  };

  const newGroupAdd: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTitle(e.target.value);
    setNewGroup(false);
    dispatch(clearError());
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
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(loadGroups());
  }, []);
  return (
    <div className="group__container">
      <div>
        <form onSubmit={handeleAddGroup}>
          <input
            className="group__fomName"
            placeholder="Введите название группы"
            value={title}
            type="text"
            onChange={newGroupAdd}
          />
          <button type="submit">Cоздать группу</button>
          {error && <span> {error} </span>}
          {!error && newGroup === true && <div> Вы создали группу: {title}</div>}
        </form>
      </div>
      <div className="group__formSearch">
        <form>
          <input
            type="text"
            className="group__formSearchInput"
            placeholder="Введите никнейм "
            value={searchName}
            onChange={(e) => handeleSearch(e)}
          />
          {visibility === true && (
            <ul className="group__list">
              {filterNikname.map((user) => (
                <li className="list">
                  <div className="group__listOne">
                    {user.nickname}
                    <button
                      type="button"
                      onClick={() => handeleNewUser({ student_id: user.id, group_id: group[0].id })}
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
        {oneGroupIt.map((groupIt) => (
          <div>
            {groupIt.User.nickname}
            <button
              type="button"
              onClick={() =>
                dispatch(userGroupItemDelete({ groupIt, deleteGroup: deleteItemGroup }))
              }
            >
              Удалить из группы
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

export default GroupPage;
