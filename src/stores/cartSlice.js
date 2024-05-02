import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../service/apiService";

const initialState = {
  productData: {},
  loading: false,
  error: null,
  // an object to store the cart items, ??while an array is not working to render the cart items
};

export const fetchProductDataAsync = createAsyncThunk(
  "fetchProductData",
  async (productId, thunkAPI) => {
    if (!productId) {
      return thunkAPI.rejectWithValue("No productId provided");
    }
    try {
      const response = await fetchProductByID(productId);
      console.log("response", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const cartSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
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
export const { fetchProductData } = cartSlice.actions;
export const selectCart = (state) => state.product;
export default cartSlice.reducer;
