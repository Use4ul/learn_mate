import { Card } from './types/types';

// аргументы: массив карточек из модуля + индекс нужной карточки

const getFourAnswers = (array: Card[], index: number): string[] => {
  const indexForCorrectAnswer = Math.floor(Math.random() * 3);

  const arrayOfIndexes: number[] = [];
  let i = 0;
  while (i < Math.min(3, array.length)) {
    const ind = Math.floor(Math.random() * array.length);
    if (!arrayOfIndexes.includes(ind) && ind !== index) {
      arrayOfIndexes.push(ind);
      i += 1;
    }
  }

  const result = [];

  for (let j = 0; j < arrayOfIndexes.length; j += 1) {
    result.push(array[arrayOfIndexes[j]].definition);
  }

  result.splice(indexForCorrectAnswer, 0, array[index].definition);

  return result;
};

export default getFourAnswers;
