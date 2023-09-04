/* eslint-disable no-undef */
import React from 'react';

import './styles/style.scss';

import { Group } from '../grouppage/types/types';
import { useAppDispatch } from '../../redux/store';
import { groupsDelete } from '../grouppage/slices/groupsSlice';

function GroupItem({ elGroup }: { elGroup: Group }): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="card__container">
      <div>
        <div>{elGroup.title}</div>
        <button type="button"> изменить</button>
        <button type="button" onClick={() => dispatch(groupsDelete(elGroup.id))}>
          {' '}
          удалить
        </button>
      </div>
    </div>
  );
}

export default GroupItem;
