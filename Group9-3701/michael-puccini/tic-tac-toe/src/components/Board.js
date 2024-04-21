import { StyleSheet, Text, View } from 'react-native';
import { Chess } from './Chess';
// import color from "../constants/color";

export default Board = ({game, steps}) => {
    return (
        <View style = {styles.board}>
            {steps.map((s,i) => (<Chess text={s} index={i} key={i} game={game}/> ))}
        </View>
    )
}
const styles = StyleSheet.create({
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        width: '80%',
        aspectRatio: 1,
        backgroundColor: 'orange',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: '5%',
    },
});

