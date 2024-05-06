import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/core";
import {
  increaseQuantity,
  decreaseQuantity,
  cartDetails,
} from "../stores/cartSlice";
import Icon from "react-native-vector-icons/FontAwesome";

export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartDetails);
  console.log("cartItems", cartItems);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsLoading(false);
    calculateTotalItemsAndPrice();
  }, [cartItems]);

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const calculateTotalItemsAndPrice = () => {
    let itemsCount = 0;
    let totalPrice = 0;
    if (Array.isArray(cartItems)) {
      cartItems.forEach((item) => {
        itemsCount += item.quantity;
        totalPrice += item.price * item.quantity;
      });
    }
    setTotalItems(itemsCount);
    setTotalPrice(totalPrice);
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
            <Icon name="minus-circle" size={18} color="blue" />
          </TouchableOpacity>
          <Text style={styles.quantity}>quantity: {item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
            <Icon name="plus-circle" size={18} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      <View style={styles.products}>
        {cartItems.length === 0 ? (
          <Text
            style={{
              fontSize: 30,
              color: "black",
              margin: 30,
              padding: 10,
              fontWeight: "bold",
            }}
          >
            Your cart is empty, please add some items.
          </Text>
        ) : (
          <>
            <View style={styles.top}>
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
              >
                {/* Display total items or total price here */}
                <Text> Total Items: {totalItems} </Text>
                <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
              </Text>
            </View>

            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              contentContainerStyle={styles.products}
            />
          </>
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
    margin: 25,
    padding: 10,
    backgroundColor: "pink",
    height: "99%",
    width: "99%",
    borderRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    width: "98%",
    height: "7%",
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
    marginBottom: 5,
    color: "white",
    borderRadius: 10,
  },
  cart: {
    flex: 1,
    width: "98%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  products: {
    width: "100%",
    flexGrow: 1,
    paddingVertical: 10, 
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    color: "black",
  },
  productInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: "98%",
    backgroundColor: "green",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
