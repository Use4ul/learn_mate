import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import CardItem from '../carditem/CardItem';

import { loadCards } from './cardsSlice';
import { ModuleId } from '../modulitem/types/types';
import './styles/style.scss';
import TypeAnswerItem from './TypeAnswerItem';

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
    <>
      <h5>Название модуля</h5>
      <div className="cards__container">
        <div>{cards.length && <CardItem card={cards[cardIndex]} />}</div>
      </div>

      {Boolean(cardIndex) && (
        <button type="button" onClick={handeleBack}>
          {' '}
          Назад
        </button>
      )}
      {cards
        ? Boolean(cards.length - cardIndex - 1) && (
            <button type="button" onClick={handeleForward}>
              {' '}
              Вперед
            </button>
          )
        : 'Упс'}
      <div>
        <button type="button">Заучивание</button>
        <button type="button" onClick={() => handeleTypeTraining('SeveralAnswers')}>
          Варианты ответа
        </button>
        <button type="button" onClick={() => handeleTypeTraining('WriteAnswers')}>
          Напиши правильный ответ
        </button>
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
    </>
  );
}

export default CardsPage;
