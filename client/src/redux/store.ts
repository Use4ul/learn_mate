/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authSlice from '../features/auth/log/authSlice';
import modulesSlice from '../features/modulitem/modulesSlice';
import categoriesSlice from '../features/mainpage/slices/categoriesSlice';


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
