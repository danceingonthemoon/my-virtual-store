import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { loadSaveGameData, deleteSave, loadSave } from "../datamodel/storage";
import LoadModule from "../components/LoadModule";

export const fetchSavedGames = async (setLoadedData) => {
    try {
        const data = await loadSaveGameData();
        setLoadedData(data);
    } catch (error) {
        console.error("Error loading saved games:", error);
    }
};

export default Load = function ({navigation, route}){
    const { updateGameState } = route.params;
    const [loadedData, setLoadedData] = useState([]);
    const navToBack = () => navigation.goBack(); 

    useEffect(() => {
        fetchSavedGames(setLoadedData);
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    Load Game
                </Text>
            </View>
                <View style={styles.savedGamesContainer}>
                    <FlatList
                        data={loadedData.gameStates}
                        renderItem={({ item, index }) => (
                            <LoadModule 
                                gameState={item} 
                                del={deleteSave} 
                                load={loadSave} 
                                index={index} 
                                update={updateGameState} 
                                set={setLoadedData} 
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatList}
                    />
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
        backgroundColor: 'green',
    },
    headingContainer: {
        padding: 20, 
        backgroundColor: '#006400',
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
    savedGamesContainer: {
        margin: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 2,
        height: 630,
    },
    singelGame: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    buttons: {
        marginBottom: 10,
        width: 90,
        alignSelf: 'center',
    },
    gameButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

