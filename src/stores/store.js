import { createStore } from "redux";
import { combineReducers } from "redux";
import cartReducer from "./cartReducers";

const initialState = {};

const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers if any
});

const store = createStore(rootReducer);
export default store;
