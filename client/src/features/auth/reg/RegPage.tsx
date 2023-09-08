import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/store';
import { clearError, signUp } from './authSlice';
import { fetchCheckNick } from '../log/api';
import './styles/style.scss';

function RegPage(): JSX.Element {
  const { error, authUser } = useSelector((store: RootState) => store.auth);
  const [name, setName] = useState('');
  const [nickname, setNickName] =
    useState(
      '',
    ); /** проверка на уникальность по стейту с выводом в p тег, сразу при вводе пользователем */
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const [role, setRole] = useState(2);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(signUp({ name, nickname, email, password, role_id: role }));
  };

  const nickCheck = async (): Promise<void> => {
    const data = await fetchCheckNick(nickname);
    if (data.message === 'success') {
      setNickNameCheck(true);
    } else {
      setNickNameCheck(false);
    }
  };

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };
  const togglePassword = (): void => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    nickCheck();
  }, [nickname]);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit} className="reg__form form">
        <h1>Регистрация</h1>
        {/** добавить обработчик на форму с учетомч слайсера и редюсера */}
        <div className="input-group">
          <input
            className="reg__input input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            type="text"
            placeholder=" "
          />
          <label
            style={{ visibility: name ? 'hidden' : 'visible' }}
            id="regreg"
            className="placeholder"
          >
            Ваше имя
          </label>
        </div>
        <div className="input-group">
          {!nickNameCheck && (
            <p
              style={{
                margin: '-8px',
                position: 'absolute',
                fontSize: '15px',
                left: '430px',
                color: 'red',
              }}
            >
              Никнейм занят
            </p>
          )}
          <input
            className="reg__input input"
            value={nickname}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            name="nickname"
            type="text"
            placeholder=" "
          />
          <label
            style={{ visibility: nickname ? 'hidden' : 'visible' }}
            id="regreg"
            className="placeholder"
          >
            Ваш Никнейм
          </label>
        </div>
        <div className="input-group">
          <input
            className="reg__input input"
            value={email}
            onChange={handleChangeEmail}
            name="email"
            type="text"
            placeholder=" "
          />
          <label
            style={{ visibility: email ? 'hidden' : 'visible' }}
            id="regreg"
            className="placeholder"
          >
            Ваш Email
          </label>
        </div>
        <div className="input-group">
          <div>
            <input
              className="reg__input input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type={passwordShown ? 'text' : 'password'}
              placeholder=" "
            />
            <label
              style={{ visibility: password ? 'hidden' : 'visible' }}
              id="regreg"
              className="placeholder"
            >
              Ваш пароль
            </label>
          </div>
          <i
            className="password-control"
            onClick={togglePassword}
            style={{ top: '30px', left: '340px' }}
          />
        </div>
        <div>
          <select className="reg__input" value={role} onChange={(e) => setRole(+e.target.value)}>
            <option disabled>Выберите:</option> <option value="2">Обычный пользователь</option>
            <option value="1">Учитель</option>
          </select>
        </div>

        <button className="btn login__btn reg__button" type="submit">
          Зарегистрироваться
        </button>
        <div>
          {error && (
            <span style={{ position: 'absolute', fontSize: '15px', margin: '15px', color: 'red' }}>
              {error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegPage;
