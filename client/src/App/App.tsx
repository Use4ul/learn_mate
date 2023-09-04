/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import ProfilePage from '../features/profilepage/ProfilePage';
import MainPage from '../features/mainpage/MainPage';

import CardsPage from '../features/cardsPage/CardsPage';
import { useAppDispatch } from '../redux/store';
import { checkUser } from '../features/auth/reg/authSlice';
import RegPage from '../features/auth/reg/RegPage';
import LoginPage from '../features/auth/log/LoginPage';
import useTheme from '../hooks/useTheme';
import ModuleUpdateForm from '../features/profilepage/ModuleUpdateForm';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
