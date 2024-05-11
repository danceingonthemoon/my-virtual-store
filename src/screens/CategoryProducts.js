import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { ActivityIndicator } from "react-native";
export const CategoryProducts = ({ route }) => {
  const { category } = route?.params;
  const newCategory = category.replace(/\b\w+\b/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        // console.log(res.status);
        // handle error
        if (res.status !== 200) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        const productsImages = data.map((product) => ({
          ...product,
          imageUrl: product.image,
        }));
        setProducts(productsImages);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching products: ", error.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const Product = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor }}>
      <View style={[styles.products, { backgroundColor: color }]}>
        <View style={styles.product}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.productInfo}>
            <View sstyle={styles.titleWrapper}>
              <Text style={[styles.title, { color }]}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  // functional component to render each product
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "blue" : "white";
    const color = item.id === selectedId ? "blue" : "lightgreen";

    return (
      <Product
        item={item}
        onPress={() => handleProductPress(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{newCategory}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        //one way to show it
        /* <View style={styles.products}>
        {products.length > 0 ? (
          products.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.product}
              onPress={() => handleProductPress(product)}
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={{ width: 120, height: 100 }}
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 5,
                  }}
                >
                  {product.title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "green",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  ${product.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View> */
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(product) => product.id}
        />
      )}
      <View style={styles.buttonBox}>
        <View style={styles.iconBox}>
          <Icon name="close" size={12} />
        </View>
        <TouchableOpacity title="Back" onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: 20,
    backgroundColor: "lightgreen",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    height: 50,
    backgroundColor: "purple",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    color: "white",
    borderRadius: 5,
  },
  products: {
    flex: 1,
    height: 100,
    width: "100%",
    // padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 10,
    alignItems: "center",
  },
  product: {
    alignItems: "center",
    // margingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 15,
    borderColor: "blue",
    borderWidth: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
  },
  price: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    padding: 10,
    marginTop: 5,
  },
  productInfo: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal: 10,
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
    width: "24%",
    height: "6%",
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
});
