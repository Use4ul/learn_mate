import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';
import { State } from '../types/State';
import { Group, GroupId, GroupItem, NewGroup } from '../types/types';

const initialState: State = {
  groups: [],
  groupItem: [],
  users: [],
  error: undefined,
};

export const loadGroups = createAsyncThunk('groups/load', () => api.fetchGroups());
export const groupsDelete = createAsyncThunk('group/delete', (id: GroupId) =>
  api.fetchGroupsDelete(id),
);
export const addGroup = createAsyncThunk('group/add', (group: NewGroup) =>
  api.fetchGroupAdd(group),
);
export const updateTitleGroup = createAsyncThunk('group/update', (group: Group) =>
  api.fetchGroupUpdate(group),
);
export const userInGroup = createAsyncThunk('group/User', (group: Group) =>
  api.fetchUsersInGroup(group),
);
export const userGroupItemDelete = createAsyncThunk(
  'user/delete',
  ({ groupIt, deleteGroup }: { groupIt: GroupItem; deleteGroup: Group }) =>
    api.fetchGroupItemDelete({ groupIt, deleteGroup }),
);
export const loadUsers = createAsyncThunk('user/lod', () => api.fetchUsers());

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
      })
      .addCase(updateTitleGroup.fulfilled, (state, action) => {
        state.groups = state.groups.map((group) =>
          group.id === action.payload.id ? { ...group, ...action.payload } : group,
        );
      })
      .addCase(userInGroup.fulfilled, (state, action) => {
        state.groupItem = action.payload;
      })
      .addCase(userInGroup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(userGroupItemDelete.fulfilled, (state, action) => {
        state.groupItem = state.groupItem.filter((groupIt) => groupIt.id !== action.payload);
      })
      .addCase(userGroupItemDelete.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupsSlice.reducer;
