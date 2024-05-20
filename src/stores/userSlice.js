import { createSlice } from "@reduxjs/toolkit";
import { storeToken } from "../service/authStorage";
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
      console.log("action.payload.token", action.payload.token);
      state.userDetails = action.payload;
      state.userDetails.token = action.payload.token;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
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
