/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoriesSlice from '../features/mainpage/categoriesSlice';
import authSlice from '../features/auth/log/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    // games: gamesSlice,
    categories: categoriesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
