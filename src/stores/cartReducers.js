import { ADD_TO_CART, REMOVE_FROM_CART } from "./actionTypes";

const initialState = {
  cart: {}, // an object to store the cart items, ??while an array is not working to render the cart items
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
        cart: { ...state.cart, [newItem.id]: newItem }, //use item.id as key to manage the cart
      };
    case REMOVE_FROM_CART:
      const { productId, quantity } = action.payload;
      const item = state.cart[productId];
      if (item) {
        const updatedQuantity = item.quantity - quantity;
        if (updatedQuantity <= 0) {
          const newCart = { ...state.cart };
          delete newCart[productId];
          return {
            ...state,
            cart: newCart,
          };
        } else {
          return {
            ...state,
            cart: {
              ...state.cart,
              [productId]: { ...item, quantity: updatedQuantity },
            },
          };
        }
      }
      return state;
    default:
      return state;
  }
};

export default cartReducers;
