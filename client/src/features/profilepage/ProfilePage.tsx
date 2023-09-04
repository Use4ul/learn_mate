import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { group } from 'console';
import { RootState, useAppDispatch } from '../../redux/store';
import { loadModulesForUser } from './profileSlice';
import ModulItem from '../modulitem/ModulItem';
import { loadGroups } from '../grouppage/slices/groupsSlice';
import GroupItem from '../groupItem/GroupItem';

function ProfilePage(): JSX.Element {
  const [search, setSearch] = useState('');
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
        <button type="button" onClick={() => navigate('/newGrop')}>
          Создать новую группу
        </button>
        {/* <button type="button"> назначить модуль для обучения</button> */}
        <div className="profil__grups">
          <div>
            <div>
              {grops.map((elGroup) => (
                <GroupItem elGroup={elGroup} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
