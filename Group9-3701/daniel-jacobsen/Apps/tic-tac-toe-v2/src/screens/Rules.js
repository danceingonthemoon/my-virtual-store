import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
export default Rules = function ({navigation}){
    const navToBack = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    Rules
                </Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.blockText}>
                        Objective: The objective of Tic Tac Toe is to get three of 
                        your own symbols (traditionally X or O) in a row, either 
                        horizontally, vertically, or diagonally, on a 3x3 grid.
                    </Text>
                    <Text style={styles.blockText}>
                        Players: Tic Tac Toe is typically played by two players, 
                        who take turns marking empty cells on the grid.
                    </Text>
                    <Text style={styles.blockText}>
                        Starting Position: The game starts with an empty 3x3 grid.
                    </Text>
                    <Text style={styles.blockText}>
                        Gameplay: Players take turns placing their symbol (X or O) in an 
                        empty cell of the grid. The first player typically uses X, 
                        and the second player uses O. Once a player places their 
                        symbol in a cell, they cannot move it.
                    </Text>
                    <Text style={styles.blockText}>
                        Winning: The game is won when one player successfully places 
                        three of their symbols in a row, either horizontally, 
                        vertically, or diagonally. If a player achieves this, they 
                        are declared the winner, and the game ends.
                    </Text>
                    <Text style={styles.blockText}>
                        Draw: If all cells on the grid are filled, and no player has 
                        achieved three in a row, the game is a draw. In a draw, 
                        neither player wins, and the game ends. 
                    </Text>
                    <Text style={styles.blockText}>
                        Ending the Game: The game ends when one player wins or when 
                        the game is a draw. After the game ends, players may choose 
                        to play again.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.buttons}>
                <Button title='Back' onPress={navToBack}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3333FF',
    },
    headingContainer: {
        padding: 20, 
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    heading: {
        fontSize:30,
        color:'white',
    },
    blockText: {
        fontSize:18,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        color:'white',
        lineHeight: 24,
    },
    scrollView: {
        flex: 1,
    },
    buttons: {
        margin: 20,
        width: 90,
        alignSelf: 'center',
    },
})