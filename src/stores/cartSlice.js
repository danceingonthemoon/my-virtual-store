import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../service/apiService";

const initialState = {
  productData: [],
  loading: false,
  error: null,
  totalQuantity: 0,
};
export const fetchProductDataAsync = createAsyncThunk(
  "fetchProductData",
  async (productId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    if (!productId) {
      return rejectWithValue("No productId provided");
    }
    try {
      const response = await fetchProductByID(productId);
      console.log("response1", response);
      // dispatch(cartSlice.actions.fetchPro(response));
      console.log("response2", response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // fetchPro: (state, action) => {
    //   console.log("fetchPro action", action.payload);
    //   state.productData = action.payload;
    // },
    addToCart: (state, action) => {
      console.log("addToCart action", action.payload);
      const { id, title, price, description, category, image, rating } =
        action.payload;
      if (!Array.isArray(state.productData)) {
        state.productData = [];
      }
      const existingItemIndex = state.productData.findIndex(
        (item) => item.id === id
      );

      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        state.productData[existingItemIndex].quantity++;
      } else {
        // If item doesn't exist, add it to the cart
        state.productData.push({
          id,
          title,
          price,
          description,
          category,
          image,
          rating,
          quantity: 0, // Set initial quantity to 1 for new items
        });
      }
      state.totalQuantity++; // Increment the total quantity
    },
    increaseQuantity: (state, action) => {
      state.productData.forEach((product) => {
        if (product.id === action.payload) {
          product.quantity++;
          state.totalQuantity++;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      state.productData.forEach((product) => {
        if (product.id === action.payload) {
          if (product.quantity > 0) {
            product.quantity--;
            state.totalQuantity--;
          } else if (product.quantity === 0) {
            state.productData = state.productData.filter(
              (product) => product.id !== action.payload
            );
          }
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDataAsync.pending, (state) => {

        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDataAsync.fulfilled, (state, action) => {
        // console.log("Fetch fulfilled. Payload:", action.payload);
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(fetchProductDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = [];
      });
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export const selectCart = (state) => state.cart.productData;
export default cartSlice.reducer;
