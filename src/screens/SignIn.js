import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "./axiosConfig";
import { useNavigation } from "@react-navigation/native";
import { SignUp } from "./SignUp";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleEmailChange = (email) => {
    setEmail(email);
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleSignIn = async ({ email, password }) => {
    const user = { email, password };
    try {
      if (!email || !password) {
        Alert.alert("Email and password are required");
        return;
      }
      const response = await axios.post("/users/signin", user);
      console.log("Sign-in successful :", response.data);
      navigation.navigate("Products");
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logIn}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>Login Here</Text>
          <View>
            <TextInput
              id="email"
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="blue"
              onChangeText={handleEmailChange}
              value={email}
            />
            <TextInput
              id="password"
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="blue"
              onChangeText={handlePasswordChange}
              value={password}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={() => {
                setEmail("");
                setPassword("");
              }}
            >
              <Ionicons name="remove-circle" size={28} color="white" />
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
              onPress={() => handleSignIn({ email, password })}
            >
              <Ionicons name="log-in" size={28} color="white" />
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.switchText}>
                Switch to: sign up a new account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightpink",
    padding: 20,
    margin: 10,
    borderRadius: 15,
  },
  logIn: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
    margin: 40,
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
  innerContainer: {
    width: "98%",
    backgroundColor: "lightpurple",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    fontSize: 35,
    marginBottom: 30,
    fontWeight: "bold",
    color: "purple",
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 7,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    margin: 3,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "lightcoral",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
    // alignSelf: "center",
    padding: 5,
  },
  switchTextContainer: {
    alignItems: "center",
  },
  switchText: {
    color: "blue",
    fontSize: 17,
  },
});

export { SignIn };
