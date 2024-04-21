import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Chess } from "./Box";

export default Board = function () {
  // const steps = ["O", "", "X", "X", "O", "X", "", "O", "X"];
  // initialize the board to manage board state
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  //write a function to allow interact players
  const [step, setStep] = useState("");
  const [moveHistory, setMoveHistory] = useState([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  //  move backwards
  const navigateToPreviousMove = () => {
    if (currentMoveIndex > 0) {
      // moveHisotry (array) stores all of the previous board states
      // const previousBoard = moveHistory[moveHistory.length - 1];
      // setBoard(previousBoard);
      const newIndex = currentMoveIndex - 1;
      setCurrentMoveIndex(newIndex);
      setBoard(moveHistory[newIndex]);
      // setMoveHistory(moveHistory.slice(0, -1));
      console.log(moveHistory);

      setStep(step === "X" ? "O" : "X");
    }
  };
  // move forward
  const navigateToNextMove = () => {
    if (currentMoveIndex < moveHistory.length - 1) {
      const newIndex = currentMoveIndex + 1;
      console.log(newIndex);
      setCurrentMoveIndex(newIndex);
      setBoard(moveHistory[newIndex]);
      console.log(moveHistory);
      setStep(step === "X" ? "O" : "X");
    }
  };
  const navigation = useNavigation();

  // NewGame cellClick
  const cellClick = (index) => {

    const newBoard = [...board];
    newBoard[index] = step;
    setBoard(newBoard);
    setStep(step === "X" ? "O" : "X");
    setMoveHistory([...moveHistory, newBoard]);
    console.log(moveHistory);
  };
  // NewGame function
  const newGame = () => {
    setBoard(initialBoard);
    setMoveHistory([]);
    setCurrentMoveIndex(0);
    setStep("");
  };

  const isBoardEmpty = board.every((cell) => cell === null);
  return (
    <View>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={navigateToPreviousMove}
          style={[styles.topButton, { backgroundColor: "grey" }]}
        >
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // isBoardEmpty={false}
          onPress={newGame}
          disabled={isBoardEmpty}
          style={[styles.button, { backgroundColor: "grey" }]}
        >
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToNextMove}
          style={[styles.topButton, { backgroundColor: "grey" }]}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.board}>
        <View style={styles.grid}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => cellClick(index)}
            >
              <Chess text={cell} />
            </TouchableOpacity>
          ))}
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  board: {
    backgroundColor: "purple",
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
    aspectRatio: 1,
    padding: 30,
    marginTop: 20,
  },
  grid: {
    backgroundColor: "green",
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",

    // padding :10,
  },
  cell: {
    width: "33.33%",
    aspectRatio: 1,
  },
  topButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: 10,
    marginTop: 10,
    padding: 30,
    paddingHorizontal: 10,
  },
  topButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
