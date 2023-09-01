import React from 'react';
import './styles/style.scss';
import { NavLink, Outlet } from 'react-router-dom';

function Navbar(): JSX.Element {
  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/profile_page">Пользователь</NavLink>
            </li>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li>
              <NavLink to="/auth/register">Регистрация</NavLink>
            </li>
            <li>
              <NavLink to="/auth/log">Авторизация</NavLink>
            </li>
            <li>
              <NavLink to="/">Выход</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
