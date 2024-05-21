import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { retrieveToken } from "../service/tokenStorage";

const initialState = {
  orderData: [],
  loading: false,
  error: null,
  totalQuantity: 0,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState();
    const token = await retrieveToken();
    if (!user.userDetails || !user.userDetails.token) {
      return rejectWithValue("User is not logged in or token is missing.");
    }
    try {
      const response = await fetch("http://localhost:3000/orders", {
        // Assuming this is the correct URL
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure correct token usage
          "Content-Type": "application/json",
        },
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrders(state) {
      //   state.orderData = [];
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.orderData = action.payload.orders;
        state.totalQuantity = action.payload.length;

        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export const orderDetails = (state) => state.order.orderData;
export default orderSlice.reducer;
export const totalQuantity = (state) => state.order.totalQuantity;
