import { View, Text, Button, StyleSheet } from "react-native";
import Title from "../components/Title";
import MainButtons from "../components/TButton";
import { useNavigation } from "@react-navigation/native";
export default Rules = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Title screenName="Rules" />
      <Text style={styles.text}>
        Objective: The objective of Tic Tac Toe is to get three of your own
        symbols (traditionally X or O) in a row, either horizontally,
        vertically, or diagonally, on a 3x3 grid.{"\n\n"}Players: Tic Tac Toe is
        typically played by two players, who take turns marking empty cells on
        the grid.{"\n\n"}Starting Position: The game starts with an empty 3x3
        grid. Gameplay: Players take turns placing their symbol (X or O) in an
        empty cell of the grid. The first player typically uses X, and the
        second player uses O. Once a player places their symbol in a cell, they
        cannot move it.{"\n\n"}Winning: The game is won when one player
        successfully places three of their symbols in a row, either
        horizontally, vertically, or diagonally. If a player achieves this, they
        are declared the winner, and the game ends.{"\n\n"}Draw: If all cells on
        the grid are filled, and no player has achieved three in a row, the game
        is a draw. In a draw, neither player wins, and the game ends.{"\n\n"}
        Ending the Game: The game ends when one player wins or when the game is
        a draw. After the game ends, players may choose to play again.
      </Text>
      <MainButtons navigation={navigation} screenName="Rules" />
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
    backgroundColor: "green",
    fontSize: 13,
    color: "white",
    textAlign: "justify",
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
