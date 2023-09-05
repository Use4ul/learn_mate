import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { signIn } from '../reg/authSlice';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [loginCheck, setLoginCheck] =
    useState('');  *//** проверка на корректность по стейту с выводом в p тег */
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  /* const user = useSelector((store: RootState) => store.auth.authUser); */

  const handleSubmitAuth: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
    navigate('/');
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmitAuth}>
        <h1>Вход</h1>
        {/** добавить обработчик на форму с учетом слайсера и редюсера */}
        <div>
          <label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Имя"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="text"
              placeholder="Пароль"
            />
          </label>
        </div>
        <button className="btn login__btn" type="submit">
          Войти
        </button>
       {/*  <p className={loginCheck ? 'log__error' : 'log__error error-true'}>
          Неверный email или пароль
        </p> */}
      </form>
    </div>
  );
}

export default LoginPage;
