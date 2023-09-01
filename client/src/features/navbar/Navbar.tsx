import React from 'react';
import './styles/style.scss';

function Navbar(): JSX.Element {
  return (
    <nav>
      <div>Пользователь</div>
      <div>
        <ul>
          <li>Регистрация</li>
          <li>Авторизация</li>
          <li>Выход</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
