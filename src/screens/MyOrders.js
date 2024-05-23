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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import { fetchOrders, togglePaid, toggleDelivered } from "../stores/orderSlice";

export const MyOrders = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.orderData);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (id) => {
    const newSet = new Set(expandedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedIds(newSet);
  };

  // Toggle the expansion of the orders list
  const toggleHeaderExpand = () => {
    setIsExpanded(!isExpanded);
  };
  // Function to toggle the paid status
  const handlePay = (orderId) => {
    dispatch(togglePaid(orderId));
    const order = orderData.find((o) => o.id === orderId);
    console.log(
      `Order ID: ${orderId} current payment status: ${
        order.is_paid ? "Paid" : "Not Paid"
      }`
    );
  };
  const handleDeliver = (orderId) => {
    dispatch(toggleDelivered(orderId));
    console.log("orderId", orderId);
  };

  const renderItem = ({ item }) => {
    const items = JSON.parse(item.order_items);
    const isOrderExpanded = expandedIds.has(item.id);

    // console.log(
    //   "Render item:",
    //   item.id,
    //   "Paid:",
    //   item.is_paid,
    //   "Delivered:",
    //   item.is_delivered
    // );

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.orderHeader}
          onPress={() => toggleExpand(item.id)}
        >
          <Text style={styles.orderHeaderText}>
            Order ID: {item.id} - Items: {item.item_numbers} - Total: $
            {(item.total_price / 100).toFixed(2)}
          </Text>
          <Icon
            name={isOrderExpanded ? "caret-up" : "caret-down"}
            size={20}
            color="#FF69B4"
          />
        </TouchableOpacity>
        {isOrderExpanded && (
          <>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.productInfo}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, idx) => idx.toString()}
            />
            {!item.is_paid && !item.is_delivered && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePay(item.id)} // Button to trigger payment
              >
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            )}
            {item.is_paid && !item.is_delivered && (
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handleDeliver(item.id)} // Button to trigger payment
              >
                <Text style={styles.payButtonText}>Receive Now</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Orders</Text>
      <View style={styles.products}>
        <TouchableOpacity style={styles.heading} onPress={toggleHeaderExpand}>
          <Text style={styles.heading}>
            New Orders :
            {orderData.filter((o) => !o.is_paid && !o.is_delivered).length}
          </Text>
          <Icon
            name={isExpanded ? "caret-up" : "caret-down"}
            size={20}
            color="#FF69B4"
          />
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={orderData.filter((o) => !o.is_paid)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            // contentContainerStyle={styles.product}
          />
        )}
        <TouchableOpacity style={styles.heading} onPress={toggleHeaderExpand}>
          <Text style={styles.heading}>
            Paid Orders :
            {orderData.filter((o) => o.is_paid && !o.is_delivered).length}
          </Text>
          <Icon
            name={isExpanded ? "caret-up" : "caret-down"}
            size={20}
            color="#FF69B4"
          />
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={orderData.filter((o) => o.is_paid && !o.is_delivered)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            // contentContainerStyle={styles.product}
          />
        )}
        <TouchableOpacity style={styles.heading} onPress={toggleHeaderExpand}>
          <Text style={styles.heading}>
            Delivered Orders :
            {orderData.filter((o) => o.is_paid && o.is_delivered).length}
          </Text>
          <Icon
            name={isExpanded ? "caret-up" : "caret-down"}
            size={20}
            color="#FF69B4"
          />
        </TouchableOpacity>
        {isExpanded && (
          <FlatList
            data={orderData.filter((o) => o.is_paid && o.is_delivered)}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            // contentContainerStyle={styles.product}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    height: "99%",
    borderRadius: 10,

    padding: 10,
    width: "99%",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "lightgreen",
    width: "99%",
    textAlign: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  orderHeader: {
    width: "99%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightyellow",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  orderContainer: {
    justifyContent: "space-evenly",
    padding: 5,
    // margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: "99%",
    backgroundColor: "blue",
  },
  orderHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  products: {
    marginTop: 5,
    width: "98%",
    flexGrow: 1,
    padding: 5,
  },
  product: {
    width: "98%",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
    // margin: 3,
    borderColor: "yellow",
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  payButton: {
    padding: 10,
    width: "40%",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
