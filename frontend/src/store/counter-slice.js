import { createSlice } from "@reduxjs/toolkit";

const initial = { counter: 0 };
const counterSlice = createSlice({
  name: "counter",
  initialState: initial,
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    add: (state) => {
      console.log("before slice", state.counter);

      state.counter++;
      console.log("slice", state.counter);
    },
    remove: (state) => {
      console.log("before slice", state.counter);

      state.counter--;
      console.log("slice", state.counter);
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice;
