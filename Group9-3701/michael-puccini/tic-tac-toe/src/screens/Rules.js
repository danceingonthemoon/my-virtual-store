import { View, Text, StyleSheet, Button } from 'react-native';
import TButton from '../components/TButton';
import { ScrollView } from 'react-native-gesture-handler';

export default Rules = function ({navigation}) {
    return (
        <View style={styles.container}>
            <Title text="Rules" />
            <View style={styles.textBox}>
                <ScrollView>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                        <Text style={{fontSize:20,color:'white'}}>
                            The rules of Tic-tac-toe
                            What else do you need to know.
                            You put an X or an O in a square.
                        </Text>
                </ScrollView>
            </View>
            <TButton title='Back' onPress = {()=>navigation.goBack()}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-around',
    },
    textBox: {
        backgroundColor: 'black',
        width: '90%',
        height: '75%',
        borderRadius: 6,
        padding: 4,
    }
});
