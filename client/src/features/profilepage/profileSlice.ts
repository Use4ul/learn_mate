import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from './types/State';
import { AuthUserId } from '../auth/log/types/types';
import { ModuleId } from '../modulitem/types/types';
import { CardWithoutId, ModuleWithoutUser } from './types/type';
import { CardId } from '../cardsPage/types/types';

const initialState: State = {
  modules: [],
  module: [],
  modulesForStat: [],
  cardsProgress: [],
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

export const addModule = createAsyncThunk(
  'user/addModule',
  ({ title, category }: ModuleWithoutUser) => api.fetchModuleToAdd({ title, category }),
);

export const deleteModule = createAsyncThunk('user/deleteModule', (id: ModuleId) =>
  api.fetchModuleDelete(id),
);

export const deleteCard = createAsyncThunk('user/deleteCard', (id: CardId) =>
  api.fetchCardDelete(id),
);

export const loadModulesForUserStat = createAsyncThunk(
  'user/loadModulesForStat',
  (id: AuthUserId) => api.fetchModulesForUserStat(id),
);

export const loadCardStat = createAsyncThunk(
  'user/loadCardStat',
  (id: AuthUserId) => api.fetchCardStat(id),
);

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearModuleForUpdate: (state) => {
      state.module = [];
    },
  },
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
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.module = action.payload;
      })
      .addCase(addModule.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.modules = state.modules.filter((module) => module.id !== action.payload);
      })
      .addCase(deleteModule.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.module[0].Cards = state.module[0].Cards.filter((card) => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadModulesForUserStat.fulfilled, (state, action) => {
        state.modulesForStat = action.payload;
      })
      .addCase(loadModulesForUserStat.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadCardStat.fulfilled, (state, action) => {
        state.cardsProgress = action.payload;
      })
      .addCase(loadCardStat.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearModuleForUpdate } = profileSlice.actions;
export default profileSlice.reducer;
