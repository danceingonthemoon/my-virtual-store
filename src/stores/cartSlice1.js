import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../service/apiService";

const initialState = {
  productData: [],
  loading: false,
  error: null,
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

      // dispatch(cartSlice.actions.fetchPro(response));
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch product data");
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
      const { id } = action.payload;
      if (!Array.isArray(state.productData)) {
        state.productData = []; // Initialize as empty array if not already
      }
      const existingItem = state.productData.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.productData.push({
          ...action.payload,
          quantity: 0,
        });
      }
      state.totalQuantity++;

      //   const { id, title, price, description, category, image, rating } =
      //     action.payload;
      //   if (!Array.isArray(state.productData)) {
      //     state.productData = [];
      //   }
      //   const existingItemIndex = state.productData.findIndex(
      //     (item) => item.id === id
      //   );

      //   if (existingItemIndex !== -1) {
      //     // If item exists, update its quantity
      //     state.productData[existingItemIndex].quantity++;
      //   } else {
      //     // If item doesn't exist, add it to the cart
      //     state.productData.push({
      //       id,
      //       title,
      //       price,
      //       description,
      //       category,
      //       image,
      //       rating,
      //       quantity: 0,
      //     });
      //   }
      //   state.totalQuantity++;
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
        console.log("Fetching product data...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDataAsync.fulfilled, (state, action) => {
        console.log("Fetch fulfilled. Payload:", action.payload);
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(fetchProductDataAsync.rejected, (state, action) => {
        console.error("Fetch rejected. Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.productData = {};
      });
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export const selectCart = (state) => state.cart.productData;
export default cartSlice.reducer;
