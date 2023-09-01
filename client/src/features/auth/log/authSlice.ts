import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from './types/State';
import * as api from '../../auth/log/api';
import { AuthUser } from './types/types';

const initialState: State = {
  authUser: undefined,
  error: undefined,
};

export const signUp = createAsyncThunk('auth/sign-up', (user: AuthUser) => api.fetchSignUp(user));

export const checkUser = createAsyncThunk('auth/check-user', () => api.fetchCheckUser());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
