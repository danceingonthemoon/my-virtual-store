import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDataAsync, selectCart } from "../stores/productSlice";
import { addToCart } from "../stores/cartSlice";
import { cartDetails } from "../stores/cartSlice";
import { postCartServer } from "../service/cartService";
export const ProductDetails = ({ token }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const cartItems = useSelector(cartDetails);
  // console.log("cart itmes", cartItems);
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const productData = useSelector(selectCart);
  // console.log("productData", productData);

  useEffect(() => {
    const syncCartWithServer = async () => {
      try {
        await postCartServer(cartItems);
        console.log("Cart items synced with server:", cartItems);
      } catch (error) {
        console.error("Failed to sync cart with server:", error);
      }
    };
    if (cartItems.length > 0) {
      syncCartWithServer();
    }
    setIsLoading(false);
  }, [cartItems]);
  const handleAddToCart = async () => {
    try {
      // Add the product to the Redux store
      dispatch(addToCart(productData));
      // Wait for the next tick to allow Redux state to update
      const response = await postCartServer({ cartItems });
      if (response.status === "OK") {
        await new Promise((resolve) => setTimeout(resolve, 100));
        dispatch({
          type: "cart/saveCartToServer",
          async: true,
          payload: cartItems,
        });
      }
      console.log("cart items after clicking addtocart button", cartItems);
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to add the product to the cart."
      );
    }
  };

  useEffect(() => {
    // console.log("productId", productId);
    dispatch(fetchProductDataAsync(productId));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <ScrollView
        maintainVisibleContentPosition={{ auto: true }}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.cart}>
          <Image source={{ uri: productData?.image }} style={styles.image} />
          <Text style={styles.title}>{productData?.title}</Text>
          <View style={styles.box}>
            <Text style={styles.letter}>
              Rate : {productData?.rating?.rate}
            </Text>
            <Text style={styles.letter}>
              Count: {productData?.rating?.count}
            </Text>
            <Text style={styles.letter}>Price: ${productData?.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <View style={styles.iconBox}>
                <Icon
                  name="arrow-back"
                  size={20}
                  color="purple"
                  style={{
                    borderRadius: 10,
                    borderWidth: 3,
                    // backgroundColor: "lightgreen",
                  }}
                />
              </View>
              <TouchableOpacity
                title="Back"
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonBox}>
              <View style={styles.iconBox}>
                <Icon name="cart" size={25} color="purple" />
              </View>
              <TouchableOpacity
                title="Add To Cart"
                onPress={() => handleAddToCart(productData)}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Add To Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, textAlign: "center", padding: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                justifyContent: "space-between",
              }}
            >
              Description:
            </Text>

            <View>
              <Text
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 1,
                  margin: 5,
                  height: "90%",
                  fontSize: 18,
                  // width: "auto",
                  backgroundColor: "grey",
                }}
              >
                {productData?.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "lightyellow",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    height: "6%",
    backgroundColor: "orange",
    textAlign: "center",
    marginTop: 25,
    padding: 10,
    // margin: 10,
    borderRadius: 15,
    color: "white",
  },
  cart: {
    marginTop: 20,
    flex: 1,
    width: "95%",
    height: "97%",
    // backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    margin: 5,
    borderColor: "yellow",
  },
  image: {
    marginTop: 8,
    width: "100%",
    height: "39%",
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  box: {
    flexDirection: "row",
    width: "98%",
    margin: 8,
    padding: 8,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    justifyContent: "space-between",
    borderColor: "yellow",
  },
  letter: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  iconBox: {
    // borderWidth: 1,
    // borderRadius: 20,
    padding: 5,
    margin: 5,
    // backgroundColor: "lightgreen",
  },
  buttonBox: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "pink",
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
