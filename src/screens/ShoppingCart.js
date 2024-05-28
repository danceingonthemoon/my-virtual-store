import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/core";
import {
  increaseQuantity,
  decreaseQuantity,
  cartDetails,
  fetchCart,
  clearCartData,
} from "../stores/cartSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import { postCartServer } from "../service/cartService";
import { MyOrders } from "./MyOrders";
import { postNewOrder } from "../service/orderService";
import { fetchOrders } from "../stores/orderSlice";

export const ShoppingCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartDetails);
  // console.log("cart items", cartItems);
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

  const handleCheckOut = async () => {
    try {
      const response = await postNewOrder(cartItems);
      console.log("cart Items after checkout :", cartItems);
      if (response.status === "OK") {
        dispatch({
          type: "cart/saveCartToServer",
          async: true,
          payload: cartItems,
        });
        dispatch(clearCartData());
        dispatch(fetchOrders());
        navigation.navigate("MyOrders");
        Alert.alert(
          "Checkout Successful",
          "Your order has been placed successfully!"
        );
      } else {
        throw new Error("Failed to place the order");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to complete the checkout process"
      );
    }
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
    <SafeAreaView style={styles.container}>
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
            <View style={styles.buttonBox2}>
              <View style={styles.iconBox}>
                <Icon name="close" size={12} />
              </View>
              <TouchableOpacity
                title="Checkout"
                onPress={() => handleCheckOut()}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Check Out
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    padding: 5,
    backgroundColor: "lightgreen",
    width: "99%",
    height: "99%",
    borderRadius: 10,
    // marginTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    width: "99%",
    height: "6%",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
    color: "white",
    borderRadius: 10,
  },
  cart: {
    marginBottom: 10,
    width: "100%",
    height: "96%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  products: {
    margin: 10,
    width: "98%",
    flexGrow: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  product: {
    // flexGrow: 1,
    width: "99%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
    margin: 3,
    borderColor: "yellow",
    borderWidth: 2,
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
    // flexDirection: "column",
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
    justifyContent: "space-evenly",
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "blue",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  buttonBox2: {
    flexDirection: "row",
    padding: 10,
    width: "40%",
    // height: "6%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "orange",
    marginBottom: 10,
  },
  iconBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    margin: 7,
    backgroundColor: "lightgreen",
  },
  cartItemsContainer: {
    width: "100%",
    // flexGrow: 1,
  },
});
