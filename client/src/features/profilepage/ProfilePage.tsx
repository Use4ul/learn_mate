import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUser } from './profileSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadGroups } from '../grouppage/slices/groupsSlice';
import GroupItem from '../groupItem/GroupItem';

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
      <div>
        <div>
          {/* <Link to={`/profile/${userId}/statistics`}> */}
          <button type="button">
            <a href={`/profile/${userId}/statistics`}>Статистика</a>
            {/* <Link to={`/profile/${userId}/statistics`} />  */}
          </button>
          {/* </Link> */}

          {/* <Link to={`/profile/${userId}/statistics`}> */}
          <button type="button">
            <a href={`/profile/${userId}/modules`}>Мои назначенные модули</a>
            {/* <Link to={`/profile/${userId}/statistics`} />  */}
          </button>
          {/* </Link> */}
        </div>

        <div className="profile__module">
          <div>
            {/* <Link to="/modules/add"> */}
            <button type="button">
              <a href="/modules/add">Создать новый модуль</a>
            </button>
            {/* </Link> */}
          </div>

          <div>
            <label>
              Поиск по своим модулям
              <br />
              <input
                value={search}
                placeholder="введите название модуля"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </label>
          </div>

          {filteredModules.length ? (
            filteredModules.map((module) => (
              <div>
                <ModulItem key={module.id} module={module} />
              </div>
            ))
          ) : (
            <div>Ничего не найдено</div>
          )}
        </div>
      </div>
      {user?.role_id === 1 && (
        <div>
          <button type="button" onClick={() => navigate('/newGrop')}>
            Создать новую группу
          </button>
          {/* <button type="button"> назначить модуль для обучения</button> */}
          <div className="profil__grups">
            <div>
              <div>
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
