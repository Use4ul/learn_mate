import React, { useMemo, useState } from 'react';
import { Card } from './types/types';
import getFourAnswers from './getForAnswers';
import './styles/style.scss';

function FourAnswerItem({
  cards,
  cardIndex,
  card,
  setCorrectAnswers,
}: {
  cards: Card[];
  cardIndex: number;
  card: Card;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [answer, setAnswer] = useState('');
  const arrAnswers = useMemo(() => getFourAnswers(cards, cardIndex), []);

  const handeleAnswer: React.MouseEventHandler<HTMLFormElement> = (): void => {
    if (answer === card.definition) {
      setCorrectAnswers('Правильно');
      console.log(answer);
    } else {
      setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
    }
  };

  return (
    <>
      <form onSubmit={handeleAnswer}>
        <div className="cards__answers">
          {arrAnswers.map((el) => (
            <button type="button" onClick={() => setAnswer(el)}>
              {el}
            </button>
          ))}
        </div>
      </form>
      <div>{answer === card.definition && 'Верно'}</div>
    </>
  );
}

export default FourAnswerItem;
