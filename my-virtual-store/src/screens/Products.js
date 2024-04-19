import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export const Products = () => {
  const [categories, setCategories] = useState([]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>
      <View style={styles.categories}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <Text key={index} style={styles.category}>
              {category}
            </Text>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
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
    width: 350,
    height: 60,
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
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
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  category: {
    fontSize: 23,
    marginTop: 15,
    fontWeight: "bold",
    height: 60,
    width: 330,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 20,
    color: "blue",
  },
});
