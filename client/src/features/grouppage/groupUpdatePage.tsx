import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { GroupId } from './types/types';

function GroupUpdatePage(): JSX.Element {
  const { groupId } = useParams();

  const dispatch = useAppDispatch();
  const group = useSelector((store: RootState) => store.groups.groups);
  console.log(group);

  let id: GroupId;
  if (groupId) {
    id = +groupId;
  }
  const groupItem = group.filter((el) => el.id === id);
  console.log(groupItem);

  const [title, setNewTitle] = useState(groupItem[0].title);
  const handeleAggGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };

  return (
    <div className="group__container">
      <div>
        <form onSubmit={handeleAggGroup}>
          <input
            placeholder="введите новое название группы"
            value={title}
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit">Изменить название группы</button>
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
export default GroupUpdatePage;
