import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import { Products } from "./src/screens/Products";
import { CategoryProducts } from "./src/screens/CategoryProducts";
import { ProductDetails } from "./src/screens/ProductDetails";
import { ShoppingCart } from "./src/screens/ShoppingCart";
import { useSelector } from "react-redux";
import { totalQuantity } from "./src/stores/cartSlice";
import { totalQuantityOrder } from "./src/stores/orderSlice";
import { SignIn } from "./src/screens/SignIn";
import { SignUp } from "./src/screens/SignUp";
import { MyOrders } from "./src/screens/MyOrders";
import { Platform, Alert } from "react-native";
import { useEffect, useState } from "react";
import { selectUserDetails, userID } from "./src/stores/userSlice";
import { LogBox } from "react-native";
// disable the warning message that appears when using nested VirtualizedLists
// this is a known issue with React Native and is not a problem with our code
LogBox.ignoreLogs([
  "Donot show me warning.", // Ignore log warning
]);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Products"
      component={Products}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CategoryProducts"
      component={CategoryProducts}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const UserProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MyTab = () => {
  const totalQuantityValue = useSelector(totalQuantity);
  const totalOrderQuantity = useSelector(totalQuantityOrder);
  const uID = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.id : null
  );
  const authCheck = (name, { navigation }) => ({
    tabPress: (e) => {
      e.preventDefault();
      if (uID) {
        navigation.navigate(name);
      } else {
        Alert.alert(
          "Not allowed to log in",
          "You must log in firstly to view the items"
        );
      }
    },
  });
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!uID) {
              e.preventDefault(); // Prevent default action
              Alert.alert(
                "Access Denied",
                "Please log in to access this page."
              );
            }
          },
        })}
      />

      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          headerShown: false,
          tabBarLabel: "My Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: totalQuantityValue ? totalQuantityValue : null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!uID) {
              e.preventDefault(); // Prevent default action
              Alert.alert(
                "Access Denied",
                "Please log in to access this page."
              );
            }
          },
        })}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerShown: false,
          tabBarLabel: "My Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
          tabBarBadge: totalOrderQuantity ? totalOrderQuantity : null,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!uID) {
              e.preventDefault(); // Prevent default action
              Alert.alert(
                "Access Denied",
                "Please log in to access this page."
              );
            }
          },
        })}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: "User Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTab />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
