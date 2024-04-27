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
    // why not work ?
    // case UPDATE_TO_CART:
    //   const { itemId: updateId, quantity: updateQuantity } = action.payload;
    //   const itemToUpdate = state.cart[updateId];
    //   if (itemToUpdate) {
    //     const updatedQuantity = itemToUpdate.quantity + 1; // Increase quantity by one
    //     return {
    //       ...state,
    //       cart: {
    //         ...state.cart,
    //         [updateId]: { ...itemToUpdate, quantity: updatedQuantity },
    //       },
    //     };
    //   }
    //   return state;

    default:
      return state;
  }
};

export default cartReducers;
