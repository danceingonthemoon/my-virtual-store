import { View, Text, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { loadGames } from '../../datamodel/savedata.js';
import { navigation } from '@react-navigation/native';
import LoadView from '../components/LoadView';
import TButton from '../components/TButton';
import Title from '../components/Title';

export default LoadPage = function ({navigation}) {
// export default function LoadPage ({navigation}) {
    let games = loadGames();
    console.log("LoadPage");
    games.forEach(game => console.log(game));

    return (
        <View style={styles.container}>
            <Title text="Load Game" />
            <View style={styles.textBox}>
                <ScrollView>
                    <LoadView games={games} />
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
        alignItems: 'center',
        backgroundColor: 'black',
        width: '90%',
        height: '80%',
        borderRadius: 10,
        padding: 8,
    }
});
