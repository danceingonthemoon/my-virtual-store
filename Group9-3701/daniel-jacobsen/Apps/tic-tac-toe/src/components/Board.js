import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Square } from './Square';
// import color from "../constants/color";

export default Board = function({steps}) {
  return (
    <View style={styles.board}>
        {steps.map((s, i)=>(
            <Square key={i} text={s} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFF00',
    padding: 10,
    borderRadius: 15,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});


