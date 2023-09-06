/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardProgress } from './progressSlice';

function CardItem({ card }: { card: Card }): JSX.Element {
  const [input, setInput] = useState(false);
  const [rightAnswer, setRightAnswer] = useState('');
  const [def, setDef] = useState('#222');

  const func = (): void => {
    setInput((prev) => !prev);
    setDef('#fff');
  };

  useEffect(() => {
    setInput(false);
    setDef('#222');
    setRightAnswer(card.definition);
  }, [card]);

  const dispatch = useAppDispatch();

  const progress = useSelector((store: RootState) => store.progress.progress);

  dispatch(loadCardProgress(card.id));

  useEffect(() => {
    dispatch(loadCardProgress(card.id));
  }, [progress]);

  return (
    <div className="card__container">
      <label className="card__label">
        <input
          className="card__check-input"
          checked={input}
          /*  onChange={() => {
            setInput((prev) => !prev), ;
          }} */
          onChange={func}
          type="checkbox"
        />
        <div className="card__card">
          <div className="card__front card__div">{card.term}</div>
          <div className="card__back card__div" style={{ color: def }}>
            {rightAnswer}
          </div>
        </div>
        <div>{`Правильных ответов по карточке: ${progress}%`}</div>
      </label>
    </div>
  );
}

export default CardItem;
