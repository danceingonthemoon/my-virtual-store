import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const CategoryProducts = ({ route }) => {
  const { category } = route?.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

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
    navigation.navigate("ProductDetails", { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.products}>
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
                      fontSize: 13,
                      fontWeight: "bold",
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                  >
                    {product.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "green",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: 10,
                      marginLeft: 10,
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
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    width: "98%",
    height: 60,
    backgroundColor: "orange",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
  products: {
    flex: 1,
    width: "98%",
    height: "20%",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
  },
  product: {
    width: "69%",
    padding: 12,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 120,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
  },
});
