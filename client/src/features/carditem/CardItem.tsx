/* eslint-disable no-undef */
import React from 'react';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';

function CardItem({ card }: { card: Card }): JSX.Element {
  return (
    <div className="card__container">
      <div>
        <div>{card.term}</div>
        <div>{card.definition}</div>
      </div>
      <div> Прогресс</div>
    </div>
  );
}

export default CardItem;
