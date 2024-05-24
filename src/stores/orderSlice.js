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
      const response = await fetch("http://localhost:3000/orders/all", {
        // Assuming this is the correct URL
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure correct token usage
          "Content-Type": "application/json",
        },
      });
      // console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      // console.log("data", data);
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
    togglePaid: (state, action) => {
      const index = state.orderData.findIndex(
        (order) => order.id === action.payload
      );
      if (index !== -1) {
        state.orderData[index].is_paid =
          state.orderData[index].is_paid === 1 ? 0 : 1;
        console.log(
          "paid Status",
          state.orderData[index].is_paid ? "paid" : "Not paid"
        );
      }
    },
    toggleDelivered: (state, action) => {
      const index = state.orderData.findIndex(
        (order) => order.id === action.payload
      );
      if (index !== -1) {
        state.orderData[index].is_delivered =
          state.orderData[index].is_delivered === 1 ? 0 : 1;
      }
    },
    clearOrders(state) {
      state.totalQuantity = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderData = action.payload.orders;
        state.totalQuantity = action.payload.orders.reduce(
          (sum, order) => sum + order.item_numbers,
          0
        );
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrders, togglePaid, toggleDelivered } = orderSlice.actions;
export default orderSlice.reducer;
export const totalQuantityOrder = (state) => state.order.orderData.length;
