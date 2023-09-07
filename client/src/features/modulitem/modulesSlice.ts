import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import fetchModules from './api';
import State from './types/State';

const initialState: State = {
  modules: [],
  error: undefined,
};

export const loadModules = createAsyncThunk('modules/load', () => fetchModules());

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    // deleteModulesFromMain: (state) => {
    //   state.modules = state.modules.filter((el) => el.id !== action.payload)
    // }
  },
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
