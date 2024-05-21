import productSlice from "./productSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
  },
});

export default store;
