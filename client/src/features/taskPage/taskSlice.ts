import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from './types/State';
import { AuthUserId } from '../auth/log/types/types';

const initialState: State = {
  groups: [],
  error: undefined,
};

export const loadGroupForTasks = createAsyncThunk('user/loadTasks', (id: AuthUserId) =>
  api.fetchGroupForTasks(id),
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGroupForTasks.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(loadGroupForTasks.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
