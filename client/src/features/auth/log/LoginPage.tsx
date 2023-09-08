import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../redux/store';
import { clearError, signIn } from '../reg/authSlice';
import './styles/style.scss';

function LoginPage(): JSX.Element {
  const { error, authUser } = useSelector((store: RootState) => store.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  /* const [loginCheck, setLoginCheck] =
    useState('');  */ /** проверка на корректность по стейту с выводом в p тег */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  /* const user = useSelector((store: RootState) => store.auth.authUser); */

  const handleSubmitAuth: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
    dispatch(clearError());
  };

  const changeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };
  const changePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);

    dispatch(clearError());
  };

  const togglePassword = (): void => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmitAuth}>
        <h1>Вход</h1>
        {/** добавить обработчик на форму с учетом слайсера и редюсера */}
        <div className="input-group">
          <input
            className="input"
            value={email}
            onChange={changeEmail}
            name="email"
            type="text"
            placeholder=" "
          />
          <label
            style={{ visibility: email ? 'hidden' : 'visible' }}
            id="loglog"
            className="placeholder"
          >
            Ваш Email
          </label>
        </div>
        <div className="input-group">
          <input
            className="input"
            value={password}
            onChange={changePassword}
            name="password"
            type={passwordShown ? 'text' : 'password'}
            placeholder=" "
          />
          <label
            style={{ visibility: password ? 'hidden' : 'visible' }}
            id="loglog"
            className="placeholder"
          >
            Ваш пароль{' '}
          </label>
          <i
            className="password-control"
            onClick={togglePassword}
            style={{ top: '44px', left: '340px' }}
          />
        </div>
        <button className="btn login__btn" type="submit">
          Войти
        </button>
        {/*  <p className={loginCheck ? 'log__error' : 'log__error error-true'}>
          Неверный email или пароль
        </p> */}
        {error && <span> {error} </span>}
      </form>
    </div>
  );
}

export default LoginPage;
