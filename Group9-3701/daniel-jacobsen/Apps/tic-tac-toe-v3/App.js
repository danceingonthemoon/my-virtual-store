import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Pressable } from 'react-native';

import Board from './src/components/Board';
import Home from './src/screens/Home';
import Rules from './src/screens/Rules';
import Credit from './src/screens/Credit';
import Load from './src/screens/Load';

const steps = ['O','','O','X','X','O','X','','O']
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Rules" component={Rules}/>
        <Stack.Screen name="Credit" component={Credit}/>
        <Stack.Screen name="Load" component={Load}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF00FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 60,
    borderBottomWidth: 15,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: '#fff'
  }
});


