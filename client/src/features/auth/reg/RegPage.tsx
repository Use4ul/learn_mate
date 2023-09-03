import React, { useState } from 'react';
import './styles/style.scss';

function RegPage(): JSX.Element {
  const [name, setName] = useState('');
  const [nickName, setNickName] =
    useState(
      '',
    ); /** проверка на уникальность по стейту с выводом в p тег, сразу при вводе пользователем */
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickNameCheck, setNickNameCheck] = useState(true);
  const [regCheck, setRegCheck] =
    useState(''); /** проверка на уникальность по стейту с выводом в p тег */

  return (
    <div>
      <form className="reg__form">
      <h1>Регистрация</h1>
        {/** добавить обработчик на форму с учетомч слайсера и редюсера */}
        <label>
          Имя
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            placeholder="Ваше имя здесь"
          />
        </label>
        <label>
          Никнейм
          <input
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            name="nickName"
            type="text"
            placeholder="Ваш никнейм здесь"
          />
        </label>
        <p className={nickNameCheck ? 'reg__nick-error' : 'reg__error error-true'}>
          Такой никнейм уже зарегистрирован
        </p>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="text"
            placeholder="Ваш Email здесь"
          />
        </label>
        <label>
          Пароль
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="text"
            placeholder="Ваш пароль здесь"
          />
        </label>
        <button className="btn login__btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className={regCheck ? 'reg__error' : 'reg__error error-true'}>
        Уже зарегистрирован, войдите
      </p>
    </div>
  );
}

export default RegPage;
