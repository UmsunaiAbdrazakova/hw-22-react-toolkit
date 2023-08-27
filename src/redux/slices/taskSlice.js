import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { title: "Homework", completed: false },
  { title: "10000 шаг", completed: false },
  { title: "Уборка", completed: false },
];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({ title: action.payload, completed: false });
    },
    toggleTaskCompletionAction: (state, action) => {
      const index = action.payload;
      state[index].completed = !state[index].completed;
    },
    deleteTask: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addTask, toggleTaskCompletionAction, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
