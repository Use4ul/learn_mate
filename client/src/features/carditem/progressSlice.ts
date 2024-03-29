import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchProgress, * as api from './api';
import State from './types/State';
import { Answer, CardId } from '../cardsPage/types/types';

const initialState: State = {
  progress: 0,
  flagForUpdate: false,
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
  reducers: {
    setFlagForUpdate: (state) => {
      state.flagForUpdate = !state.flagForUpdate;
    },
    clearProgress: (state) => {
      state.progress = 0;
    },
  },
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

export const { setFlagForUpdate, clearProgress } = progressSlice.actions;
export default progressSlice.reducer;
