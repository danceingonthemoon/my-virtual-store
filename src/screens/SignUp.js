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
import { useNavigation } from "@react-navigation/native";
import { SignIn } from "./SignIn";
import { signUp } from "../service/auth";
import { useSelector } from "react-redux";
import { selectUserDetails, setUserDetails } from "../stores/userSlice";
const SignUp = () => {
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUserDetails);
  const navigation = useNavigation();
  const handleEmailChange = (email) => {
    setEmail(email);
  };
  const handlePasswordChange = (password) => {
    setPassword(password);
  };
  const handleUserNameChange = (name) => {
    setUserName(name);
  };
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const user = { name, email, password };
      const response = await signUp(user);
      console.log("Sign-Up successful :", response);
      if (response.success) {
        dispatch(setUserDetails(response.data));
      } else {
        alert(response.error); // Show error message
      }
    } catch (error) {
      console.error("Error in Sign-Up:", error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logIn}>
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>Sign Up Here</Text>
          <View>
            <TextInput
              // id="userName"
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="blue"
              onChangeText={handleUserNameChange}
              value={name}
              autoCapitalize="none"
            />
            <TextInput
              // id="email"
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="blue"
              onChangeText={handleEmailChange}
              value={email}
              autoCapitalize="none"
            />
            <TextInput
              // id="password"
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
              <Ionicons name="remove-circle" size={27} color="white" />
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={() => handleSignUp({ name, email, password })}
            >
              <Ionicons name="heart" size={28} color="red" />
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchTextContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.switchText}>
                Switch to: sign in with an existing account
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
    // margin: 5,
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
    alignItems: "center",
    margin: 5,
  },
  clearButton: {
    backgroundColor: "lightcoral",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
    padding: 5,
  },
  switchTextContainer: {
    alignItems: "center",
  },
  switchText: {
    color: "blue",
    fontSize: 17,
  },
  icon: {
    marginRight: 5,
  },
});

export { SignUp };
