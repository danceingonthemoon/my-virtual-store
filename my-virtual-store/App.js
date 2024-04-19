import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Products } from "./src/screens/Products";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShoppingCart } from "./src/screens/ShoppingCart";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
