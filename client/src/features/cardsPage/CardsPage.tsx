import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import CardItem from '../carditem/CardItem';

import { loadCards } from './cardsSlice';
import { ModuleId } from '../modulitem/types/types';
import './styles/style.scss';

function CardsPage(): JSX.Element {
  const { moduleId } = useParams();
  const [cardIndex, setCardIndex] = useState(0);

  const dispatch = useAppDispatch();
  let id: ModuleId;
  if (moduleId) {
    id = +moduleId;
  }

  const cards = useSelector((store: RootState) => store.cards.cards);

  const handeleForward = (): void => {
    setCardIndex((prev) => prev + 1);
  };

  const handeleBack = (): void => {
    setCardIndex((prev) => prev - 1);
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
              вперед
            </button>
          )
        : 'Упс'}
      <div>
        <button type="button">Варианты обучения</button>
        <button type="button">Варианты обучения</button>
        <button type="button">Варианты обучения</button>
      </div>
    </>
  );
}

export default CardsPage;
