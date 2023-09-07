import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from './types/types';
import getFourAnswers from './getForAnswers';
import './styles/style.scss';
import { sendAnswer, setFlagForUpdate } from '../carditem/progressSlice';
import { RootState, useAppDispatch } from '../../redux/store';

function FourAnswerItem({
  cards,
  cardIndex,
  card,
  /*  setCorrectAnswers, */
  input,
  setInput,

  setColorWords,
}: {
  cards: Card[];
  cardIndex: number;
  card: Card;
  /* setCorrectAnswers: React.Dispatch<React.SetStateAction<string>>; */
  input: Boolean;
  setInput: React.Dispatch<React.SetStateAction<boolean>>;

  setColorWords: React.Dispatch<React.SetStateAction<string>>;
}): React.JSX.Element {
  // const [answer, setAnswer] = useState('');
  const arrAnswers = useMemo(() => getFourAnswers(cards, cardIndex), []);

  const dispatch = useAppDispatch();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  const handeleAnswer = (answer: string): void => {
    if (authUser) {
      if (answer === card.definition) {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: true }));
        dispatch(setFlagForUpdate());
      } else {
        dispatch(sendAnswer({ user_id: authUser.id, card_id: card.id, isCorrect: false }));
        dispatch(setFlagForUpdate());
      }
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

  // onSubmit={handeleAnswer}
  return (
    <>
      <form>
        <div className="cards__answers">
          {arrAnswers.map((el) => (
            <button
              type="button"
              onClick={() => {
                changeCard();
                handeleAnswer(el);
              }}
            >
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
