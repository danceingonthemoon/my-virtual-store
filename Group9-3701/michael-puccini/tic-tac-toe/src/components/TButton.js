import { StyleSheet, Text, View } from 'react-native';
import color from "../constants/color";

export default TButton = function({title, onPress, width='20%', color='blue'}) {
    const buttonStyle = {
        ...styles.tButton,
        width: width,
        backgroundColor: color,
    };

    return (
        <View style={buttonStyle}>
            <Text style={styles.text} onPress={onPress}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tButton: {
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderColor: 'black',
        borderWidth: 1,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
