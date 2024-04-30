import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { CategoryProducts } from "./src/screens/CategoryProducts";
import { MyTab } from "./src/components/MyTab";
import { Products } from "./src/screens/Products";
import { ProductDetails } from "./src/screens/ProductDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import React from "react";

const Stack = createStackNavigator();

export default function App() {
  return (
    //?? What is the purpose of the Provider component??
    //The Provider component is used to wrap the entire application so that
    // the Redux store is available to all components in the application.
    // This is done by passing the store as a prop to the Provider component. e.g. database
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MyTab}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Products" component={Products} /> */}
          <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
