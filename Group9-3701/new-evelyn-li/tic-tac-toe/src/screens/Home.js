import { View, Text, StyleSheet, ScrollView } from "react-native";
import Board from "../components/Board";
import Title from "../components/Title";
import MainButtons from "../components/TButton";
import { useNavigation } from "@react-navigation/native";
export default Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title screenName="Home" />
        <Board />
        <MainButtons navigation={navigation} screenName="Home" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignContent: "center",
    margin: 20,
    padding: 20,
  },
});
