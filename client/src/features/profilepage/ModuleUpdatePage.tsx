import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import {
  addCardToModule,
  clearModuleForUpdate,
  loadModulesForUserToUpdate,
  sendModuleToUpdate,
} from './profileSlice';
import { ModuleId } from '../modulitem/types/types';
import { loadCategories } from '../mainpage/slices/categoriesSlice';
import CardItemForProfilePage from './CardItemForProfilePage';

function ModuleUpdateForm(): React.JSX.Element {
  const { moduleId } = useParams();

  let id: ModuleId;
  if (moduleId) {
    id = +moduleId;
  }

  const dispatch = useAppDispatch();

  const module = useSelector((store: RootState) => store.profile.module);

  const categories = useSelector((store: RootState) => store.categories.categories);

  const [title, setTitle] = useState(`${module.length > 0 ? module[0].title : ''}`);
  const [category, setCategory] = useState(
    `${module.length > 0 ? module[0].Category?.title : 'Все категории'}`,
  );

  console.log(module);

  console.log(title);
  console.log(category);

  const [cardTerm, setCardTerm] = useState('');
  const [cardDefinition, setCardDefinition] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardAudio, setCardAudio] = useState('');

  const handleModuleUpdate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(sendModuleToUpdate({ title, category, id }));
    setTitle('');
  };

  const handleCardAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(
      addCardToModule({
        term: cardTerm,
        definition: cardDefinition,
        img: cardImg,
        audio: cardAudio,
        module_id: id,
      }),
    );
    setCardTerm('');
    setCardDefinition('');
    setCardImg('');
    setCardAudio('');
  };

  useEffect(() => {
    dispatch(loadModulesForUserToUpdate(id));
    dispatch(loadCategories());
    return () => {
      dispatch(clearModuleForUpdate());
    };
  }, []);

  useEffect(() => {
    if (module.length) {
      setTitle(module[0].title);
      setCategory(module[0].Category.title);
    }
  }, [module]);

  return (
    <>
      <form onSubmit={handleModuleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Все категории</option>{' '}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
        </select>
        <button type="submit">обновить данные модуля</button>
      </form>
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
        {module.length && module[0].Cards.map((card) => <CardItemForProfilePage card={card} />)}
      </div>
    </>
  );
}

export default ModuleUpdateForm;
