import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductByID } from "../service/apiService";

const initialState = {
  productData: {},
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
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch product data");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(fetchProductDataAsync.rejected, (state, action) => {
        // console.error("Fetch rejected. Error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCart = (state) => state.product.productData;
export default productSlice.reducer;
