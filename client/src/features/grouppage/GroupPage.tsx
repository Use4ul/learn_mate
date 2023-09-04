import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addGroup } from './slices/groupsSlice';

function GroupPage(): JSX.Element {
  const [title, setNewTitle] = useState('');
  const dispatch = useAppDispatch();
  const handeleAggGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch(addGroup({ title }));
  };

  return (
    <div className="group__container">
      <div>
        <form onSubmit={handeleAggGroup}>
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
        <div>имя студента</div>
        <button type="button"> удалить из группы</button>
      </div>
    </div>
  );
}

export default GroupPage;
