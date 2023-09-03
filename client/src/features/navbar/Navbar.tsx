import React from 'react';
import './styles/style.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { logOut } from '../auth/reg/authSlice';

function Navbar(): JSX.Element {
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async (): Promise<void> => {
    dispatch(logOut());
    navigate('/');
  };

  console.log(authUser);

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
                <li>{authUser.name}</li>
                <li>
                  <NavLink to="/profile_page">Пользователь</NavLink>
                </li>
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
