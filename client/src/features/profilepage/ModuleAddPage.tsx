import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { addCardToModule, addModule, clearModuleForUpdate } from './profileSlice';
import { loadCategories } from '../mainpage/slices/categoriesSlice';
import CardItemForProfilePage from './CardItemForProfilePage';

function ModuleAddPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const module = useSelector((store: RootState) => store.profile.module);

  const categories = useSelector((store: RootState) => store.categories.categories);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Языки');

  /*  const [cardTerm, setCardTerm] = useState('');
  const [cardDefinition, setCardDefinition] = useState('');
  const [cardImg, setCardImg] = useState('');
  const [cardAudio, setCardAudio] = useState(''); */

  const handleModuleAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(addModule({ title, category }));
    /*  setCardTerm('');
    setCardDefinition('');
    setCardImg('');
    setCardAudio(''); */
  };

  /*  const handleCardAdd: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
  }; */

  useEffect(() => {
    dispatch(loadCategories());
    return () => {
      dispatch(clearModuleForUpdate());
    };
  }, []);

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

    if (audioInput.current) audioInput.current.value = '';
    if (termInput.current) termInput.current.value = '';
    if (definitionInput.current) definitionInput.current.value = '';
    if (imgInput.current) imgInput.current.value = '';
  };

  return (
    <>
      <form onSubmit={handleModuleAdd}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {/* <option disabled>Все категории</option>{' '} */}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
        </select>
        <button type="submit">Добавить модуль</button>
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
            {Boolean(module[0].Cards.length) &&
              module[0].Cards.map((card) => <CardItemForProfilePage card={card} />)}
          </div>
        </>
      )}
    </>
  );
}

export default ModuleAddPage;
