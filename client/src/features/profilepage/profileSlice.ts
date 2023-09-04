import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from './types/State';
import { AuthUserId } from '../auth/log/types/types';
import { ModuleId } from '../modulitem/types/types';
import { CardWithoutId, ModuleWithoutUser } from './types/type';

const initialState: State = {
  modules: [],
  module: [],
  error: undefined,
};

export const loadModulesForUser = createAsyncThunk('user/loadModules', (id: AuthUserId) =>
  api.fetchModulesForUser(id),
);

export const loadModulesForUserToUpdate = createAsyncThunk(
  'user/loadModuleToUpdate',
  (id: ModuleId) => api.fetchModuleForUserToUpdate(id),
);

export const sendModuleToUpdate = createAsyncThunk(
  'user/moduleUpdate',
  ({ title, category, id }: ModuleWithoutUser) => api.fetchModuleToUpdate({ title, category, id }),
);

export const addCardToModule = createAsyncThunk(
  'user/addCardToModule',
  ({ term, definition, img, audio, module_id }: CardWithoutId) =>
    api.fetchCardToAdd({ term, definition, img, audio, module_id }),
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
      })
      .addCase(loadModulesForUserToUpdate.fulfilled, (state, action) => {
        state.module = action.payload;
      })
      .addCase(loadModulesForUserToUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(sendModuleToUpdate.fulfilled, (state, action) => {
        state.modules = state.modules.map((module) =>
          module.id === action.payload.id ? { ...module, ...action.payload } : module,
        );
      })
      .addCase(sendModuleToUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addCardToModule.fulfilled, (state, action) => {
        state.module[0].Cards.push(action.payload);
      })
      .addCase(addCardToModule.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
