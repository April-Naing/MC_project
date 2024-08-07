import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import counterSlice from "./counter-slice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, counter: counterSlice.reducer },
});

export default store;
