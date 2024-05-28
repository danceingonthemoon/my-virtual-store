import { postCartServer } from "../service/cartService";
import { retrieveToken } from "../service/tokenStorage";
const asyncActionsMiddleware = (store) => (next) => async (action) => {
  if (action.type === "cart/saveCartToServer" && action.async) {
    try {
      const token = await retrieveToken();
      const response = await postCartServer(action.payload,token);
      console.log("response", response);
      console.log("action payload", action.payload);
      next({ type: "cart/saveCartSuccess", payload: response.data });
    } catch (error) {
      next({ type: "cart/saveCartFailure", payload: error.message });
    }
  } else {
    next(action);
  }
};

export const saveCartToServer = () => async (dispatch, getState) => {
  const cartItems = getState().cart.cartData;
  try {
    const token = await retrieveToken();
    const response = await postCartServer(cartItems, token);
    if (response.ok) {
      dispatch({ type: "cart/saveCartSuccess", payload: response.data });
    } else {
      throw new Error("Server responded with an error");
    }
  } catch (error) {
    dispatch({ type: "cart/saveCartFailure", payload: error.message });
  }
};

export default asyncActionsMiddleware;
