import { View, Text, StyleSheet, Button } from 'react-native';

export default Detail = function ({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:20,color:'white'}}>
                The Detail Screen
            </Text>
            <Button title="More Details..."
                onPress= {() => navigation.push('Detail')} />
            <Button title='Home' onPress = {()=>navigation.navigate('Home')}/>
            <Button title='Back' onPress = {()=>navigation.navigate('goBack')}/>
            <Button title='Top' onPress = {()=>navigation.navigate('popToTop')}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
