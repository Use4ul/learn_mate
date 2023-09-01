import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Module } from './types/types';
import './styles/style.scss';

function ModulItem({ module }: { module: Module }): JSX.Element {
  const navigate = useNavigate();

  return (
    <Link to={`/modules/${module.id}`}>
      <div className="module__container">
        {/* onClick={() => navigate(`/modules/${module.id}`)}> */}

        <p>{module.title}</p>
        <button type="button">добавить к себе</button>
        {/* добавить ховер  */}
      </div>
    </Link>
  );
}

export default ModulItem;
