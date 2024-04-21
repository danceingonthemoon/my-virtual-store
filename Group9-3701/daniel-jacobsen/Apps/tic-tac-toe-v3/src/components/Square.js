// Square.js
import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Pressable  } from "react-native";
// import color from "../constants/color";

export const Square = ({text, handleMove, isWinningSquare}) => {
    const [symbol, setSymbol] = useState(text);

    useEffect(() => {
        setSymbol(text); // Update symbol when text changes
    }, [text]);
    
    return (
        <Pressable style={[styles.box, isWinningSquare && styles.winningBox]} onPress={handleMove}>
            <Text style={styles.innerText}>{symbol}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    box: { // red box
        width: 85,
        height: 85,        
        backgroundColor: '#FF0000',
        padding: 10,
        margin: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    winningBox: {
        backgroundColor: '#FF6666',
    },
    innerText: {
      fontSize: 40,
      color: '#FFFFFF',
    },
  });