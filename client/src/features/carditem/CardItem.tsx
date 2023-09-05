/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardProgress } from './progressSlice';

function CardItem({ card }: { card: Card }): JSX.Element {
  const dispatch = useAppDispatch();

  const progress = useSelector((store: RootState) => store.progress.progress);

  dispatch(loadCardProgress(card.id));

  return (
    <div className="card__container">
      <label>
        <input type="checkbox" />
        <div className="card">
          <div className="front">{card.term}</div>
          <div className="back">{card.definition}</div>
        </div>
        <div>{`Прогресс: ${progress}%`}</div>
      </label>
    </div>
  );
}

export default CardItem;
