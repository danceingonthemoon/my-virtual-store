import axios from "../screens/axiosConfig";
import { Alert } from "react-native";
import { retrieveToken } from "./tokenStorage";
// Post items to the server /cart
export const postCartServer = async (items) => {
  const token = await retrieveToken();
  // console.log("items to send", items);
  try {
    const response = await fetch("http://localhost:3000/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(items),
    });
    // console.log("response", response);
    if (!response.status === 200) {
      throw new Error(errorData.message || "Failed to add to cart");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error or CORS issue
      Alert.alert("Network Error", "Failed to connect to server");
    } else {
      // Other errors
      Alert.alert("Error", error.message || "Failed to add items to cart");
    }
    throw error; // Re-throw the error for higher-level handling if needed
  }
};