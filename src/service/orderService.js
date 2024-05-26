import { Alert } from "react-native";
import { retrieveToken } from "./tokenStorage";

//post new order to /orders/neworder
export const postNewOrder = async (items) => {
  const token = await retrieveToken();
  try {
    const response = await fetch("http://localhost:3000/orders/neworder", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(items),
    });
    if (!response.status === 200) {
      throw new Error(errorData.message || "Failed to add to cart");
    }
    return await response.json();
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
    const response = await fetch("http://localhost:3000/orders/updateorder", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderUpdateInfo),
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
