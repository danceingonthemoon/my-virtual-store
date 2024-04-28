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
    marginTop: 20,
    width: "100%",
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
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
  },
  cart: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
});
