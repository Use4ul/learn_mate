/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoriesSlice from '../features/mainpage/slices/categoriesSlice';
import authSlice from '../features/auth/reg/authSlice';
import modulesSlice from '../features/modulitem/modulesSlice';
import cardsSlice from '../features/cardsPage/cardsSlice';
import profileSlice from '../features/profilepage/profileSlice';
import groupsSlice from '../features/grouppage/slices/groupsSlice';
import progressSlice from '../features/carditem/progressSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    modules: modulesSlice,
    cards: cardsSlice,
    profile: profileSlice,
    groups: groupsSlice,
    progress: progressSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
