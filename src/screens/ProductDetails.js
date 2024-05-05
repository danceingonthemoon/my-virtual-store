import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductDataAsync,
//   selectCart,
//   addToCart,
// } from "../stores/cartSlice";
import {
  fetchProductDataAsync,
  addToCart,
  selectCart,
} from "../stores/cartSlice1";

export const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route?.params;
  const dispatch = useDispatch();
  const productData = useSelector(selectCart);

  console.log("productData", productData);
  // console.log("product", product);
  // handle add to cart button
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigation.goBack();
  };

  useEffect(() => {
    console.log("productId", productId);
    dispatch(fetchProductDataAsync(productId));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <View style={styles.cart}>
        <Image source={{ uri: productData?.image }} style={styles.image} />
        <Text style={styles.title}>{productData?.title}</Text>
        <View style={styles.box}>
          <Text style={styles.letter}>Rate : {productData?.rating?.rate}</Text>
          <Text style={styles.letter}>Count: {productData?.rating?.count}</Text>
          <Text style={styles.letter}>Price: ${productData?.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonBox}>
            <View style={styles.iconBox}>
              <Icon
                name="close"
                size={20}
                color="red"
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: "lightgreen",
                }}
              />
            </View>
            <TouchableOpacity title="Back" onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: 19,
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
              <Icon name="cart" size={23} color="blue" />
            </View>
            <TouchableOpacity
              title="Add To Cart"
              onPress={() => handleAddToCart(productData)}
            >
              <Text
                style={{
                  fontSize: 19,
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
                backgroundColor: "lightgrey",
              }}
            >
              {productData?.description}
            </Text>
          </View>
        </View>
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
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    height: "6%",
    backgroundColor: "orange",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 25,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    color: "white",
  },
  cart: {
    flex: 1,
    width: "97%",
    // height: 300,
    // backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  image: {
    width: "100%",
    height: "40%",
    borderRadius: 10,
    borderWidth: 1,
  },
  box: {
    flexDirection: "row",
    width: "98%",
    margin: 8,
    padding: 8,
    backgroundColor: "lightgreen",
    borderRadius: 10,
    justifyContent: "space-between",
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
    margin: 8,
    // backgroundColor: "lightgreen",
  },
  buttonBox: {
    flexDirection: "row",
    // padding: 5,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: "orange",
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
});
