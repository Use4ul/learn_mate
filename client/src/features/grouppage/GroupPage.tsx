import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addGroup, loadUsers, userAdd } from './slices/groupsSlice';

function GroupPage(): React.JSX.Element {
  const [title, setNewTitle] = useState('');
  const [searchName, setSearchName] = useState('');
  const [visibility, setVisibility] = useState(false);
  const users = useSelector((store: RootState) => store.groups.users);
  const group = useSelector((store: RootState) => store.groups.group);
  console.log(group);

  const dispatch = useAppDispatch();
  const handeleAddGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(addGroup({ title }));
  };
  const filterNikname = users.filter((user) => user.nickname.toLowerCase().includes(searchName));
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
    dispatch(loadUsers());
  }, []);
  return (
    <div className="group__container">
      <div>
        <form onSubmit={handeleAddGroup}>
          <input
            placeholder="введите название группы"
            value={title}
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit"> Cоздать группу</button>
          <div> Название: {title}</div>
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
                    onClick={() => handeleNewUser({ student_id: user.id, group_id: group[0].id })}
                  >
                    Добавить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
}

export default GroupPage;
