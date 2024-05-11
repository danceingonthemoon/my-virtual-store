import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import axios from "./axiosConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (email) => {
    setEmail(email);
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleSignIn = async ({ email, password }) => {
    try {
      const response = await axios.post("/users/signin", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logIn}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>Login Here</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="blue"
              onChangeText={handleEmailChange}
              value={email}
            />
            <TextInput
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
              <Ionicons name="close-circle-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
              onPress={() => handleSignIn({ email, password })}
            >
              <Ionicons name="log-in" size={24} color="white" />
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchTextContainer}>
            <TouchableOpacity>
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
    backgroundColor: "lightblue",
    padding: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: "lightcoral",
  },
  buttonText: {
    color: "white",
  },
  switchTextContainer: {
    alignItems: "center",
  },
  switchText: {
    color: "blue",
    fontSize: 25,
  },
});

export { SignIn };