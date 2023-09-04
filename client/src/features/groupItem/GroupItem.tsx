/* eslint-disable no-undef */
import React from 'react';

import './styles/style.scss';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Group } from '../grouppage/types/types';
import { RootState, useAppDispatch } from '../../redux/store';
import { groupsDelete } from '../grouppage/slices/groupsSlice';

function GroupItem({ elGroup }: { elGroup: Group }): JSX.Element {
  const dispatch = useAppDispatch();

  const user = useSelector((store: RootState) => store.auth.authUser);

  return (
    <div className="card__container">
      <div>
        <div>{elGroup.title}</div>
        <Link to={`/profile/${user?.id}/${elGroup.id}`}>
          <button type="button">Изменить</button>
        </Link>

        <button type="button" onClick={() => dispatch(groupsDelete(elGroup.id))}>
          удалить
        </button>
      </div>
    </div>
  );
}

export default GroupItem;
