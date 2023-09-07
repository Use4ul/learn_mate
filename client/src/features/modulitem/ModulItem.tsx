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
  /* const navigate = useNavigate(); */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((store: RootState) => store.auth.authUser);

  const handleDeleteModule: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    dispatch(deleteModule(module.id));
    console.log(e);
  };

  return (
    <div className="container_wrapper" onClick={() => navigate(`/modules/${module.id}`)}>
      {/* <Link to={`/modules/${module.id}`}> */}
      <h2>{module.title}</h2>
      {/* onClick={() => navigate(`/modules/${module.id}`)}> */}

      {module.user_id === user?.id && (
        <>
          <button type="button" onClick={(e) => e.stopPropagation()}>
            <Link to={`/profile/${module.user_id}/modules/${module.id}`}>Изменить</Link>
          </button>
          <button type="button" onClick={handleDeleteModule}>
            Удалить
          </button>
          {user && user.role_id === 1 ? (
            <button type="button" onClick={(e) => e.stopPropagation()}>
              <Link to={`/modules/${module.id}/task`}>Назначить модуль группе</Link>
            </button>
          ) : (
            <div />
          )}
        </>
      )}
      {/* </Link> */}
    </div>
  );
}

export default ModulItem;
