import { useNavigation } from "@react-navigation/native";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default MainButtons = ({ screenName }) => {
  const navigation = useNavigation();
  const navToRules = () => navigation.navigate("Rules");
  const navToCredits = () => navigation.navigate("Credits");
  const navToBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      {screenName === "Home" && (
        <View>
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              onPress={navToRules}
              style={[styles.button, { backgroundColor: "blue" }]}
            >
              <Text style={styles.buttonText}>Rules</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navToCredits}
              style={[styles.button, { backgroundColor: "blue" }]}
            >
              <Text style={styles.buttonText}>Credits</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {screenName !== "Home" && (
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={navToBack}
            style={[styles.button, { backgroundColor: "blue" }]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  // topButtonsContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   marginBottom: 20,
  //   padding: 20,
  //   // paddingHorizontal: 10,
  // },
  // topButton: {
  //   width: 50,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 40,
  // },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
