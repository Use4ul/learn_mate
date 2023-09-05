import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { Group, GroupId } from './types/types';
import { updateTitleGroup, userGroupItemDelete, userInGroup } from './slices/groupsSlice';

function GroupUpdatePage(): JSX.Element {
  const { groupId } = useParams();

  const dispatch = useAppDispatch();
  const group = useSelector((store: RootState) => store.groups.groups);

  const oneGroupIt = useSelector((store: RootState) => store.groups.groupItem);
  console.log(oneGroupIt);

  const users = useSelector((store: RootState) => store.groups.users);


  let id: GroupId;
  if (groupId) {
    id = +groupId;
  }
  const groupItem = group.filter((el) => el.id === id);

  const deleteGroup: Group = groupItem[0];
  console.log(deleteGroup);

  const [title, setNewTitle] = useState(groupItem[0].title);
  const groupToSend = { ...groupItem[0], title };
  const handeleNewTitleGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (id) {
      dispatch(updateTitleGroup(groupToSend));
    }
  };
  useEffect(() => {
    dispatch(userInGroup(groupItem[0]));
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
        </form>
      </div>
      <h5>добавить участников в группу</h5>
      <button type="button">Добавить</button>
      <div>
        <div>
          {oneGroupIt.map((groupIt) => (
            <div>
              {groupIt.User.nickname}{' '}
              <button
                type="button"
                onClick={() => dispatch(userGroupItemDelete({ groupIt, deleteGroup }))}
              >
                {' '}
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
