import React, { useEffect } from 'react';
import './styles/style.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchLogOut } from '../auth/log/api';
import { checkUser } from '../auth/reg/authSlice';

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

            {authUser ? (
              <>
                <li>{authUser.name}</li>
                <li>
                  <NavLink to="/">
                    <button
                      type="button"
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      Выход
                    </button>
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
