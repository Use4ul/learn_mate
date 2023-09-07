import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from './api';
import State from './types/State';
import { AuthUserId } from '../auth/log/types/types';
import { GroupId } from '../grouppage/types/types';
import { TaskId, TaskToSend } from './types/type';

const initialState: State = {
  groups: [],
  tasks: [],
  error: undefined,
};

export const loadGroupForTasks = createAsyncThunk('user/loadTasks', (id: AuthUserId) =>
  api.fetchGroupForTasks(id),
);

export const taskGroup = createAsyncThunk('group/task', ({ groups, id }: TaskToSend) =>
  api.fetchGroupsToTasks({ groups, id }),
);

export const loadTasks = createAsyncThunk('user/loadGroupTasks', (id: GroupId) =>
  api.fetchTasksForGroup(id),
);

export const deleteTask = createAsyncThunk('user/deleteGroupTasks', (id: TaskId) =>
  api.fetchDeleteTaskFromGroup(id),
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGroupForTasks.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(loadGroupForTasks.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(taskGroup.fulfilled, () => {})
      .addCase(taskGroup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
