import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';
import { State } from '../types/State';

const initialState: State = {
  group: [],
  error: undefined,
};

export const loadGroups = createAsyncThunk('group/load', () => api.fetchGroups());

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGroups.fulfilled, (state, action) => {
        state.group = action.payload;
      })
      .addCase(loadGroups.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupsSlice.reducer;
