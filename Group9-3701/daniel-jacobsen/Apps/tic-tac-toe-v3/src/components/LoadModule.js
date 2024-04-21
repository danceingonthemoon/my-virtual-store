// LoadModule.js
import { Button } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default LoadModule = function({gameState, index, del, load, update, set}) {   
    const navigation = useNavigation();
    const {id, winner, moveHistory, time, date} = gameState;
  
    return (
        <View style={styles.loadPanel}>
            <View style={styles.header}>
                <Text style={styles.data}>({index+1})  </Text>
                <Text style={styles.title}>Result: </Text>
                <Text style={styles.data}>{winner ? winner : "Tie  "}  </Text>
                <Text style={styles.title}>Steps: </Text>
                <Text style={styles.data}>{moveHistory.length-1}  </Text>
                <Text style={styles.title}>ID: </Text>
                <Text style={styles.data}>{id}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>Date: </Text>
                <Text style={styles.data}>{date}  </Text>
                <Text style={styles.title}>Time: </Text>
                <Text style={styles.data}>{time}</Text>
            </View>
            <View>
                <View style={styles.footer}>
                    <View style={styles.leftFoot}>
                        <Button title='Delete' onPress={() => del(id, set)} />
                    </View>
                    <View style={styles.middleFoot}>
                    </View>
                    <View style={styles.rightFoot}>
                        <View>
                            <Button title='Load' onPress={() => {
                                load(id, update);
                                navigation.goBack();
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    leftFoot: {
        width: '25%',
        marginLeft: 10,
    },
    rightFoot: {
        width: '25%',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    middleFoot: {
        width: '50%',
    },
    loadPanel: {
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: '#DDFFDD',
    },
    header: {
        paddingBottom: 5,
        flexDirection: 'row',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    data: {
        fontSize: 18,
        fontWeight: 'regular',
    },
    body: {
        paddingVertical: 10,
    },
    description: {
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});