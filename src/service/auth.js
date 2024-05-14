import axios from "../screens/axiosConfig";
import { Alert } from "react-native";
export const signUp = async ({ name, email, password }) => {
  const user = { name, email, password };
  try {
    const response = await axios.post("/users/signup", user);
    console.log("Sign-Up successful :", response.data);
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
  try {
    if (!email || !password) {
      Alert.alert("Email and password are required");
    }
    const response = await axios.post("/users/signin", user);
    console.log("Sign-in successful :", response.data);
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

export const updateUserProfile = async ({ name, password, token }) => {
  if (!name || !password) {
    Alert.alert("Name and password are required");
    return;
  }

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
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error in updateUserProfile:", errorMessage);
      throw new Error("Update failed");
    }
    const data = await response.json();
    console.log("Profile updated successfully :", data);
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
