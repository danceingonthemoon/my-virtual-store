import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./cartReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);

export default store;
