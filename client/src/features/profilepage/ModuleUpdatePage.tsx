import React, { useEffect, useRef, useState } from 'react';
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

  /*
  const [cardTerm, setCardTerm] = useState('');
  const [cardDefinition, setCardDefinition] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardAudio, setCardAudio] = useState(''); */

  const handleModuleUpdate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(sendModuleToUpdate({ title, category, id }));
    setTitle('');
  };

  /*  const handleCardAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
  }; */

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

  const imgInput = useRef<HTMLInputElement>(null);
  const termInput = useRef<HTMLInputElement>(null);
  const definitionInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);
  const moduleInput = useRef<HTMLInputElement>(null);

  const handleCardAdd = (event: React.FormEvent): void => {
    event.preventDefault();
    const formData = new FormData();
    if (imgInput.current?.files?.length) {
      const img = imgInput.current.files[0];
      formData.append('img', img);
    }
    if (termInput.current?.value) {
      const term = termInput.current.value;
      formData.append('term', term);
    }
    if (definitionInput.current?.value) {
      const definition = definitionInput.current.value;
      formData.append('definition', definition);
    }
    if (audioInput.current?.value) {
      const audio = audioInput.current.value;
      formData.append('audio', audio);
    }
    if (moduleInput.current?.value) {
      const modulee = moduleInput.current.value;
      formData.append('module_id', modulee);
    }

    dispatch(addCardToModule(formData));
  };

  return (
    <>
      <form onSubmit={handleModuleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Все категории</option>

          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
        </select>
        <button type="submit" className="button">
          Обновить модуль
        </button>
      </form>
      {Boolean(module.length) && (
        <>
          <form onSubmit={handleCardAdd}>
            <input ref={termInput} placeholder="термин" />
            <input ref={definitionInput} placeholder="определение" />
            <input type="file" ref={imgInput} placeholder="изображение" />
            <input ref={audioInput} placeholder="аудио" />
            <input style={{ display: 'none' }} value={module[0].id} type="text" ref={moduleInput} />

            <button type="submit">Добавить карточку</button>
          </form>
          <div>
            {module.length && module[0].Cards.map((card) => <CardItemForProfilePage card={card} />)}
          </div>
        </>
      )}
    </>
  );
}

export default ModuleUpdateForm;
