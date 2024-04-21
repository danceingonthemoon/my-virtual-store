import { View, Text, Button, StyleSheet } from "react-native";
import Title from "../components/Title";
import { useNavigation } from "@react-navigation/native";
import MainButtons from "../components/TButton";
export default Credits = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title screenName="Credits" />
      <Text style={styles.text}>
        Tic Tac Toe, also known as noughts and crosses or Xs and Os, is a
        classic paper-and-pencil game that has been enjoyed by people of all
        ages for centuries. Its origins can be traced back to ancient Egypt,
        where similar games involving rows and symbols were played on temple
        walls.{"\n\n"}The modern version of Tic Tac Toe that we know today
        emerged in the 19th century in Europe. It gained popularity as a simple
        yet engaging game that can be played anywhere with just a piece of paper
        and a pencil. Over time, Tic Tac Toe has become a staple in the world of
        games and puzzles, cherished for its simplicity and strategic depth
        despite its straightforward rules.{"\n\n"}Despite its humble origins,
        Tic Tac Toe has stood the test of time and continues to be a beloved
        pastime for people around the globe. Its enduring appeal lies in its
        accessibility, making it a game that anyone can pick up and enjoy with
        friends and family.
      </Text>
      <MainButtons navigation={navigation} screenName="Credits" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "orange",
    margin: 10,
    padding: 30,
  },
  text: {
    backgroundColor: "purple",
    fontSize: 15,
    color: "pink",
    textAlign: "justify",
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
