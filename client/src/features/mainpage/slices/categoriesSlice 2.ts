import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import State from '../types/State';
import * as api from '../api';

const initialState: State = {
  categories: [],
  error: undefined,
};

export const loadCategories = createAsyncThunk('categories/load', () => api.fetchCategories());

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
