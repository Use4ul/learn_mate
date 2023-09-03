import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Module } from './types/types';
import './styles/style.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

function ModulItem({ module }: { module: Module }): JSX.Element {
  const navigate = useNavigate();

  const user = useSelector((store: RootState) => store.auth.authUser);

  return (
    <Link to={`/modules/${module.id}`}>
      <div className="module__container">
        {/* onClick={() => navigate(`/modules/${module.id}`)}> */}
        <h3>{module.title}</h3>
        {module.user_id === user?.id ? (
          <>
            <button type="button"> изменить</button>
            <button type="button"> удалить</button>
            <button type="button"> Назначить модуль группе</button>
          </>
        ) : (
          <button type="button">добавить к себе</button>
        )}

        {/* добавить ховер  */}
      </div>
    </Link>
  );
}

export default ModulItem;
