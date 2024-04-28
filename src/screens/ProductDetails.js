import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

//?? What is the purpose of the useEffect hook??
//The useEffect hook is used to perform side effects in function components.
// It is similar to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.
// It takes two arguments: a function that contains the side effect, and an optional array of dependencies.
// The function is called after the component has rendered, and it is called after every render by default.
export const ProductDetails = () => {
  //?? useState to null or []??
  //null is better because it's more explicit that the data is not available yet
  //[] is better if it's an array of data
  const [product, setProduct] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route?.params;
  const dispath = useDispatch();

  // handle add to cart button
  const handleAddToCart = () => {
    dispath({ type: "ADD_TO_CART", payload: product });
    navigation.navigate("ShoppingCart");
  };
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.log("No productId provided");
        return;
      }
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        console.log("productId", productId);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log("Error fetching products: ", error.message);
      }
    };
    fetchProduct();
  }, []);

  if (!product)
    return (
      <Text
        style={{
          fontSize: 30,
          color: "black",
          flexDirection: "row",
          padding: 35,
          justifyContent: "center",
        }}
      >
        Loading ...
      </Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
      <View style={styles.cart}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.box}>
          <Text style={styles.letter}>Rate : {product.rating.rate}</Text>
          <Text style={styles.letter}>Count: ${product.rating.count}</Text>
          <Text style={styles.letter}>Price: ${product.price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonBox}>
            <View style={styles.iconBox}>
              <Icon name="close" size={13} color="blue" />
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
              <Icon name="close" size={13} color="blue" />
            </View>
            <TouchableOpacity
              title="Add To Cart"
              onPress={() => handleAddToCart()}
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
              {product.description}
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
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    margin: 8,
    backgroundColor: "lightgreen",
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
