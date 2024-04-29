import { ADD_TO_CART } from "./actionTypes";

const initialState = {
  cart: {},
  // an object to store the cart items, ??while an array is not working to render the cart items
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      console.log("newItem", newItem);
      return {
        // return the current state and add the new product to the cart
        // TODO:pass newItem to payload or destruct {productId,quantity} from payload
        ...state,
        cart: {
          ...state.cart,
          [newItem.id]: { ...newItem, quantity: 1 }, //use item.id as key to manage the cart
        },
      };
    case "INCREASE_QUANTITY":
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          [productId]: {
            ...state.cart[productId],
            quantity: state.cart[productId].quantity + 1,
          },
        },
      };
    case "DECREASE_QUANTITY":
      const { decreaseId } = action.payload;
      console.log("decreaseId", decreaseId);
      return {
        ...state,
        cart: {
          ...state.cart,
          [decreaseId]: {
            ...state.cart[decreaseId],
            quantity: state.cart[decreaseId].quantity - 1,
          },
        },
      };

    default:
      return state;
  }
};

export default cartReducers;
