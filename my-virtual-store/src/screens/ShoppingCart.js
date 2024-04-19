// import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export const ShoppingCart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      <View style={styles.cart}>
        <Text>Cart is empty</Text>
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
