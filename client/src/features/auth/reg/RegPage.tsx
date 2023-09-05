import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { signUp } from './authSlice';
import { fetchCheckEmail, fetchCheckNick } from '../log/api';

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
    <div className="form_wrapper">
      <form onSubmit={handleSubmit} className="reg__form">
        <h1>Регистрация</h1>
        {/** добавить обработчик на форму с учетомч слайсера и редюсера */}
        <div>
          <label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="text"
              placeholder="Ваше имя здесь"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={nickname}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              name="nickname"
              type="text"
              placeholder="Никнейм"
            />
          </label>
        </div>
        {!nickNameCheck && <p> Такой никнейм уже зарегистрирован</p>}
        <div>
          <label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              placeholder="Email"
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
              placeholder="Ваш пароль здесь"
            />
          </label>
        </div>
        <div>
          <label>
            <select value={role} onChange={(e) => setRole(+e.target.value)}>
              <option disabled>Выберите:</option> <option value="2">Обычный пользователь</option>
              <option value="1">Учитель</option>
            </select>
          </label>
        </div>

        <button className="btn login__btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      {!regCheck && <p> Уже зарегистрирован, войдите</p>}
    </div>
  );
}

export default RegPage;
