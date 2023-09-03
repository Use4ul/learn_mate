import React, { useState, useEffect } from 'react';
import { RootState, useAppDispatch } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../reg/authSlice';
import { useSelector } from 'react-redux';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] =
    useState(''); /** проверка на корректность по стейту с выводом в p тег */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.userSingIn);

  const handleSubmitAuth: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
    navigate('/');
  };
  

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Вход</h1>
      <form onSubmit={handleSubmitAuth} className="login__form">
        {/** добавить обработчик на форму с учетом слайсера и редюсера */}
        <label>
          Введите email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="text"
            placeholder="Имя"
          />
        </label>
        <label>
          Пароль
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="text"
            placeholder="Пароль"
          />
        </label>
        <button className="btn login__btn" type="submit">
          Войти
        </button>
        <p className={loginCheck ? 'log__error' : 'log__error error-true'}>
          Неверный email или пароль
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
