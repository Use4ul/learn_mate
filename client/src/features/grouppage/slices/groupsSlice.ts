import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { State } from '../types/State';
import { Group, GroupId, NewGroup } from '../types/types';

const initialState: State = {
  groups: [],
  error: undefined,
};

export const loadGroups = createAsyncThunk('groups/load', () => api.fetchGroups());
export const groupsDelete = createAsyncThunk('group/delete', (id: GroupId) =>
  api.fetchGroupsDelete(id),
);
export const addGroup = createAsyncThunk('group/add', (group: NewGroup) =>
  api.fetchGroupAdd(group),
);

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(loadGroups.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(groupsDelete.fulfilled, (state, action) => {
        state.groups = state.groups.filter((group) => group.id !== action.payload);
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupsSlice.reducer;
