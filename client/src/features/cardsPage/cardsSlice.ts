import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchCards from './api';
import State from './types/State';
import { ModuleId } from '../modulitem/types/types';

const initialState: State = {
  cards: [],
  error: undefined,
};

export const loadCards = createAsyncThunk('cards/load', (id: ModuleId) => fetchCards(id));

// export const sendAnswer = createAsyncThunk(
//   'cards/sendAnswer',
//   ({ user_id, card_id, isCorrect }: Answer) => api.fetchAnswer({ user_id, card_id, isCorrect }),
// );

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
    // .addCase(sendAnswer.fulfilled, (state, action) => {
    //   state.cards = action.payload; // chto tut budet reshit
    // })
    // .addCase(sendAnswer.rejected, (state, action) => {
    //   state.error = action.error.message;
    // });
  },
});

export default cardsSlice.reducer;
