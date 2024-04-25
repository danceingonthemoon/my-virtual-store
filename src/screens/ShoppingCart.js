import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { ADD_TO_CART } from "../stores/cartReducers";
import { connect } from "react-redux";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export const ShoppingCart = () => {
  // TODO: write a function to display all of the items in the cart

  const cartItems = useSelector((state) => state.cart.cart); //?? not state.cart

  const cartItemsArray = Object.values(cartItems);
  console.log("cartItemsArray", cartItemsArray);

  const jasonCartItems = JSON.stringify(cartItemsArray);
  const total = cartItemsArray.reduce(
    (acc, item) => Math.round(acc + item.price),
    0
  );
  console.log("total", total);

  // TODO: ShoppingCart show how many items in the cart on the tab bar
  // TODO: Add a button to add items also show the total price of the cart

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Shopping Cart</Text>
        <View style={styles.cart}>
          <View style={styles.top}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              Items : {cartItemsArray.length}
            </Text>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              Total Price : ${total}
            </Text>
          </View>

          <View style={styles.products}>
            {cartItemsArray.map((item) => (
              <View style={styles.product}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productInfo}>
                  <ScrollView>
                    <Text style={styles.title}>{item.title}</Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "space-between",
                        marginTop: 15,
                        flexDirection: "row",
                        paddingHorizontal: 5,
                      }}
                    >
                      <TouchableOpacity>
                        <Icon name="minus-circle" size={18} color="blue" />
                      </TouchableOpacity>
                      <Text style={styles.quantity}> quantity : {}</Text>
                      <TouchableOpacity>
                        <Icon name="plus-circle" size={18} color="green" />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps)(ShoppingCart);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 15,
    backgroundColor: "white",
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
  },
  products: {
    flex: 1,
    height: "100%",
    padding: 5,
    // flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  product: {
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
    // marginVertical: 5,
    width: "97%",
    height: "18%",

    justifyContent: "center",
    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  image: {
    width: "30%",
    height: "90%",
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 17,
    // fontWeight: "bold",
    color: "black",
    marginTop: 3,
  },
  productInfo: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrapper: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
  buttonBox: {
    flexDirection: "row",
    padding: 5,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "orange",
    marginBottom: 10,
  },
  quantity: {
    fontSize: 16,

    fontWeight: "bold",
    color: "black",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: "98%",
    backgroundColor: "green",
  },
});
