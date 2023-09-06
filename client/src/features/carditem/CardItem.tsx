/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCardProgress } from './progressSlice';

function CardItem({
  card,
  input,
  setInput,
  colorWords,
  setColorWords,
}: {
  card: Card;
  input: Boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;
  colorWords: string;
  setColorWords: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [rightAnswer, setRightAnswer] = useState('');
  // const [colorWords, setColorWords] = useState('#222');

  const func = (): void => {
    setInput((prev) => !prev);
    setColorWords('#fff');
  };

  useEffect(() => {
    setInput(true);
    setColorWords('#222');
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
          checked={!input}
          /*  onChange={() => {
            setInput((prev) => !prev), ;
          }} */
          onChange={func}
          type="checkbox"
        />
        <div className="card__card">
          <div className="card__front card__div">{card.term}</div>
          <div className="card__back card__div" style={{ color: colorWords }}>
            {rightAnswer}
          </div>
        </div>
        <div>
          <p className="card__progress">{`Правильных ответов по карточке: ${progress}%`}</p>
        </div>
      </label>
    </div>
  );
}

export default CardItem;
