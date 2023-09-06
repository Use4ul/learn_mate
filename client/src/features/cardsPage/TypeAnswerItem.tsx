import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './types/types';
import { RootState, useAppDispatch } from '../../redux/store';
import { sendAnswer } from '../carditem/progressSlice';

function TypeAnswerItem({
  card,
  correctAnswers,
  setCorrectAnswers,
  input,
  setInput,

  setColorWords,
}: {
  card: Card;
  correctAnswers: string;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>;
  input: Boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;

  setColorWords: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [answer, setAnswer] = useState('');

  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const dispatch = useAppDispatch();

  const handaleAnswer: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === card.definition.toLowerCase()) {
      // setCorrectAnswers('Правильно');
      setAnswer('');
      if (authUser) {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: true }));
      }
    }
    // setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
    if (authUser) {
      dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: false }));
      setAnswer('');
    }
  };
  const changeCard = (): void => {
    setInput((prev) => !prev);
    setColorWords('#fff');
  };
  useEffect(() => {
    setInput(true);
    setColorWords('#222');
  }, [card]);

  return (
    <div className="cards__inputAnswer">
      <form className="cards__inputInput" onSubmit={handaleAnswer}>
        <input
          type="text"
          placeholder="Ввести ответ"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" onClick={() => changeCard()}>
          Проверить
        </button>
      </form>
      <input className="card__check-input" checked={!input} onChange={changeCard} type="checkbox" />
    </div>
  );
}

export default TypeAnswerItem;
