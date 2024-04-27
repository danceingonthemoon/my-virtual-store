import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Products = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories: ", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate("CategoryProducts", { category: category });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Categories</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.categories}>
            {categories.map((category, index) => {
              return (
                <View key={`${category}-${index}`} style={styles.category}>
                  <TouchableOpacity
                    onPress={() => handleCategoryPress(category)}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "blue",
                      }}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
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
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    height: "7%",
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
    color: "white",
    borderRadius: 10,
  },
  categories: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginTop: 20,
    fontWeight: "bold",
  },
  category: {
    marginTop: 10,
    margin: 10,
    width: "93%",
    height: "8%",
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
