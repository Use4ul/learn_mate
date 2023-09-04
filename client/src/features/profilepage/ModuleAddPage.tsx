import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import {
  addCardToModule,
  addModule,
} from './profileSlice';
import CardItem from '../carditem/CardItem';
import { loadCategories } from '../mainpage/slices/categoriesSlice';
import CardItemForProfilePage from './CardItemForProfilePage';

function ModuleAddPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const module = useSelector((store: RootState) => store.profile.module);
  console.log(module);

  const categories = useSelector((store: RootState) => store.categories.categories);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Все категории');

  const [cardTerm, setCardTerm] = useState('');
  const [cardDefinition, setCardDefinition] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardAudio, setCardAudio] = useState('');

  const handleModuleAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(addModule({ title, category }));
    setCardTerm('');
    setCardDefinition('');
    setCardImg('');
    setCardAudio('');
  };

  const handleCardAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(
      addCardToModule({
        term: cardTerm,
        definition: cardDefinition,
        img: cardImg,
        audio: cardAudio,
        module_id: module[0].id,
      }),
    );
  };

  useEffect(() => {
    dispatch(loadCategories());
  }, []);
  return (
    <>
      <form onSubmit={handleModuleAdd}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Все категории</option>{' '}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
        </select>
        <button type="submit">Добавить модуль</button>
      </form>

      {module.length && (
        <>
          <form onSubmit={handleCardAdd}>
            <input
              value={cardTerm}
              onChange={(e) => setCardTerm(e.target.value)}
              placeholder="термин"
            />
            <input
              value={cardDefinition}
              onChange={(e) => setCardDefinition(e.target.value)}
              placeholder="определение"
            />
            <input
              value={cardImg}
              onChange={(e) => setCardImg(e.target.value)}
              placeholder="изображение"
            />
            <input
              value={cardAudio}
              onChange={(e) => setCardAudio(e.target.value)}
              placeholder="аудио"
            />
            <button type="submit">Добавить карточку</button>
          </form>
          <div>
            {module[0].Cards.length &&
              module[0].Cards.map((card) => <CardItemForProfilePage card={card} />)}
          </div>
        </>
      )}
    </>
  );
}

export default ModuleAddPage;
