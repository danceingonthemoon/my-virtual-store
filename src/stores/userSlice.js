import { createSlice } from "@reduxjs/toolkit";
import { storeToken } from "../service/tokenStorage";
const initialState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.userDetails.token = action.payload.token;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
      state.loading = false; // Reset loading state
      state.error = null;
    },
    updateUserToken: (state, action) => {
      if (state.userDetails) {
        state.userDetails.token = action.payload;
      }
    },
  },
});

export const { setUserDetails, clearUserDetails, updateUserToken } =
  userSlice.actions;
export const selectUserDetails = (state) => state.user.userDetails;
export default userSlice.reducer;
