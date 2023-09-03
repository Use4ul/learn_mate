import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';
import State from './types/State';
import { ModuleId } from '../modulitem/types/types';

const initialState: State = {
  cards: [],
  error: undefined,
};

export const loadCards = createAsyncThunk('cards/load', (id: ModuleId) => api.fetchCards(id));

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(loadCards.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
