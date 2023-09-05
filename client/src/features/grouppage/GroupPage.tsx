import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addGroup } from './slices/groupsSlice';

function GroupPage(): React.JSX.Element {
  const [title, setNewTitle] = useState('');

  const dispatch = useAppDispatch();
  const handeleAddGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(addGroup({ title }));
    setNewTitle('');
  };

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
        </form>
      </div>
      <h5>добавить участников в группу</h5>
      <button type="button">Добавить</button>
      <div>
        <div />
        <button type="button"> удалить из группы</button>
      </div>
    </div>
  );
}

export default GroupPage;
