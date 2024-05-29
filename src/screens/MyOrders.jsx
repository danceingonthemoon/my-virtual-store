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
import {
  updateOrderStatus,
  togglePaid,
  toggleDelivered,
} from "../stores/orderSlice";

export const MyOrders = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.orderData);
  // console.log("orderData", orderData);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [isExpanded, setIsExpanded] = useState(false);

  // set method used to delete id and add if condition changes

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
  const handlePay = async (orderId) => {
    const order = orderData.find((order) => order.id === orderId);
    if (order) {
      try {
        const response = await dispatch(
          updateOrderStatus({
            orderId: order.id,
            isPaid: 1, // Set isPaid to 1
            isDelivered: order.is_delivered,
          })
        ).unwrap();
        if (response.status === "ok") {
          dispatch(togglePaid(orderId));
        }
        Alert.alert("Success", "Payment status updated.");
      } catch (error) {
        Alert.alert(
          "Error",
          error.message || "Failed to update payment status."
        );
      }
    }
  };

  const handleDeliver = async (orderId) => {
    const order = orderData.find((order) => order.id === orderId);
    if (order) {
      try {
        const response = await dispatch(
          updateOrderStatus({
            orderId: order.id,
            isPaid: order.is_paid,
            isDelivered: 1,
          })
        ).unwrap();
        if (response.status === "OK") {
          dispatch(toggleDelivered(orderId));
        }
        Alert.alert("Success", "Payment status updated.");
      } catch (error) {
        Alert.alert(
          "Error",
          error.message || "Failed to update payment status."
        );
      }
    }
  };

  const renderItem = ({ item }) => {
    const items = JSON.parse(item.order_items);
    const isOrderExpanded = expandedIds.has(item.id);
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
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
            {!!item.is_paid && !item.is_delivered && (
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
          <Text style={styles.heading1}>
            New Orders :
            {orderData.filter((o) => !o.is_paid && !o.is_delivered).length}
            <Icon
              name={isExpanded ? "caret-up" : "caret-down"}
              size={20}
              color="#FF69B4"
              style={styles.iconStyle}
            />
          </Text>
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
          <Text style={styles.heading1}>
            Paid Orders :
            {orderData.filter((o) => o.is_paid && !o.is_delivered).length}
            <Icon
              name={isExpanded ? "caret-up" : "caret-down"}
              size={20}
              color="#FF69B4"
              style={styles.iconStyle}
            />
          </Text>
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
          <Text style={styles.heading1}>
            Delivered Orders :
            {orderData.filter((o) => o.is_paid && o.is_delivered).length}
            <Icon
              name={isExpanded ? "caret-up" : "caret-down"}
              size={20}
              color="#FF69B4"
              style={styles.iconStyle}
            />
          </Text>
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
    width: "100%",
    margin: 10,
  },
  heading: {
    fontSize: 30,
    height: "9%",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "purple",
    width: "99%",
    textAlign: "center",
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  heading1: {
    margin: 5,
    fontSize: 26,
    fontWeight: "bold",
    color: "blue",
    justifyContent: "space-evenly",
    textAlign: "center",
    backgroundColor: "lightgreen",
    // marginHorizontal: 10,
    paddingHorizontal: 10,
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
    width: "100%",
    flexGrow: 1,
    padding: 5,
  },
  product: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    marginVertical: 5,
    // paddingHorizontal: 5,
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
  iconStyle: {
    marginRight: 10,
  },
});