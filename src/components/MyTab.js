import { Ionicons } from "@expo/vector-icons";
import { Products } from "../../src/screens/Products";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShoppingCart } from "../../src/screens/ShoppingCart";
import React from "react";

const Tab = createBottomTabNavigator();
export const MyTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName="Products"
      // activeColor="blue"
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          display: "flex",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // check if route exists and if the route name is "Products"
          if (route && route.name === "Products") {
            console.log(route);
            iconName = focused ? "bag" : "bag-outline";
          } else if (route && route.name === "ShoppingCart") {
            iconName = focused ? "cart" : "cart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
