import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUser } from './profileSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadGroups } from '../grouppage/slices/groupsSlice';
import GroupItem from '../groupItem/GroupItem';
import './styles/style.scss';

function ProfilePage(): React.JSX.Element {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const modules = useSelector((store: RootState) => store.profile.modules);
  const grops = useSelector((store: RootState) => store.groups.groups);
  const user = useSelector((store: RootState) => store.auth.authUser);

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    dispatch(loadModulesForUser(Number(userId)));
    dispatch(loadGroups());
  }, []);

  return (
    <div className="profile__container">
      <div className="profile__buttons">
        <button type="button">
          <Link to={`/profile/${userId}/statistics`}>Статистика</Link>
        </button>

        <button type="button">
          <Link to={`/profile/${userId}/statistics`}> назначенные модули</Link>
        </button>

        <div>
          <button type="button">
            <Link to="/modules/add">Создать новый модуль</Link>
          </button>
        </div>
      </div>

      <div className="profile__input">
        <label>
          Поиск по своим модулям
          <br />
          <input
            value={search}
            placeholder="Введите название модуля"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="profile__modulesOne">
        {filteredModules.length ? (
          filteredModules.map((module) => (
            <div className="profile__modules">
              <ModulItem key={module.id} module={module} />
            </div>
          ))
        ) : (
          <div>Ничего не найдено</div>
        )}
      </div>

      {user?.role_id === 1 && (
        <div>
          <button type="button" onClick={() => navigate('/newGrop')}>
            Создать новую группу
          </button>
          {/* <button type="button"> назначить модуль для обучения</button> */}
          <div>
            <div>
              <div className="profile__grups">
                {Boolean(grops.length) && grops.map((elGroup) => <GroupItem elGroup={elGroup} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
