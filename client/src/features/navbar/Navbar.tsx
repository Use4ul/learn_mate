/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import './styles/style.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchLogOut } from '../auth/log/api';
import { checkUser } from '../auth/reg/authSlice';
import useTheme from '../../hooks/useTheme';

function Navbar(): JSX.Element {
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async (): Promise<void> => {
    const data = await fetchLogOut();
    if (data.message === 'success') {
      dispatch({ type: 'auth/logout' });
      navigate('/');
    }
  };

  const { theme, setTheme } = useTheme();
  const [themeName, setThemeName] = useState('Темная тема');

  const themeFunc = () => {
    theme === 'dark' ? setTheme('ligth') : setTheme('dark');
    theme === 'dark' ? setThemeName('Светлая тема') : setThemeName('Темная тема');
  };

  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>
            <li onClick={themeFunc}>{themeName}</li>
            {authUser ? (
              <>
                <li>
                  <NavLink to={`/profile/${authUser.id}/modules`}>Моя страница</NavLink>
                </li>
                <li>
                  <a href="/profile_page">{authUser.name}</a>
                </li>
                <li>
                  <NavLink to="/">
                    <a
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Выход
                    </a>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/auth/register">Регистрация</NavLink>
                </li>
                <li>
                  <NavLink to="/auth/log">Авторизация</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
