import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCategories } from './slices/categoriesSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadModules } from '../modulitem/modulesSlice';

import './styles/style.scss';

function MainPage(): JSX.Element {
  const [category, setCategory] = useState('Все категории');

  const dispatch = useAppDispatch();

  const categories = useSelector((store: RootState) => store.categories.categories);
  const modules = useSelector((store: RootState) => store.modules.modules);

  const filteredModules =
    category !== 'Все категории'
      ? modules.filter((module) => module.Category.title === category)
      : modules;

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadModules());
  }, []);

  return (
    <div className="main__container">
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Все категории</option>{' '}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
          {/** добавить onchange на выбор опции */}
          {/** мапнем категории подтянутые с бэка */}
          {/* <option>Category1</option>
          <option>Category2</option> */}
        </select>
      </div>
      <div className="modules_wrapper">
        {filteredModules.map((module) => (
          <ModulItem key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
