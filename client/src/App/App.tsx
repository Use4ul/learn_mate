/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from '../features/navbar/Navbar';
import ProfilePage from '../features/profilepage/ProfilePage';
import MainPage from '../features/mainpage/MainPage';
import RegPage from '../features/auth/reg/RegPage';
import LoginPage from '../features/auth/log/LoginPage';
import { useAppDispatch } from '../redux/store';
import { checkUser } from '../features/auth/reg/authSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/profile_page" element={<ProfilePage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/register" element={<RegPage />} />
          <Route path="/auth/log" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
