import { View, Text, StyleSheet, Button } from 'react-native';
import TButton from '../components/TButton';
import color from '../constants/color';
import { ScrollView } from 'react-native-gesture-handler';

export default Credit = function ({navigation}) {
    return (
        <View style={styles.container}>
            <Title text="Credits" />
            <View style={styles.textBox}>
                <ScrollView>

                <Text style={{fontSize:20,color:'white'}}>Credits goes here.</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                <Text style={{fontSize:18,color:'white'}}>The Rules for Tic-tac-toe</Text>
                </ScrollView>
            </View>

            <TButton title="Back!" onPress={()=>navigation.goBack()}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: color.backgroundColor,
        backgroundColor: 'grey',
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
