import React from 'react';
import { Module } from './types/types';
import './styles/style.scss';

function ModulItem({ module }: { module: Module }): JSX.Element {
  return (
    <div className="module__container">
      <h3>{module.title}</h3>
      <button type="button">Добавить к себе</button>
      {/* добавить ховер  */}
    </div>
  );
}

export default ModulItem;
