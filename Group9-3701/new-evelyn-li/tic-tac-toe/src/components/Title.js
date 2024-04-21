import { View, Text, StyleSheet } from "react-native";

export default Title = ({ screenName }) => {
  return (
    <View style={styles.container}>
      {screenName === "Home" && (
        <View style={styles.headingsContainer}>
          <Text style={styles.headingsText}>Tic - Tac - Toe</Text>
        </View>
      )}
      {screenName === "Credits" && (
        <View style={styles.headingsContainer}>
          <Text style={styles.headingsText}>Credits</Text>
        </View>
      )}
      {screenName === "Rules" && (
        <View style={styles.headingsContainer}>
          <Text style={styles.headingsText}>Rules</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headingsText: {
    color: "white",
    fontSize: 20,
  },
  headingsContainer: {
    padding: 5,
    width: 350,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
