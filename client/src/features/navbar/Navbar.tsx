/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import './styles/style.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { logOut } from '../auth/reg/authSlice';
import useTheme from '../../hooks/useTheme';

function Navbar(): JSX.Element {
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async (): Promise<void> => {
    dispatch(logOut());
    navigate('/');
  };

  const { theme, setTheme } = useTheme();
  theme;
  const [themeName, setThemeName] = useState('🌚');
  const themeFunc = () => {
    localStorage.userTheme === 'Темная тема' ? setTheme('Светлая тема') : setTheme('Темная тема');
    localStorage.userTheme === 'Темная тема' ? setThemeName('🌚') : setThemeName('🔆');
  };

  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <NavLink to="/">Главная</NavLink>
            </li>

            {authUser ? (
              <>
                <li>
                  <NavLink to={`/profile/${authUser.id}`}>Мой кабинет</NavLink>
                </li>
                <li>{authUser.name}</li>
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

            <button className="themeBtn" onClick={themeFunc}>
              {themeName}
            </button>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
