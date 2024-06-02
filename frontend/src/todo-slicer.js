import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;