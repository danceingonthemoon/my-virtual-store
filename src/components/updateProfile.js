import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import axios from "./axiosConfig";
import { Ionicons } from "@expo/vector-icons";
import { updateUserProfile } from "../service/authService";
import { selectUserDetails, updateUserToken } from "../stores/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { retrieveToken } from "../service/tokenStorage";
import { updateUserDetails } from "../stores/userSlice";
const UpdateProfile = ({ onCancelUpdate }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleNameChange = (value) => {
    setName(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleUpdateProfile = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Name and password are required");
      return;
    }
    try {
      const token = await retrieveToken();
      // console.log("token", token);
      const response = await updateUserProfile({ name, password });
      // console.log("response from updates", response);
      // const responseData = await response.json();
      // console.log("responseData", responseData);
      if (response.status === "OK") {
        Alert.alert("Success", "Profile updated successfully");
        dispatch(updateUserDetails(response));
        return;
      } else {
        Alert.alert("Update Failed", response.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Profile</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New User Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Ionicons name="checkmark" size={22} color="white" />
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancelUpdate}>
          <Ionicons name="close-circle" size={22} color="white" />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    margin: 10,
  },
  label: {
    marginBottom: 10,
    padding: 5,
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 5,
  },
  input: {
    width: "57%",
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // "space-around
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    margin: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default UpdateProfile;
