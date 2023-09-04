import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from '../modulitem/types/State';
import { AuthUserId } from '../auth/log/types/types';

const initialState: State = {
  modules: [],
  error: undefined,
};

export const loadModulesForUser = createAsyncThunk('modules/loadForUser', (id: AuthUserId) =>
  api.fetchModulesForUser(id),
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadModulesForUser.fulfilled, (state, action) => {
        state.modules = action.payload;
      })
      .addCase(loadModulesForUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
