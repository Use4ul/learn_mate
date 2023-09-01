import React, { useState } from 'react';

function MainPage(): JSX.Element {
  const [category, setCategory] = useState('');
  return (
    <div className="main__container">
      <div className="main__container-filter">
        <select value={category}>
          {/** добавить onchange на выбор опции */}
          {/** мапнем категории подтянутые с бэка */}

          <option>Category1</option>
          <option>Category2</option>
        </select>
      </div>
      <div className="main__container-modules">{/** мапнем модуль айтем с учетом value */}</div>
    </div>
  );
}

export default MainPage;
