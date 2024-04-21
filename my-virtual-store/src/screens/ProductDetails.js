// import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export const ProductDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <View style={styles.cart}>
        <Text>No Products yet</Text>
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
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    height: "8%",
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  cart: {
    flex: 1,
    width: 350,
    height: 300,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
});
