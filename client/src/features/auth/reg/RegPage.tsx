import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { signUp } from './authSlice';
import { fetchCheckEmail, fetchCheckNick, fetchSignUp } from '../log/api';

function RegPage(): JSX.Element {
  const [name, setName] = useState('');
  const [nickname, setNickName] =
    useState(
      '',
    ); /** проверка на уникальность по стейту с выводом в p тег, сразу при вводе пользователем */
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [regCheck, setRegCheck] = useState(false);

  const [role, setRole] = useState(2);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(signUp({ name, nickname, email, password, role }));
    
    navigate('/');
  };

  const checkEmail = async (): Promise<void> => {
    const data = await fetchCheckEmail(email);
    if (data.message === 'Такой пользователь уже существует') {
      setRegCheck(false);
    } else {
      setRegCheck(true);
    }
  };

  const nickCheck = async (): Promise<void> => {
    const data = await fetchCheckNick(nickname);
    if (data.message === 'success') {
      setNickNameCheck(true);
    } else {
      setNickNameCheck(false);
    }
  };

  useEffect(() => {
    nickCheck();
  }, [nickname]);

  useEffect(() => {
    checkEmail();
  }, [email]);

  return (
    <div>
      <h1>Зарегистрироваться</h1>
      <form onSubmit={handleSubmit} className="reg__form">
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
            value={nickname}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            name="nickname"
            type="text"
            placeholder="Ваш никнейм здесь"
          />
        </label>
        {!nickNameCheck && <p> Такой никнейм уже зарегистрирован</p>}
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
        <label>
          <select value={role} onChange={(e) => setRole(+e.target.value)}>
            <option disabled>Выберите:</option> <option value="2">Обычный пользователь</option>
            <option value="1">Учитель</option>
          </select>
        </label>

        <button className="btn login__btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      {!regCheck && <p> Уже зарегистрирован, войдите</p>}
    </div>
  );
}

export default RegPage;
