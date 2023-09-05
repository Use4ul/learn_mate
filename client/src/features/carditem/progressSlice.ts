import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchProgress, * as api from './api';
import State from './types/State';
import { Answer, CardId } from '../cardsPage/types/types';

const initialState: State = {
  progress: 0,
  error: undefined,
};

export const loadCardProgress = createAsyncThunk('card/loadProgress', (id: CardId) =>
  fetchProgress(id),
);

export const sendAnswer = createAsyncThunk(
  'cards/sendAnswer',
  ({ user_id, card_id, isCorrect }: Answer) => api.fetchAnswer({ user_id, card_id, isCorrect }),
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCardProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      .addCase(loadCardProgress.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(sendAnswer.fulfilled, (state, action) => {
        state.progress = action.payload;
      })
      .addCase(sendAnswer.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default progressSlice.reducer;
