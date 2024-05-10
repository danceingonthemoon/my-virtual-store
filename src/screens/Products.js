import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

export const Products = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
<<<<<<< HEAD
        const formattedCategories = data.map((category) =>
          category.replace(
            /\b\w+('s)?\b/g,
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
        );
        setCategories(formattedCategories);
        console.log("formattedCategories", formattedCategories);
=======
        setCategories(data);
>>>>>>> M2Ok
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories: ", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
<<<<<<< HEAD
    navigation.navigate("CategoryProducts", {
      category: category.toLowerCase(),
    });
=======
    navigation.navigate("CategoryProducts", { category: category });
>>>>>>> M2Ok
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Categories</Text>
<<<<<<< HEAD
        <View style={styles.categories}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : categories.length ? (
            categories.map((category, index) => (
              <View key={category} style={styles.category}>
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text
                    style={{ fontSize: 27, fontWeight: "bold", color: "blue" }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No data found.</Text>
          )}
        </View>
=======
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
>>>>>>> M2Ok
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
    backgroundColor: "lightgreen",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    height: "7%",
    backgroundColor: "purple",
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
    padding: 10,
  },
  category: {
    marginTop: 10,
    margin: 10,
<<<<<<< HEAD
    width: "93%",
    height: "9%",
    backgroundColor: "lightgreen",
=======
    width: "100%",
    height: "8%",
    backgroundColor: "lightpink",
>>>>>>> M2Ok
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
    borderColor: "yellow",
    borderWidth: 1,
  },
});
