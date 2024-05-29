import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { retrieveToken } from "../service/tokenStorage";
import { Platform } from "react-native";
export const SERVER_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
const initialState = {
  cartData: [],
  loading: false,
  error: null,
  totalQuantity: 0,
};

const findProductIndex = (cartData, id) => {
  return cartData.findIndex((product) => product.id === id);
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    const token = await retrieveToken();
    try {
      const response = await fetch(`${SERVER_URL}/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      // console.log("data items", data.items);
      return data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    clearCartData: (state, action) => {
      // console.log("state of cartData", state.cartData);
      state.cartData = [];
      state.totalQuantity = 0;
      // state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload);
        if (action.payload) {
          // Assuming items are nested under 'items' key
          state.cartData = action.payload;
          state.totalQuantity = action.payload.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity, clearCartData } =
  cartSlice.actions;
export const cartDetails = (state) => state.cart.cartData;
export default cartSlice.reducer;
export const totalQuantity = (state) => state.cart.totalQuantity;
