import { StyleSheet, Text, View } from 'react-native';
// import color from "../constants/color";
import { useState } from 'react';

export const Chess = ({text, index, game}) => {
    const chessStyle = {
        ...styles.chess,
        color: game.isHighlighted(index) ? 'red' : 'white',
    }
    return (
        <View style={styles.box} >
            <Text style={chessStyle} onPress={()=>game.makeMove(index)}>{text}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    box: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'black',
    },
    chess: {
        fontSize: 50,
        textAlign: 'center',
    }
});
