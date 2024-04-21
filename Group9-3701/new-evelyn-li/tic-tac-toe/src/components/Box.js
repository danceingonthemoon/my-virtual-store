import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const Chess = ({ text }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.letters}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth:1, // Add width to the child element
    borderColor: "black",

    width: "100%",
    height: "100%",

  },
  letters: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
    alignItems:'center',
  },
});
