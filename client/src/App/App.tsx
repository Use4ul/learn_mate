/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../features/navbar/Navbar';
import ProfilePage from '../features/profilepage/ProfilePage';
import MainPage from '../features/mainpage/MainPage';

import CardsPage from '../features/cardsPage/CardsPage';
import { RootState, useAppDispatch } from '../redux/store';
import { checkUser, stopPending } from '../features/auth/reg/authSlice';
import RegPage from '../features/auth/reg/RegPage';
import LoginPage from '../features/auth/log/LoginPage';
import GroupPage from '../features/grouppage/GroupPage';
import ModuleUpdateForm from '../features/profilepage/ModuleUpdatePage';
import GroupUpdatePage from '../features/grouppage/groupUpdatePage';
import ModuleAddPage from '../features/profilepage/ModuleAddPage';
import preloader from './Preloader1.gif';
import './App.css';
import StatisticsPage from '../features/profilepage/StatisticsPage';
import TaskPage from '../features/taskPage/TaskPage';

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
        <div className="preloader">
          <div className="preloader__image">
            <img className="loader" src={preloader} alt="loader" />
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/auth/register" element={<RegPage />} />
            <Route path="/auth/log" element={<LoginPage />} />
            <Route path="/modules/:moduleId" element={<CardsPage />} />
            <Route path="/newGrop" element={<GroupPage />} />
            <Route path="/profile/:userId/modules/:moduleId" element={<ModuleUpdateForm />} />
            <Route path="/modules/add" element={<ModuleAddPage />} />
            <Route path="/profile/:userId/:groupId" element={<GroupUpdatePage />} />
            <Route path="/profile/:userId/statistics" element={<StatisticsPage />} />
            <Route path="/profile/:userId/modules" element={<TaskPage />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
