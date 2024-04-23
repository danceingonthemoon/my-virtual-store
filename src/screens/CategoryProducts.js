import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export const CategoryProducts = ({ route }) => {
  const { category } = route?.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        console.log(res.status);
        // handle error
        if (res.status !== 200) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
        // console.log(data);
        const productsImages = data.map((product) => ({
          ...product,
          imageUrl: product.image,
        }));
        setProducts(productsImages);
      } catch (error) {
        console.log("Error fetching products: ", error.message);
      }
    };
    fetchProducts();
  }, [category]);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const Product = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: "lightgrey" }}
    >
      <View style={styles.products}>
        <View style={styles.product}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.productInfo}>
            <View sstyle={styles.titleWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  // functional component to render each product
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "blue" : "#f9c2ff";
    const color = item.id === selectedId ? "green" : "black";

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
      <Text style={styles.heading}>{category}</Text>

      {
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
      }
      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(product) => product.id}
          extraData={selectedId}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.buttonBox}>
        <View style={styles.iconBox}>
          <Icon name="close" size={14} />
        </View>
        <TouchableOpacity title="Back" onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 25,
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
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    width: "98%",
    height: 50,
    backgroundColor: "orange",
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
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    alignItems: "center",
  },
  product: {
    alignItems: "center",
    margingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    // backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 15,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
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
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrapper: {
    alignItems: "flex-end",
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
  iconBox: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    margin: 7,
    backgroundColor: "lightgreen",
  },
});
