import { Ionicons } from "@expo/vector-icons";
import { Products } from "../../src/screens/Products";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShoppingCart } from "../../src/screens/ShoppingCart";
import React from "react";
import { ProductDetails } from "../../src/screens/ProductDetails";
import { CategoryProducts } from "../../src/screens/CategoryProducts";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Products" component={Products} />
    <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
  </Stack.Navigator>
);
export const MyTab = () => {
<<<<<<< HEAD
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
=======
  <Tab.Navigator>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ProductDetails"
      component={ProductDetails}
      options={{
        tabBarLabel: "Details",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="information-circle" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ShoppingCart"
      component={ShoppingCart}
      options={{
        tabBarLabel: "Cart",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>;
>>>>>>> M2Ok
};
