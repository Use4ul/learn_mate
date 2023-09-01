import React from 'react';

function ModulItem(): JSX.Element {
  return (
    <div className="module__container">
      <div>
        <select>
          <option value="">Английский язык</option>
          <option value="">История</option>
        </select>
      </div>
      <div>
        <div>
          <p>Тема модуля</p>
          <button type="button">добавить к себе</button>
          {/* добавить ховер  */}
        </div>
      </div>
    </div>
  );
}

export default ModulItem;
