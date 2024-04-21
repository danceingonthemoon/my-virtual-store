import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, StyleSheet, View, Pressable } from 'react-native';

export default function App() {
  const getButStyle = ({pressed})=>
    pressed ? [styles.pressed, styles.button] : [styles.button];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Hello world!!
      </Text>
      <View style={styles.horizontalLine} />
      <Text style={styles.paragraph}>
        From Group 9
      </Text>
      {/* <Pressable
        style={getButStyle}
        onPress={() => {
          ct++;
          console.log(`I am clicked ${ct} times`);
        }}
      >
      <Text>Button</Text>
      </Pressable> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'regular',
    textAlign: 'center',
  },
  horizontalLine: {
    height: 2, // Thickness of the line
    width: '30%', // Length of the line; adjust as needed
    backgroundColor: '#000', // Color of the line
  },
  button:{
    backgroundColor: "#99f",
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  pressed:{
    opacity: 0.5,
  }
});
