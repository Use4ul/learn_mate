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

  const modulesUser = useSelector((store: RootState) => store.profile.modules);

  const filteredModules =
    category !== 'Все категории'
      ? modules.filter((module) => module.Category.title === category)
      : modules;
  console.log(modules);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  useEffect(() => {
    dispatch(loadModules());
  }, [modulesUser]);

  return (
    <div className="main__container">
      <div className="main__select">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Все категории</option>{' '}
          {categories.map((el) => (
            <option key={el.id}>{el.title}</option>
          ))}
        </select>
      </div>
      <div className="main__wrapper">
        {filteredModules.map((module) => (
          <ModulItem key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
