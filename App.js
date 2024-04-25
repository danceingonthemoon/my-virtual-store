import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { CategoryProducts } from "./src/screens/CategoryProducts";
import { MyTab } from "./src/components/MyTab";
import { Products } from "./src/screens/Products";
import { ProductDetails } from "./src/screens/ProductDetails";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
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
