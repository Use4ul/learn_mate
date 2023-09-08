import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './types/types';
import { RootState, useAppDispatch } from '../../redux/store';
import { sendAnswer, setFlagForUpdate } from '../carditem/progressSlice';

function TypeAnswerItem({
  card,
  /* correctAnswers,
  setCorrectAnswers, */
  input,
  setInput,

  setColorWords,
}: {
  card: Card;
  /* correctAnswers: string;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>; */
  input: Boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;

  setColorWords: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [answer, setAnswer] = useState('');

  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const dispatch = useAppDispatch();

  const handaleAnswer: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (authUser) {
      // setCorrectAnswers('Правильно');
      if (answer.toLowerCase() === card.definition.toLowerCase()) {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: true }));
        dispatch(setFlagForUpdate());
      } else {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: false }));
        dispatch(setFlagForUpdate());
      }
      // setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
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
    <div className="cards__inputAnswer" style={{ marginLeft: '-155px' }}>
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
