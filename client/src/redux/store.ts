/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoriesSlice from '../features/mainpage/slices/categoriesSlice';
import authSlice from '../features/auth/reg/authSlice';
import modulesSlice from '../features/modulitem/modulesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    // games: gamesSlice,
    categories: categoriesSlice,
    modules: modulesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
