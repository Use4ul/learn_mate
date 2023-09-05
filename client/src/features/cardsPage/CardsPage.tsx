/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import CardItem from '../carditem/CardItem';

import { loadCards } from './cardsSlice';
import { ModuleId } from '../modulitem/types/types';
import TypeAnswerItem from './TypeAnswerItem';
import FourAnswerItem from './FourAnswerItem';
import './styles/style.scss';

function CardsPage(): JSX.Element {
  const { moduleId } = useParams();
  const [cardIndex, setCardIndex] = useState(0);
  const [trainingOptions, setrainingOptions] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');

  const dispatch = useAppDispatch();
  let id: ModuleId;
  if (moduleId) {
    id = +moduleId;
  }

  const cards = useSelector((store: RootState) => store.cards.cards);
  console.log(cards);

  const handeleForward = (): void => {
    setCardIndex((prev) => prev + 1);
    setCorrectAnswers('');
  };

  const handeleBack = (): void => {
    setCardIndex((prev) => prev - 1);
  };
  const handeleTypeTraining = (value: string): void => {
    setrainingOptions(value);
  };

  useEffect(() => {
    dispatch(loadCards(id));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Название модуля</h1>
      <div className="btn_and_card">
        {cards.length && <CardItem card={cards[cardIndex]} />}
        <div className="buttons_container">
          <button type="button" disabled={!cardIndex} onClick={handeleBack}>
            Назад
          </button>

          {cards ? (
            <button
              type="button"
              disabled={!(cards.length - cardIndex - 1)}
              onClick={handeleForward}
            >
              Вперед
            </button>
          ) : (
            'Упс'
          )}
          <button type="button" onClick={() => handeleTypeTraining('')}>
            Заучивание
          </button>
          <button type="button" onClick={() => handeleTypeTraining('SeveralAnswers')}>
            Варианты ответа
          </button>
          <button type="button" onClick={() => handeleTypeTraining('WriteAnswers')}>
            Напиши правильный ответ
          </button>
        </div>
      </div>
      <div className="actions_container">
        <div>
          {trainingOptions === 'SeveralAnswers' ? (
            <FourAnswerItem
              card={cards[cardIndex]}
              cards={cards}
              cardIndex={cardIndex}
              setCorrectAnswers={setCorrectAnswers}
            />
          ) : (
            <div />
          )}
        </div>
        <div>
          {trainingOptions === 'WriteAnswers' ? (
            <TypeAnswerItem
              card={cards[cardIndex]}
              setCorrectAnswers={setCorrectAnswers}
              correctAnswers={correctAnswers}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardsPage;
