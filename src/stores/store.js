import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import counterReducer from "./counterReducers";

const initialState = {};

const rootReducer = combineReducers({
  cart: cartReducer,
  counter: counterReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware())
);
export default store;
