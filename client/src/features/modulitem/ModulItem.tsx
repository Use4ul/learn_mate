/* eslint-disable no-undef */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Module } from './types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteModule } from '../profilepage/profileSlice';
import { ModuleWithCards } from '../profilepage/types/type';

function ModulItem({ module }: { module: Module | ModuleWithCards }): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((store: RootState) => store.auth.authUser);

  const handleDeleteModule: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.nativeEvent.stopPropagation();
    console.log(e);
    // dispatch(deleteModule(module.id));
  };

  return (
    <div className="container_wrapper">
      <Link to={`/modules/${module.id}`}>
        <h2>{module.title}</h2>
        {/* onClick={() => navigate(`/modules/${module.id}`)}> */}

        {module.user_id === user?.id && (
          <>
            <Link to={`/profile/${module.user_id}/modules/${module.id}`}>
              <button type="button">
                Изменить
                {/* <a href={`/profile/${module.user_id}/modules/${module.id}`}>изменить</a> */}
              </button>
            </Link>
            <button type="button" onClick={handleDeleteModule}>
              Удалить
            </button>
            {user && user.role_id === 1 ? (

              <Link to={`/modules/${module.id}/task`}>
                <button type="button"> Назначить модуль группе</button>
              </Link>

            ) : (
              <div />
            )}
          </>
        )}
      </Link>
    </div>
  );
}

export default ModulItem;
