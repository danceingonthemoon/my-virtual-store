import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

// import color from '../constants/color';
import Board from '../components/Board';
import Title from '../components/Title';
import RButton from '../components/RButton';
import Game from '../../datamodel/game.js';
import { saveGame } from '../../datamodel/savedata.js';

const game = new Game();

export default Home = function () {
    const navigation = useNavigation();
    const [steps, setSteps] = useState(Array(9).fill(""));
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameState, setGameState] = useState("X to Play");

    const [modalVisible, setModalVisible] = useState(false);

    // TODO Figure out if this is the best way to do this.
    // Inject setSteps into Game
    game.setSteps = setSteps;
    game.setIsPlaying = setIsPlaying;
    game.setGameState = setGameState;
    // gameState = game.checkState(steps);

    return (
        <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.centeredView}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Title text="Save Game" />
            <Text>Press Save to save this game and start a new game?</Text>
            <View style={{flexDirection: 'row', gap: 5 }} >
                <TButton title='Save' width='40%' onPress = {()=> {saveGame(game); setModalVisible(!modalVisible);}}/>
                <TButton title='Cancel' width='40%' onPress = {() => setModalVisible(!modalVisible)}/>
            </View>

          </View>
        </View>
      </Modal>

            <Title text="Tic Tac Toe" />

            <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around' }} >
                {game.canUndo() ? <RButton title='<' backgroundColor='grey' onPress={()=>game.undo()}/> : <RButton title='<' onPress={()=>game.undo()}/>}
                <TButton title='New Game' onPress={()=>game.newBoard()} width='40%'/>
                {game.canRedo() ? <RButton title='>' onPress={()=>game.redo()}/> : <RButton title='>' backgroundColor='grey' onPress={()=>game.redo()}/>}
            </View>

            <Title text={gameState} />

            <Board game={game} steps={steps}/>

            <View style={{flexDirection: 'row', gap: 5 }} >
                <TButton title='Load' onPress = {()=>navigation.navigate('Load Game')}/>
                {game.isPlaying ? <TButton title='Save' color='grey'/> : <TButton title='Save' onPress={()=>setModalVisible(!modalVisible)}/>}
                {/* <TButton title='Save' onPress = {()=>navigation.navigate('Rules')}/> */}
                <TButton title='Rules' onPress = {()=>navigation.navigate('Rules')}/>
                <TButton title='Credits' onPress = {()=>navigation.navigate('Credit')}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: '30%',
        width: '60%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        gap: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: 'black',
        borderWidth: 1,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});
