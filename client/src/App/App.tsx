/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import ProfilePage from '../features/profilepage/ProfilePage';
import MainPage from '../features/mainpage/MainPage';

import CardsPage from '../features/cardsPage/CardsPage';
import { RootState, useAppDispatch } from '../redux/store';
import { checkUser, stopPending } from '../features/auth/reg/authSlice';
import RegPage from '../features/auth/reg/RegPage';
import LoginPage from '../features/auth/log/LoginPage';
import useTheme from '../hooks/useTheme';
import ModuleUpdateForm from '../features/profilepage/ModuleUpdatePage';
import { useSelector } from 'react-redux';
import preloader from './preloader.gif';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const { pending } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    setTimeout(() => dispatch(stopPending()), 1000);
  }, [pending]);

  return (
    <BrowserRouter>
      {pending ? (
        <img src={preloader} alt="loader" />
      ) : (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/profile/:userId/modules" element={<ProfilePage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/register" element={<RegPage />} />
            <Route path="/auth/log" element={<LoginPage />} />
            <Route path="/modules/:moduleId" element={<CardsPage />} />
            <Route path="/profile/:userId/modules/:moduleId" element={<ModuleUpdateForm />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
