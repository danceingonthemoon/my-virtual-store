import { StyleSheet, Text, View } from 'react-native';
import { GameRow } from './GameRow';
// import color from "../constants/color";

export default LoadView = ({games}) => {
// const LoadView = ({games}) => {
    games.forEach(game => console.log(game));

    return (
        <View style = {styles.load}>
            {games.map((s,i,a) => (<GameRow index={i} key={i} game={a[i]}/> ))}
        </View>
    )
}
const styles = StyleSheet.create({
    load: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        // width: '100%',
        // height: '100%',
        // aspectRatio: 1,
        // backgroundColor: 'black',
        // borderWidth: 2,
        // borderColor: 'black',
        // borderRadius: 10,
        // padding: '5%',
        gap: 10,
    },
});

// export default LoadView;
