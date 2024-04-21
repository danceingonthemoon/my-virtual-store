import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialState } from './game';

const key = 'savedGames';

async function handleSave(gameState, updateGameState) {
    console.log("Saving game");
    try{
        // Retrieve current save game data
        const currentDataString = await AsyncStorage.getItem(key);
        const currentData = currentDataString ? JSON.parse(currentDataString) : { gameStates: [] };
        // Initialize gameStates array if it doesn't exist 
        // (I dont think i need this but in case anything breaks, uncomment it)
        // if (!currentData.hasOwnProperty('gameStates')) {
        //     currentData.gameStates = []; 
        // }
        
        // add id to gamestate
        gameState.id = currentData.gameStates.length > 0 ? currentData.gameStates[currentData.gameStates.length - 1].id + 1 : 1;
        
        // add time and date to gamestate
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
        gameState.date = formattedDate;
        gameState.time = formattedTime;
        
        // Append new game data to the array 
        currentData.gameStates.push(gameState);

        // save new game data
        const strData = JSON.stringify(currentData);
        
        try {
            await AsyncStorage.setItem(key, strData);
            console.log("Game saved!");
            updateGameState(initialState);
        } catch (error) {
            console.log("Error saving new game: " + error);
            alert("Error saving game: " + error)
        } 
    } catch (error){
        console.log("Error saving game: " + error);
        alert("Error saving game: " + error)
    }
}

const loadSaveGameData = async () => {
    console.log("Loading all saved games...");
    try {
        const currentDataString = await AsyncStorage.getItem(key);
        const currentData = currentDataString ? JSON.parse(currentDataString) : { gameStates: [] };
        if (currentData !== null) {
            return currentData;
        } else {
            console.log("No saved game data found.");
            return currentData;
        }
    } catch (error) {
        console.log("Error loading game:"+ error);
        alert("Error loading game: " + error.message);
        return null; 
    }
}

const deleteSave = async (id, setLoadData) => {
    console.log("Deleting save game with id: ", id);
    try {
        const currentDataString = await AsyncStorage.getItem(key);
        const currentData = currentDataString ? JSON.parse(currentDataString) : { gameStates: [] };
        
        if (currentData !== null) {
            // Filter out the game save with the specified id
            const updatedGameStates = currentData.gameStates.filter(game => game.id !== id);
            // Update the gameStates with the filtered array
            currentData.gameStates = updatedGameStates;
            // Save the updated data back to AsyncStorage 
            await AsyncStorage.setItem(key, JSON.stringify(currentData));
            // Update the local state 
            setLoadData(currentData);
        } else {
            console.log("No saved game data found.");
        }
    } catch (error) {
        console.log("Error deleting game:" + error);
        alert("Error deleting game: " + error.message);
    }
}

const loadSave = async (id, updateGameState) => {
    console.log("Loading save game with id: ", id);
    try {
        const currentDataString = await AsyncStorage.getItem(key);
        const currentData = currentDataString ? JSON.parse(currentDataString) : { gameStates: [] };
        if (currentData !== null) {
            const saveGameSingle = currentData.gameStates.find(game => game.id === id);
            // set the gameState to the loaded game
            updateGameState(saveGameSingle);
            // return saveGameSingle;
        } else {
            console.log("No saved game data found.");
            return currentData;
        }
    
    } catch (error) {
        console.log("Error loading game:" + error);
        alert("Error loading game: " + error.message);
        return [];
    }
}

async function handleClear() {
    console.log("Clearing all game data!");
    try {
        await AsyncStorage.removeItem(key);
        console.log("Data cleared!");
    } catch (error) {
        console.log("Error clearing game data: ", error);
        alert("Error clearing game data: ", error)
    }
}

export { handleSave, handleClear, loadSaveGameData, deleteSave, loadSave};