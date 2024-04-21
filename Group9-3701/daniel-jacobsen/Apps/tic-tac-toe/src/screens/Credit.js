import { View, Text, StyleSheet, Button } from "react-native";
export default Credit = function ({navigation}){
    const navToBack = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize:20, color:'white'}}>
                    Credits
                </Text>
            </View>    

            <View>
                <Text>
                    Daniel jacobsen
                </Text>
            </View>

            <View style={styles.buttons}>
                <Button title='Back' onPress={navToBack}/>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    buttons: {
        margin: 20,
        width: 90,
    },
})