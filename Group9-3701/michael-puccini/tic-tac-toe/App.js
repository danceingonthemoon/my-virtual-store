import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Rules from './src/screens/Rules';
import Credit from './src/screens/Credit';
import LoadPage from './src/screens/LoadPage';

// const steps = ["O", "", "O", "X", "X", "O", "X", "", "O"];

const Stack = createStackNavigator();

export default function App() {
  return (
    // <Home />

  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Rules" component={ Rules } />
      <Stack.Screen name="Credit" component={Credit} />
      <Stack.Screen name="Load Game" component={LoadPage} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}
