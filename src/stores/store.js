import productSlice from "./productSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
