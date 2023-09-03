/* eslint-disable no-undef */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Module } from './types/types';
import './styles/style.scss';

function ModulItem({ module }: { module: Module }): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="container_wrapper">
      <Link to={`/modules/${module.id}`}>
        <h2>{module.title}</h2>
        {/* onClick={() => navigate(`/modules/${module.id}`)}> */}
        {/* добавить ховер  */}
      </Link>
      <button className="btn-rel" type="button">
        Добавить к себе
      </button>
    </div>
  );
}

export default ModulItem;
