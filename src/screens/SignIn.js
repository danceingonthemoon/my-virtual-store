import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.loginText}>Login Here</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="blue"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="blue"
          />
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <View>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="close-circle-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
            >
              <Ionicons name="log-in" size={24} color="white" />
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.switchTextContainer}>
          <TouchableOpacity>
            <Text style={styles.switchText}>
              Switch to: sign up a new account
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "lightgreen",
    borderRadius: 10,
  },
  innerContainer: {
    width: "80%",
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
    justifyContent: "space-between",
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
  buttonText: {
    color: "white",
  },
  switchTextContainer: {
    alignItems: "center",
  },
  switchText: {
    color: "blue",
  },
});

export { SignIn };
