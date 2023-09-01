import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from './types/State';

const initialState: State = {
  modules: [],
  error: undefined,
};

export const loadModules = createAsyncThunk('modules/load', () => api.fetchModules());

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadModules.fulfilled, (state, action) => {
        state.modules = action.payload;
      })
      .addCase(loadModules.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default modulesSlice.reducer;
