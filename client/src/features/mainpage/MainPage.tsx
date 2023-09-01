import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadCategories } from './categoriesSlice';
import { useSelector } from 'react-redux';

function MainPage(): JSX.Element {
  const [category, setCategory] = useState('');

  const dispatch = useAppDispatch();

  const categories = useSelector((store: RootState) => store.categories.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  return (
    <div className="main__container">
      <div className="main__container-filter">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((el) => (
            <option>{el.title}</option>
          ))}
          {/** добавить onchange на выбор опции */}
          {/** мапнем категории подтянутые с бэка */}

          {/* <option>Category1</option>
          <option>Category2</option> */}
        </select>
      </div>
      <div className="main__container-modules">{/** мапнем модуль айтем с учетом value */}</div>
    </div>
  );
}

export default MainPage;
