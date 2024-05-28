import axios from "../screens/axiosConfig";
import { Alert } from "react-native";
import { retrieveToken } from "./tokenStorage";
// Post items to the server /cart
export const postCartServer = async (items) => {
  const token = await retrieveToken();
  // const { id, count, price } = items;
  try {
    const response = await fetch("http://localhost:3000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: items }),
    });
    console.log("response for cartService", response);
    if (!response.status === 200) {
      throw new Error(errorData.message || "Failed to add to cart");
    }
    return await response.json();
  } catch (error) {
    Alert.alert("Error", error.message || "Failed to add items to cart");
    throw error;
  }
};
