import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Products = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        // handle error
        if (res.status !== 200) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching categories: ", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    console.log(category);
    navigation.navigate("CategoryProducts", { category: category });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Categories</Text>
        <View style={styles.categories}>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.category}
                onPress={() => handleCategoryPress(category)}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    width: "99%",
    height: "10%",
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  categories: {
    flex: 1,
    // display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "bold",
  },
  category: {
    marginTop: 15,
    height: 50,
    width: 330,
    backgroundColor: "lightgreen",

    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 10,

    borderColor: "black",
    borderWidth: 1,
  },
});
