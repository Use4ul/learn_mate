import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCategories } from './slices/categoriesSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadModules } from '../modulitem/modulesSlice';
import { loadCards } from '../cardsPage/cardsSlice';

function MainPage(): JSX.Element {
  const [category, setCategory] = useState('');

  const dispatch = useAppDispatch();

  const categories = useSelector((store: RootState) => store.categories.categories);
  const modules = useSelector((store: RootState) => store.modules.modules);

  const filteredModules = category
    ? modules.filter((module) => module.Category.title === category)
    : modules;

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadModules());
  }, []);

  return (
    <div className="main__container">
      <div className="main__container-filter">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option disabled>Выберите категорию</option>{' '}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
          {/** добавить onchange на выбор опции */}
          {/** мапнем категории подтянутые с бэка */}
          {/* <option>Category1</option>
          <option>Category2</option> */}
        </select>
      </div>
      <div className="main__container-modules">
        {' '}
        {filteredModules.map((module) => (
          <ModulItem key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
