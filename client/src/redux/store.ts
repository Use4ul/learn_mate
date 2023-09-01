/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import categoriesSlice from '../features/mainpage/slices/categoriesSlice';
import modulesSlice from '../features/modulitem/modulesSlice';
import cardsSlice from '../features/cardsPage/cardsSlice';

const store = configureStore({
  reducer: {
    // auth: authSlice,
    // games: gamesSlice,
    categories: categoriesSlice,
    modules: modulesSlice,
    cards: cardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export default store;
