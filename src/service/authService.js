import axios from "../screens/axiosConfig";
import { Alert } from "react-native";
import { storeToken, retrieveToken } from "./tokenStorage";
export const signUp = async ({ name, email, password }) => {
  const user = { name, email, password };
  try {
    const response = await axios.post("/users/signup", user);
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

export const signIn = async ({ email, password }) => {
  const user = { email, password };
  if (!email || !password) {
    Alert.alert("Email and password are required");
  }
  try {
    const response = await fetch("http://localhost:3000/users/signin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("SignIn failed");
    }
    const data = await response.json();
    if (data.token) {
      await storeToken(data.token);
    } else {
      throw new Error("No token recieved");
    }
    return data;
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
  try {
    const response = await fetch("http://localhost:3000/users/update", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    // console.log("response", response);
    if (!response.ok) {
      const errorMessage = await response.text();
      Alert.alert("Error in updateUserProfile:", errorMessage);
    }
    Alert.alert("Profile updated successfully :", response);
    return response;
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
