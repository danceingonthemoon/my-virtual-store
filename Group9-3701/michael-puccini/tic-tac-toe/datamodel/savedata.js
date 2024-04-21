import AsyncStorage from '@react-native-async-storage/async-storage';
import Game from './game';

export async function saveData(key, data) {
    let json = JSON.stringify(data);
    try {
        await AsyncStorage.setItem(key, json);
    }
    catch (error) {
        console.log(error);
    }
}

export async function getData(key) {
    try {
        let data = await AsyncStorage.getItem(key);
        return data != null ? JSON.parse(data) : null;
    }
    catch (error) {
        console.log(error);
    }
}

export function saveGame(game) {
    let jason = JSON.stringify(game);
    console.log("Saving game: " + jason);
    // console.log("Saving game: ");
}

// Test data
export function loadGames() {
    let games = [];
    for (let i = 0; i < 15; i++) {
        let game = {
            id : i,
            gameState : "X Wins",
            steps : 7,
            gameTime : "7:00 PM",
            gameDate : "7/7/77",
        }
        games[i] = game;
    }
    // console.log("Games: " + games[0]);
    // games.forEach(game => console.log(game));
    return games;
}
