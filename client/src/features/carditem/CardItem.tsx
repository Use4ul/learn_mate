import React from 'react';
import { Card } from '../cardsPage/types/types';

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
