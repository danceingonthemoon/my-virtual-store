import productSlice from "./productSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";
import asyncActionsMiddleware from "../middleware/asyncActionsMiddleware";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncActionsMiddleware),
});

export default store;
