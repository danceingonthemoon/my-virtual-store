import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: [],
  loading: false,
  error: null,
  totalQuantity: 0,
};
const findProductIndex = (cartData, id) => {
  return cartData.findIndex((product) => product.id === id);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = findProductIndex(state.cartData, newItem.id);
      if (existingItemIndex !== -1) {
        state.cartData[existingItemIndex].quantity++;
      } else {
        state.cartData.push({ ...newItem, quantity: 1 });
      }
      state.totalQuantity++;
    },
    increaseQuantity: (state, action) => {
      state.cartData.forEach((product) => {
        if (product.id === action.payload) {
          product.quantity++;
          state.totalQuantity++;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.cartData.forEach((product) => {
        if (product.id === action.payload) {
          if (product.quantity > 0) {
            product.quantity--;
            state.totalQuantity--;
          } else if (product.quantity === 0) {
            state.cartData = state.cartData.filter(
              (product) => product.id !== action.payload
            );
          }
        }
      });
    },
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export const cartDetails = (state) => state.cart.cartData;
export default cartSlice.reducer;
export const totalQuantity = (state) => state.cart.totalQuantity;
