import { StyleSheet, Text, View } from 'react-native';
import color from "../constants/color";

export default Title = function({text}){
    return (
        <View style={styles.titleBackground}>
            <Text style={styles.title}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: 'white',
    },
    titleBackground: {
        textAlign: 'center',
        backgroundColor: 'green',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        height: '1.5em',
    }
});
