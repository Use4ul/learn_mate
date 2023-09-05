/* eslint-disable no-undef */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Module } from './types/types';
import './styles/style.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { deleteModule } from '../profilepage/profileSlice';

function ModulItem({ module }: { module: Module }): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector((store: RootState) => store.auth.authUser);

  const handleDeleteModule: React.MouseEventHandler<HTMLButtonElement> = async () => {
    dispatch(deleteModule(module.id));
    navigate('/');
  };

  return (
    <div className="container_wrapper">
      <Link to={`/modules/${module.id}`}>
        <h2>{module.title}</h2>
        {/* onClick={() => navigate(`/modules/${module.id}`)}> */}
        {module.user_id === user?.id ? (
          <>
            <Link to={`/profile/${module.user_id}/modules/${module.id}`}>
              <button type="button"> изменить</button>
            </Link>
            <button type="button" onClick={handleDeleteModule}>
              {' '}
              удалить
            </button>
            <button type="button"> Назначить модуль группе</button>
          </>
        ) : (
          <button className="btn-rel" type="button">
            добавить к себе
          </button>
        )}

        {/* добавить ховер  */}
      </Link>
    </div>
  );
}

export default ModulItem;
