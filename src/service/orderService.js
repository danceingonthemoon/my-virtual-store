import { Alert } from "react-native";
import { retrieveToken } from "./tokenStorage";
//post new order to /orders/neworder
export const postNewOrder = async (items) => {
  const token = await retrieveToken();
  console.log("orders to checkout", items);
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
    console.log("response", response);
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
