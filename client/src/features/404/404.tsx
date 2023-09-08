import React from 'react';
import gif from '../../App/gif.gif';

function Error(): React.JSX.Element {
  return (
    <div id="page404">
      <h1>Такой страницы не существует</h1>
      <img src={gif} alt="" />
    </div>
  );
}

export default Error;
