import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import CardItem from '../carditem/CardItem';

function CardsPage(): JSX.Element {
  console.log('++++++++++++++');

  const { moduleId } = useParams();
  console.log(moduleId);

  const cards = useSelector((store: RootState) => store.cards.cards);
  console.log(cards);

  let filterCards;
  if (moduleId) {
    filterCards = cards.filter((card) => card.module_id === +moduleId);
    console.log(filterCards);
  }

  return (
    <>
      <h5>Название модуля</h5>
      <div>
        <div>
          {filterCards?.map((card) => (
            <CardItem card={card} />
          ))}
        </div>
        <button type="button"> назад</button>
        <button type="button"> вперед</button>
      </div>
      <div>
        <button type="button">Варианты обучения</button>
        <button type="button">Варианты обучения</button>
        <button type="button">Варианты обучения</button>
      </div>
    </>
  );
}

export default CardsPage;
