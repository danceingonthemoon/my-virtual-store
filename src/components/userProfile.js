import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import UpdateProfile from "../components/updateProfile";
import { useNavigation } from "@react-navigation/native";
import { clearUserDetails, selectUserDetails } from "../stores/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { cartDetails, clearCartData } from "../stores/cartSlice";
import { clearOrders } from "../stores/orderSlice";
const UserProfile = ({ user }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartDetails);
  // const user = useSelector(selectUserDetails);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdateProfileClick = () => {
    setShowUpdateForm(true);
  };
  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
  };
  useEffect(() => {
    console.log("user changes", user);
  }, [user]); // only log when `user` changes

  const handleSignOut = async () => {
    dispatch(clearCartData());
    dispatch({
      type: "cart/saveCartToServer",
      async: true,
      payload: cartItems,
    });
    // console.log("cart items after sign out :", cartItems);
    dispatch(clearOrders());
    dispatch(clearUserDetails());
    navigation.navigate("SignIn");
  };
  return (
    <View style={styles.container}>
      {!showUpdateForm ? (
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.heading}>User Profile</Text>
          </View>
          <Text style={styles.userInfoText}>User Name: {user.name}</Text>
          <Text style={styles.userInfoText}>Email: {user.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateProfileClick}
            >
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSignOut()}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <UpdateProfile
          user={user}
          navigation={navigation}
          onCancelUpdate={handleCancelUpdate}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    margin: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
    color: "white",
    backgroundColor: "purple",
    borderRadius: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  userInfo: {
    alignItems: "center",
    // flex: 1,
    margin: 10,
    // borderWidth: 1,
  },
  userInfoText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UserProfile;
