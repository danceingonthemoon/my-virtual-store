import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Categories = () => {
  const categories = [
    { id: "1", name: "Burgers" },
    { id: "2", name: "Pizza" },
    { id: "3", name: "Pasta" },
    { id: "4", name: "Salads" },
    { id: "5", name: "Desserts" },
  ];
  return (
    <View style={styles.container}>
      <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});