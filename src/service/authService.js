import axios from "../screens/axiosConfig";
import { Alert } from "react-native";
import { storeToken, retrieveToken } from "./tokenStorage";
import { Platform } from "react-native";
export const signUp = async ({ name, email, password }) => {
  const user = { name, email, password };
  try {
    const response = await axios.post(`${SERVER_URL}/users/signup`, user);
    // console.log("Sign-Up successful :", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something else happened in making the request
      console.error("Error in request:", error.message);
    }
  }
};
export const SERVER_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";
export const signIn = async (user) => {
  const { email, password } = user;
  if (!email || !password) {
    Alert.alert("Email and password are required");
  }
  try {
    const response = await fetch(`${SERVER_URL}/users/signin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("SignIn failed");
    }
    const data = await response.json();
    console.log("data", data);
    if (data.token) {
      await storeToken(data.token);
      return data;
    } else {
      throw new Error("No token recieved");
    }
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error in request:", error.message);
    }
  }
};

export const updateUserProfile = async ({ name, password }) => {
  if (!name || !password) {
    Alert.alert("Name and password are required");
    return;
  }
  const token = await retrieveToken();
  // console.log("Token", token);
  const user = { name, password };
  console.log("user", user);
  try {
    const response = await fetch(`${SERVER_URL}/users/update`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    // console.log("response", response);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || "Failed to update profile");
    return data;
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
