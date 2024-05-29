import { Alert } from "react-native";
import { retrieveToken } from "./tokenStorage";
import { Platform } from "react-native";
export const SERVER_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
//post new order to /orders/neworder
export const postNewOrder = async (items) => {
  const token = await retrieveToken();
  const { prodID, price, quantity } = items;
  try {
    const response = await fetch(`${SERVER_URL}/orders/neworder`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: items, token }),
    });
    console.log("response", response);
    if (!response.status === 200) {
      throw new Error(errorData.message || "Failed to add to cart");
    }
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Failed to post new order: ", error);
    Alert.alert("Error", error.message || "Failed to create new order");
    throw error;
  }
};
// update the order
export const updateOrder = async (orderID, isPaid, isDelivered) => {
  const token = await retrieveToken();
  const orderUpdateInfo = {
    orderID,
    isPaid,
    isDelivered,
  };
  console.log("orders to update", orderUpdateInfo);
  try {
    const response = await fetch(`${SERVER_URL}/orders/updateorder`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderUpdateInfo, token),
    });
    const data = await response.json();
    if (!response.status === 200) {
      throw new Error(errorData.message || "Failed to add to cart");
    }
    return data;
  } catch (error) {
    Alert.alert("Error", error.message || "Failed to create new order");
  }
};
