import cartReducer from "./cartSlice1";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
