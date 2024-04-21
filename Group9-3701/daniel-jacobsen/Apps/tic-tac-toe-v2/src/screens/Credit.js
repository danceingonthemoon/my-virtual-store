import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
export default Credit = function ({navigation}){
    const navToBack = () => navigation.goBack();
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    Credits
                </Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.blockText}>
                        Dude who did everything: Daniel Jacobsen
                    </Text>
                    <Text style={styles.blockText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam nec nunc nec odio blandit ultricies.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam nec nunc nec odio blandit ultricies.
                    </Text>
                    <Text style={styles.blockText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam nec nunc nec odio blandit ultricies.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam nec nunc nec odio blandit ultricies.
                    </Text>
                    <Text style={styles.blockText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam nec nunc nec odio blandit ultricies.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam nec nunc nec odio blandit ultricies.
                    </Text>
                    <Text style={styles.blockText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam nec nunc nec odio blandit ultricies.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam nec nunc nec odio blandit ultricies.
                    </Text>
                    <Text style={styles.blockText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Nullam nec nunc nec odio blandit ultricies.
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam nec nunc nec odio blandit ultricies.
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
    buttons: {
        margin: 20,
        width: 90,
        alignSelf: 'center',
    },
})