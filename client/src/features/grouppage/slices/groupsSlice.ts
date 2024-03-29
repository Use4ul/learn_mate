import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';
import { State } from '../types/State';
import { Group, GroupId, GroupItem, NewGroup } from '../types/types';
import { ModuleId } from '../../modulitem/types/types';

const initialState: State = {
  groups: [],
  groupItem: [],
  users: [],
  group: [],
  groupsWithTasks: [],
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
export const userAdd = createAsyncThunk(
  'user/add',
  ({ student_id, group_id }: { student_id: number; group_id: number }) =>
    api.featchAddUser({ student_id, group_id }),
);

export const loadGroupsWithTask = createAsyncThunk('groupsWithTask/load', (id: ModuleId) => api.fetchGroupsWithTask(id));

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
  },
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
        state.group = action.payload;
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
      })
      .addCase(userAdd.fulfilled, (state, action) => {
        state.groupItem.push(action.payload);
      })
      .addCase(userAdd.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadGroupsWithTask.fulfilled, (state, action) => {
        state.groupsWithTasks = action.payload;
      })
      .addCase(loadGroupsWithTask.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { clearError } = groupsSlice.actions;
export default groupsSlice.reducer;
