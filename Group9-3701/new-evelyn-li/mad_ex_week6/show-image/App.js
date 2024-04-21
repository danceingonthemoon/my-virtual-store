import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SunriseSunset from "./sunrisesunset";
import { useState } from "react";

const url =
  "https://wwwimage-us.pplusstatic.com/thumbnails/photos/w1920-q80/marquee/1040427/kfpla_sp_hero_landscape.jpg";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={AppComponent} />
        <Stack.Screen name="sunrisesunset" component={SunriseSunset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function AppComponent() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const submitHandler = () => {
    setImageUrl(text);
  };
  // error to handle no image ??
  // where to handle it ??

  return (
    <View style={styles.container}>
      <Text>Input image url :</Text>
      <TextInput
        placeholder="Input image url"
        value={text}
        onChangeText={setText}
        multiline={true}
        style={{
          height: 200,
          borderColor: "gray",
          borderWidth: 1,
          width: 300,
        }}
      />
      <Button title="Submit" onPress={submitHandler} />
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={{ height: 400, width: 300 }} />
      )}
      <Button
        title="Sunrise and Sunset"
        onPress={() => navigation.navigate("sunrisesunset")}
      />
      <StatusBar style="auto" />
    </View>
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
