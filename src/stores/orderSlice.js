import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { retrieveToken } from "../service/tokenStorage";
import { postNewOrder } from "../service/orderService";
import { updateOrder } from "../service/orderService";
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
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
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

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, isPaid, isDelivered }, { rejectWithValue }) => {
    try {
      const data = await updateOrder(orderId, isPaid, isDelivered);
      console.log("data", data);
      return { orderId, isPaid, isDelivered };
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
      state.orderData = [];
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
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, isPaid, isDelivered } = action.payload;
        const orderIndex = state.orderData.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          state.orderData[orderIndex].is_paid = isPaid;
          state.orderData[orderIndex].is_delivered = isDelivered;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearOrders, togglePaid, toggleDelivered } = orderSlice.actions;
export default orderSlice.reducer;
// export const fillOrdersFromFetch = async (dispatch) => {
//   try {
//     const token = await retrieveToken();
//     const data = await postNewOrder();
//     console.log("data", data);
//     dispatch(fillOrders({ orders: data.orders }));
//   } catch (e) {
//     console.error("Error in filling orders");
//   }
// }; why not work??
export const totalQuantityOrder = (state) => {
  return state.order.orderData.reduce((sum, order) => {
    if (order.is_paid === 0 && order.is_delivered === 0) {
      //call back sum
      return sum + 1;
    }
    return sum;
  }, 0);
};
