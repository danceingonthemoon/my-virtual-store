import { View, Text, StyleSheet, Button } from "react-native";
export default Rules = function ({navigation}){
    const navToBack = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize:20, color:'white'}}>
                    Rules
                </Text>
            </View>
            <View>
                <Text>
                    Objective: The objective of Tic Tac Toe is to get three of 
                    your own symbols (traditionally X or O) in a row, either 
                    horizontally, vertically, or diagonally, on a 3x3 grid.

                    Players: Tic Tac Toe is typically played by two players, 
                    who take turns marking empty cells on the grid.

                    Starting Position: The game starts with an empty 3x3 grid.

                    Gameplay: Players take turns placing their symbol (X or O) in an 
                    empty cell of the grid. The first player typically uses X, 
                    and the second player uses O. Once a player places their 
                    symbol in a cell, they cannot move it.

                    Winning: The game is won when one player successfully places 
                    three of their symbols in a row, either horizontally, 
                    vertically, or diagonally. If a player achieves this, they 
                    are declared the winner, and the game ends.

                    Draw: If all cells on the grid are filled, and no player has 
                    achieved three in a row, the game is a draw. In a draw, 
                    neither player wins, and the game ends. 
                    
                    Ending the Game: The game ends when one player wins or when 
                    the game is a draw. After the game ends, players may choose 
                    to play again.

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
        backgroundColor: 'blue',
    },
    buttons: {
        margin: 20,
        width: 90,
    },
})