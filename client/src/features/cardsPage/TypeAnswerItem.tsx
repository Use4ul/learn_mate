import React, { useState } from 'react';
import { Card } from './types/types';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { sendAnswer } from './cardsSlice';

function TypeAnswerItem({
  card,
  correctAnswers,
  setCorrectAnswers,
}: {
  card: Card;
  correctAnswers: string;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [answer, setAnswer] = useState('');
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const dispatch = useAppDispatch();

  const handaleAnswer: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (answer.toLocaleLowerCase() === card.definition) {
      setCorrectAnswers('Правильно');
      setAnswer('');
      if (authUser) {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: true }));
      }
    } else {
      setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
      if (authUser) {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: false }));
      }
    }
  };

  return (
    <div>
      <form onSubmit={handaleAnswer}>
        <input
          type="text"
          placeholder="Ввести ответ"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit">Проверить</button>
      </form>
      <div>{correctAnswers}</div>
    </div>
  );
}

export default TypeAnswerItem;
