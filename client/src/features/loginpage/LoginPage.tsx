import React, { useState } from 'react';

function LoginPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginCheck, setLoginCheck] = useState(''); /** проверка на корректность по стейту с выводом в p тег */

  return (
    <div>
      <h1>Вход</h1>
      <form className="login__form">
        {/** добавить обработчик на форму с учетом слайсера и редюсера */}
        <label>
          Введите email
          <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" placeholder="Имя" />
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
        <p className={loginCheck ? 'log__error' : 'log__error error-true'}>Неверный email или пароль</p>
      </form>
    </div>
  );
}

export default LoginPage;
