import { createSlice } from "@reduxjs/toolkit";

const initial = { counter: 0 };
const counterSlice = createSlice({
  name: "counter",
  initialState: initial,
  reducers: {
    add: (state) => {
      state.counter++;
    },
    remove: (state) => {
      state.counter--;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice;
