import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';
import State from './types/State';
import { CardId } from '../cardsPage/types/types';

const initialState: State = {
  progress: 0,
  error: undefined,
};

export const loadCardProgress = createAsyncThunk('card/loadProgress', (id: CardId) =>
  api.fetchProgress(id),
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
      });
  },
});

export default progressSlice.reducer;
