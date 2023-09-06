/* eslint-disable no-undef */
import React from 'react';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';
import { useAppDispatch } from '../../redux/store';
import { deleteCard } from './profileSlice';

function CardItemForProfilePage({ card }: { card: Card }): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleCardDelete: React.MouseEventHandler<HTMLButtonElement> = async () => {
    dispatch(deleteCard(card.id));
  };
  console.log(card.img);

  return (
    <div className="card__container">
      <div>
        <div>
          <img src={card.img ? card.img : ' '} alt="f" />
        </div>
        <div>{card.term}</div>
        <div>{card.definition}</div>
      </div>
      <button type="button" onClick={handleCardDelete}>
        Удалить карточку
      </button>
    </div>
  );
}

export default CardItemForProfilePage;
