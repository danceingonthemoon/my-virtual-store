import { StyleSheet, Text, View } from 'react-native';
// import color from "../constants/color";
import { useState } from 'react';
import TButton from './TButton';

export const GameRow = ({index, game}) => {
    // const chessStyle = {
    //     ...styles.chess,
    //     color: game.isHighlighted(index) ? 'red' : 'white',
    // }
    // <View style={styles.box}>
    return (
        <View style={styles.box}>
        <Text style={styles.textStyle1}>({index}) Result: {game.gameState} Steps: {game.steps} ID: {game.id}</Text>
            <Text style={styles.textStyle2}>Date: {game.gameDate} Time: {game.gameTime}</Text>
            <View style={styles.buttonContainer}>
                <TButton title="Load" onPress={()=>game.loadGame(index)} width='30%' color='blue'/>
                <TButton title="Delete" onPress={()=>game.deleteGame(index)} width='30%' color='blue'/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 100,
        backgroundColor: 'grey',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 5,
    },
    textStyle1: {
        fontSize: 18,
        textAlign: 'left',
    },
    textStyle2: {
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 5,
    }
});
