// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { initialState, handleMove, handleNewGame, handleUndo, handleRedo } from '../datamodel/game';
import Board from '../components/Board';

export default Home = function ({navigation}) {
    const[gameState, setGameState] = useState(initialState);
    const navToRules = () => navigation.navigate('Rules');
    const navToCredit = () => navigation.navigate('Credit');

    // DEBUG
    // useEffect(() => {
    //     console.log("   board state: ", gameState.board);
    //     console.log("     moveCount: ", gameState.moveCount);
    //     console.log("history length: ", gameState.moveHistory.length);
    // }, [gameState]);

    const { board, moveCount, winner, moveHistory, winningIndexes } = gameState;

    const handleMoveClick = (index) => {
        setGameState((prevState) => handleMove(prevState, index));
    };

    const handleNewGameClick = () => {
        setGameState(handleNewGame());
    };

    const handleUndoClick = () => {
        setGameState((prevState) => handleUndo(prevState));
    };

    const handleRedoClick = () => {
        setGameState((prevState) => handleRedo(prevState));
    };

    
    return (
        <View style={styles.container}>
            
            <View>
                <Text style={styles.heading}>Tic-Tac-Toe-Bro!</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <View>
                    <Button title='<' onPress={handleUndoClick} disabled={moveCount < 1}></Button>
                </View>

                <View style={styles.buttons}>
                    <Button title='New Game' onPress={handleNewGameClick} disabled={moveHistory.length < 2}></Button>
                </View>
                <View>
                    <Button title='>' onPress={handleRedoClick} disabled={moveCount === moveHistory.length-1}></Button>
                </View>
            </View>

            <View style={styles.dynamicContainer}>
                <Text style={styles.dynamicText}>
                    {winner !== null ? `${winner}` : `${gameState.currentPlayer} to play`}
                </Text>
            </View>


            <View style={styles.gameBoard}>
                <Board 
                    board={board}
                    handleMove={handleMoveClick}
                    winningIndexes={winningIndexes}
                />
            </View>
        
            <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
                    <Button title='Rules' onPress={navToRules}>
                        Go to rules
                    </Button>
                </View>

                <View style={styles.buttons}>
                    <Button title='Credits' onPress={navToCredit}>
                        Go to credits
                    </Button>
                </View>

                <View style={styles.buttons}>
                    <Button 
                        title='winInd' 
                        onPress={() => console.log(winningIndexes)}
                    >
                        winInd
                    </Button>
                </View>


            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC3FF', // main page bg color
        alignItems: 'center',
        margin:20,
    },
    heading: {
        fontSize: 40,
        margin: 20,
    },      
    gameBoard: { // the yellow part
        margin: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        margin: 10,
    },
    buttons: {
        marginHorizontal: 10,
        width: 90,
    },
    dynamicContainer: {
        margin: 20,
        backgroundColor: '#CCB3FF',
        width: 300,
        borderRadius: 10,
        paddingVertical: 5,
    },
    dynamicText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#666666',
    },
})