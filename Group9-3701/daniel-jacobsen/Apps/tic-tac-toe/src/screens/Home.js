import { View, Text, StyleSheet, Button } from "react-native";
export default Home = function ({navigation}) {
    const navToRules = () => navigation.navigate('Rules');
    const navToCredit = () => navigation.navigate('Credit');
    const steps = ['O','','O','X','X','O','X','','O'];
    return (
        <View style={styles.container}>
            
            <View>
                <Text style={styles.heading}>Tic-Tac-Toe-Bro!</Text>
            </View>

            <View style={styles.gameBoard}>
                <Board steps={steps} />
            </View>
        
            <View style={styles.buttonsContainer}>
                <View style={styles.buttons}>
                    <Button title='Rules' onPress={navToRules}>
                        Go to rules
                    </Button>
                </View>

                <View style={styles.buttons}>

                    <Button title='Credits' onPress={navToCredit}>
                        Go to credits
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC3FF',
        alignItems: 'center',
        margin:20,
    },
    heading: {
        fontSize: 40,
        margin: 20,
    },      
    gameBoard: {
        flex: 1,
        margin: 40,
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    buttons: {
        margin: 20,
        width: 90,
    },
})