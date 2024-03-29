/* eslint-disable no-undef */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { clearProgress, loadCardProgress } from './progressSlice';

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

  const flag = useSelector((store: RootState) => store.progress.flagForUpdate);

  useEffect(() => {
    dispatch(loadCardProgress(card.id));
  }, [flag, progress, card]);

  return (
    <div style={{ marginTop: '120px' }}>
      <label className="card__label">
        <input className="card__check-input" checked={!input} onChange={func} type="checkbox" />
        <div className="card__card">
          {card.term ? (
            <div className="card__front card__div">{card.term}</div>
          ) : card.img ? (
            <div className="card__front card__div">
              <img src={card.img} alt=" " />
            </div>
          ) : (
            <div className="card__front card__div">{/* <audio src={`${card.audio}`} /> */}</div>
          )}
          <div className="card__back card__div" style={{ color: colorWords }}>
            {rightAnswer}
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <div className="stat_wrapper">
            <div className="card__progress">
              {`Правильных ответов по карточке: ${progress}%`}
              <div
                className="stat_bar"
                style={{
                  width: `${progress}%`,
                  height: '21px',
                }}
              >
                {' '}
              </div>
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

export default CardItem;
