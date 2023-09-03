import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from '../log/types/State';
import * as api from '../log/api';
import { AuthUser, UserSingIn } from '../log/types/types';

const initialState: State = {
  authUser: undefined,
  error: undefined,
  userSingIn: undefined,
};

export const signUp = createAsyncThunk('auth/sign-up', (user: AuthUser) => api.fetchSignUp(user));

export const checkUser = createAsyncThunk('auth/check-user', () => api.fetchCheckUser());

export const signIn = createAsyncThunk('auth/sign-in', (user: UserSingIn) => api.fetchSignIn(user));


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
      .addCase(signIn.fulfilled, (state, action) => {
        state.userSingIn = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
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
