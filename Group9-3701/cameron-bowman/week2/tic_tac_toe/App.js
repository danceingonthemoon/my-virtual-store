import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <View style={styles.board}>
          <Text style={styles.pieces}>X</Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}></Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}></Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}>O</Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}></Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}></Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}>X</Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}></Text>
        </View>
        <View style={styles.board}>
          <Text style={styles.pieces}>O</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7C7C7C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  board: {
    flex: 1,
    backgroundColor: '#69FFB5',
    aspectRatio: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 15,
    width: '30%',
    height: '30%',
  },

  border: {
    width: 300,
    height: 300,
    backgroundColor: '#AE6506',
    padding: 10,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pieces: {
    fontSize: 40,
    color: '#FFFFFF',

  }
});
