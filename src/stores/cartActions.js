import { ADD_TO_CART } from "./actionTypes";
import { REMOVE_FROM_CART } from "./actionTypes";

// ADD_TO_CART is function that takes two arguments "product" and "quantity"
// and returns an object with type ADD_TO_CART and payload of product and quantity
export const addToCart = (product, quantity = 1) => {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity: 1 },
  };
};
// REMOVE_FROM_CART is function that takes one argument "product" and returns an object with type REMOVE_FROM_CART and payload of product
export const removeFromCart = (productId, quantity = 1) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { productId, quantity },
  };
};
