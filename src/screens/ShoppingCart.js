import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

export const ShoppingCart = () => {
  // TODO: write a function to display all of the items in the cart
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const cartItemsArray = Object.values(cartItems);
  console.log("cartItemsArray", cartItemsArray);

  let total = 0;
  for (let i = 0; i < cartItemsArray.length; i++) {
    const price = parseFloat(cartItemsArray[i].price);
    if (!isNaN(price)) {
      total += price;
    }
  }
  const roundedTotal = Math.round(total * 100) / 100;
  console.log("total", total);
  const handleIncrease = () => {
    dispatch({ type: INCREASE_COUNT });
  };
  const handleDecrease = () => {
    dispatch({ type: DECREASE_COUNT });
  };
  // const itemQuantity = cartItems[productId] ? cartItems[productId].quantity : 0;
  // const quantity = cartItemsArray.reduce((acc, item) => acc + item.quantity, 0);
  // console.log("quantity", quantity);
  // TODO: ShoppingCart show how many items in the cart on the tab bar
  // TODO: Add a button to add items also show the total price of the cart
  // TODO: Show items in the cart when the user exits the app and comes back

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      <View style={styles.cart}>
        <View style={styles.top}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
            Items : {cartItemsArray.length}
          </Text>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
            Total Price : ${roundedTotal}
          </Text>
        </View>

        <View style={styles.products}>
          {cartItemsArray.map((item, index) => (
            <View style={styles.product} key={index}>
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
                    <Text style={styles.quantity}>
                      quantity:{item.quantity}
                    </Text>
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
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
  count: state.counter,
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
    height: "96%",
    width: "100%",
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
    justifyContent: "flex-start",

    alignItems: "stretch",
  },
  product: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
    marginVertical: 10,
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
    justifyContent: "flex-start",
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
  // quantity: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "black",
  // },
});
