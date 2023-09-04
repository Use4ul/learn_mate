import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUser } from './profileSlice';
import { useParams } from 'react-router-dom';
import ModulItem from '../modulitem/ModulItem';

function ProfilePage(): JSX.Element {
  const [search, setSearch] = useState('');

  const modules = useSelector((store: RootState) => store.profile.modules);

  console.log(modules);

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadModulesForUser(Number(userId)));
  }, []);

  return (
    <div className="profile__container">
      <div>
        <input value={search} placeholder="введите название модуля" />

        <div className="profile__module">
          <div>
            <button type="button">Создать новый модуль</button>
          </div>

          {modules.map((module) => (
            <div>
              <ModulItem key={module.id} module={module} />
            </div>
          ))}
        </div>
      </div>
      <div>
        {/* <button type="button"> назначить модуль для обучения</button> */}
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
