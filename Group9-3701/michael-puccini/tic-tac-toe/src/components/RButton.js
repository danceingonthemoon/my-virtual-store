import { StyleSheet, Text, View } from 'react-native';
import color from "../constants/color";

export default RButton = function({title, onPress, backgroundColor='blue'}){
    return (
        <View style={[styles.tButton,{backgroundColor: backgroundColor}]} onPress={onPress}>
            <Text style={styles.text} onPress={onPress}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tButton: {
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 1,
        width: 30,
        height: 30,
        // height: '3rem',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
