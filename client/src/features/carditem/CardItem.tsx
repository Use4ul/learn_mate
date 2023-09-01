import React from 'react';

function CardItem(): JSX.Element {
  return (
    <div className="card__container">
      <h5>Название модуля</h5>
      <div>
        <div> Карточка
          <button type="button"> назад</button>
          <button type="button"> вперед</button>
        </div>
        <div>
          <button type="button">Варианты обучения</button>
          <button type="button">Варианты обучения</button>
          <button type="button">Варианты обучения</button>
        </div>
      </div>
      <div> Прогресс</div>

    </div>
  );
}

export default CardItem;
