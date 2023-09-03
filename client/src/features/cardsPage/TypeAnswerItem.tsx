import React, { useState } from 'react';
import { Card } from './types/types';

function TypeAnswerItem({ card }: { card: Card }): JSX.Element {
  const [answer, setAnswer] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const handaleAnswer: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (answer.toLocaleLowerCase() === card.definition) {
      setCorrectAnswers('Правильно');
      setAnswer('');
    } else {
      setCorrectAnswers(`Неверно. Ответ: ${card.definition}`);
    }
  };

  return (
    <div>
      <form onSubmit={handaleAnswer}>
        <input
          type="text"
          placeholder="твой ответ здесь"
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
