/* eslint-disable no-undef */
import React from 'react';
import { Card } from '../cardsPage/types/types';
import './styles/style.scss';

function CardItem({ card }: { card: Card }): JSX.Element {
  return (
    <div className="card__container">
      <label>
        <input type="checkbox" />
        <div className="card">
          <div className="front">{card.term}</div>
          <div className="back">{card.definition}</div>
        </div>
        <div> Прогресс</div>
      </label>
    </div>
  );
}

export default CardItem;
