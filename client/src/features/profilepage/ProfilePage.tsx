import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUser } from './profileSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadGroups } from '../grouppage/slices/groupsSlice';
import GroupItem from '../groupItem/GroupItem';

function ProfilePage(): React.JSX.Element {
  /* const [search, setSearch] = useState(''); */
  const navigate = useNavigate();

  const modules = useSelector((store: RootState) => store.profile.modules);

  const grops = useSelector((store: RootState) => store.groups.groups);

  const { userId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadModulesForUser(Number(userId)));
    dispatch(loadGroups());
  }, []);

  return (
    <div className="profile__container">
      <div>

        <div>
          <Link to={`/profile/${userId}/statistics`}>
            <button type="button">Статистика</button>
          </Link>
        </div>
        <div>
          <label>
            Поиск по своим модулям
            <br />
            <input placeholder="введите название модуля" />
          </label>
        </div>


        <div className="profile__module">
          <div>
            <Link to="/modules/add">
              <button type="button">Создать новый модуль</button>
            </Link>
          </div>

          {modules.map((module) => (
            <div>
              <ModulItem key={module.id} module={module} />
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
}

export default ProfilePage;
