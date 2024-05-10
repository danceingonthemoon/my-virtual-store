<<<<<<< HEAD
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { CategoryProducts } from "./src/screens/CategoryProducts";
import { MyTab } from "./src/components/MyTab";
import { ProductDetails } from "./src/screens/ProductDetails";
=======
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
>>>>>>> M2Ok
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
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Products"
      component={Products}
      options={{ headerShown: false }}
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
    <Stack.Screen
      name="ShoppingCart"
      component={ShoppingCart}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
const MyTab = () => {
  const totalQuantityValue = useSelector(totalQuantity);
  return (
<<<<<<< HEAD
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTab}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Products" component={Products} /> */}
        <Stack.Screen
          name="CategoryProducts"
          component={CategoryProducts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
=======
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
      />

      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{
          headerShown: false,
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: totalQuantityValue ? totalQuantityValue : null,
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
>>>>>>> M2Ok
