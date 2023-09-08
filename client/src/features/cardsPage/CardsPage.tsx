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
  const [input, setInput] = useState(false);
  const [colorWords, setColorWords] = useState('#222');

  const dispatch = useAppDispatch();

  let id: ModuleId;
  if (moduleId) {
    id = +moduleId;
  }

  /*  const modules = useSelector((store: RootState) => store.modules.modules); */
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
    <div style={{ textAlign: 'center' }}>
      <div className="btn_and_card">
        {cards.length && (
          <CardItem
            card={cards[cardIndex]}
            input={input}
            setInput={setInput}
            colorWords={colorWords}
            setColorWords={setColorWords}
          />
        )}
        <div className="buttons_container" style={{ marginTop: '35px' }}>
          <div style={{ display: 'flex' }}>
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
          </div>
          <button type="button" onClick={() => handeleTypeTraining('')}>
            Заучивание
          </button>

          {cards.length > 3 && (
            <>
              <button type="button" onClick={() => handeleTypeTraining('SeveralAnswers')}>
                Варианты ответа
              </button>
              <button type="button" onClick={() => handeleTypeTraining('WriteAnswers')}>
                Напиши правильный ответ
              </button>
            </>
          )}
        </div>
      </div>
      <div className="actions_container">
        <div style={{ marginLeft: '260px' }}>
          {trainingOptions === 'SeveralAnswers' ? (
            <FourAnswerItem
              card={cards[cardIndex]}
              cards={cards}
              cardIndex={cardIndex}
              /* setCorrectAnswers={setCorrectAnswers} */
              input={input}
              setInput={setInput}
              setColorWords={setColorWords}
            />
          ) : (
            <div />
          )}
        </div>
        <div>
          {trainingOptions === 'WriteAnswers' ? (
            <TypeAnswerItem
              card={cards[cardIndex]}
              /*  setCorrectAnswers={setCorrectAnswers} */
              /* correctAnswers={correctAnswers} */
              input={input}
              setInput={setInput}
              setColorWords={setColorWords}
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
