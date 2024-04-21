import {View, Text, StyleSheet } from "react-native";
// import color from "../constants/color";

export const Square = ({text}) => {
    return (
        <View style={styles.box}>
            <Text style={styles.innerText}>{text}</Text>
        </View>
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
    innerText: {
      fontSize: 40,
      color: '#FFFFFF',
    },
  });