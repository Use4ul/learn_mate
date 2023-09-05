import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { Group, GroupId } from './types/types';
import './styles/style.scss';
import {
  loadUsers,
  updateTitleGroup,
  userAdd,
  userGroupItemDelete,
  userInGroup,
} from './slices/groupsSlice';

function GroupUpdatePage(): JSX.Element {
  const { groupId } = useParams();
  const [searchName, setSearchName] = useState('');
  const [visibility, setVisibility] = useState(false);

  const dispatch = useAppDispatch();
  const group = useSelector((store: RootState) => store.groups.groups);
  const oneGroupIt = useSelector((store: RootState) => store.groups.groupItem);

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

  const filterNikname = 
    .filter((user) => user.nickname.toLowerCase().includes(searchName));
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

  useEffect(() => {
    dispatch(userInGroup(groupItem[0]));
    dispatch(loadUsers());
  }, []);

  return (
    <div className="group__container">
      <div>
        <form onSubmit={handeleNewTitleGroup}>
          <input
            placeholder="введите новое название группы"
            value={title}
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Изменить название группы</button>
          <div>Новое название: {title}</div>
        </form>
      </div>
      <div>
        <form>
          <input
            type="text"
            className="search"
            placeholder="Введите никнейм "
            value={searchName}
            onChange={(e) => handeleSearch(e)}
          />
          {visibility === true && (
            <ul className="list">
              {filterNikname.map((user) => (
                <li className="list">
                  {user.nickname}
                  <button
                    type="button"
                    onClick={() =>
                      handeleNewUser({ student_id: user.id, group_id: groupToSend.id })
                    }
                  >
                    Добавить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <div>
        <div>
          {oneGroupIt.map((groupIt) => (
            <div>
              {groupIt.User.nickname}
              <button
                type="button"
                onClick={() => dispatch(userGroupItemDelete({ groupIt, deleteGroup }))}
              >
                удалить из группы
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GroupUpdatePage;
