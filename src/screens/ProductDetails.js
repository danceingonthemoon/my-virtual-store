import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
<<<<<<< HEAD
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

=======
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductDataAsync,
//   selectCart,
//   addToCart,
// } from "../stores/cartSlice";
import { fetchProductDataAsync, selectCart } from "../stores/productSlice";
import { addToCart } from "../stores/cartSlice";
>>>>>>> M2Ok
export const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route?.params;
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching products: ", error.message);
      }
    };
    fetchProduct();
=======
  const dispatch = useDispatch();
  const productData = useSelector(selectCart);
  console.log("productData", productData);
  // handle add to cart button
  const handleAddToCart = () => {
    dispatch(addToCart(productData));
    navigation.goBack();
  };

  useEffect(() => {
    // console.log("productId", productId);
    dispatch(fetchProductDataAsync(productId));
>>>>>>> M2Ok
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product Details</Text>
<<<<<<< HEAD
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={styles.cart}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.box}>
            <Text style={styles.letter}>Rate : {product.rating.rate}</Text>
            <Text style={styles.letter}>Count : {product.rating.count}</Text>
            <Text style={styles.letter}>Price : ${product.price}</Text>
=======
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
                  name="close"
                  size={20}
                  color="red"
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
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
>>>>>>> M2Ok
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <View style={styles.iconBox}>
                <Icon name="close" size={13} color="blue" />
              </View>
              <TouchableOpacity
                title="Back"
                onPress={() => navigation.goBack()}
              >
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

<<<<<<< HEAD
            <View style={styles.buttonBox}>
              <View style={styles.iconBox}>
                <Icon name="close" size={13} color="blue" />
              </View>
              <TouchableOpacity
                title="Add To Cart"
                onPress={() => navigation.goBack()}
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
=======
>>>>>>> M2Ok
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
<<<<<<< HEAD
            <ScrollView>
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
            </ScrollView>
          </View>
        </View>
      )}
=======

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
>>>>>>> M2Ok
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
    flex: 1,
<<<<<<< HEAD
    width: "98%",
    // height: 300,
=======
    width: "95%",
    height: "97%",
>>>>>>> M2Ok
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
    fontSize: 25,
    marginRight: 5,
    fontWeight: "bold",
    color: "black",
<<<<<<< HEAD
=======
    margin: 5,
    borderColor: "yellow",
>>>>>>> M2Ok
  },
  image: {
    marginTop: 15,
    width: "95%",
    height: "45%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "yellow",
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
