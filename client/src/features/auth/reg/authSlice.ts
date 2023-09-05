import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { State } from '../log/types/State';
import * as api from '../log/api';
import { AuthUser, AuthUserWithoutId } from '../log/types/types';

const initialState: State = {
  authUser: undefined,
  error: undefined,
  pending: false,
};

export const signUp = createAsyncThunk('auth/sign-up', (user: AuthUserWithoutId) => api.fetchSignUp(user));

export const logOut = createAsyncThunk('auth/logout', () => api.fetchLogOut());

export const checkUser = createAsyncThunk('auth/check-user', () => api.fetchCheckUser());

export const signIn = createAsyncThunk('auth/sign-in', (user: Partial<AuthUser>) =>
  api.fetchSignIn(user),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    stopPending: (state) => {
      state.pending = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(checkUser.pending, (state, action) => {
        state.pending = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.authUser = undefined;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { stopPending } = authSlice.actions;
export default authSlice.reducer;
