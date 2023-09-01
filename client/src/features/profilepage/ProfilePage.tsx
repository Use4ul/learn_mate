
import React, { useState } from 'react';

function ProfilePage(): JSX.Element {
  const [search, setSearch] = useState('');
  return (
    <div className="profil__container">
      <div>
        <input value={search} placeholder="введите название модуля" />

        <div className="profil__module">
          <div>
            <button type="button">Создать новый модуль</button>
          </div>
          <div>
            <div>Название</div>
            <button type="button"> изменить</button>
            <button type="button"> удалить</button>
            <button type="button"> Назначить модуль группе</button>
          </div>
        </div>
      </div>
      <div>
        <button type="button"> назначить модуль для обучения</button>
        <div className="profil__grups">
          <div>
            <div>Название группы</div>
            <button type="button"> изменить</button>
            <button type="button"> удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
