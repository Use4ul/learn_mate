import React, { useEffect, useMemo, useState } from 'react';
import { Card } from './types/types';
import getFourAnswers from './getForAnswers';

function FourAnswerItem({
  cards,
  cardIndex,
  card,
  setCorrectAnswers,
  input,
  setInput,

  setColorWords,
}: {
  cards: Card[];
  cardIndex: number;
  card: Card;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>;
  input: Boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;

  setColorWords: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  // const [answer, setAnswer] = useState('');
  const arrAnswers = useMemo(() => getFourAnswers(cards, cardIndex), []);
  console.log(input);

  const handeleAnswer: React.FormEventHandler<HTMLFormElement> = (): void => {
    // if (answer === card.definition) {
    //   setCorrectAnswers('Правильно');
    //   console.log(answer);
    // } else {
    //   setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
    // }
  };
  const changeCard = (): void => {
    setInput((prev) => !prev);
    setColorWords('#fff');
  };
  useEffect(() => {
    setInput(true);
    setColorWords('#222');
  }, [card]);

  // onSubmit={handeleAnswer}
  return (
    <>
      <form onSubmit={handeleAnswer}>
        <div>
          {arrAnswers.map((el) => (
            <button type="button" onClick={() => changeCard()}>
              {el}
            </button>
          ))}
        </div>
      </form>
      <div>
        <input
          className="card__check-input"
          checked={!input}
          onChange={changeCard}
          type="checkbox"
        />
      </div>
    </>
  );
}

export default FourAnswerItem;
