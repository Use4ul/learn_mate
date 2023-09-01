import React from 'react';
import { Module } from './types/types';
import './styles/style.scss';

function ModulItem({ module }: { module: Module }): JSX.Element {
  return (
    <div className="module__container">
      <p>{module.title}</p>
      <button type="button">добавить к себе</button>
      {/* добавить ховер  */}
    </div>
  );
}

export default ModulItem;
