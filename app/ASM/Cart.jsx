import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Nav from "../ASM/ASM-components/nav";
import { Feather } from "@expo/vector-icons";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          setCartItems(parsedCart);
          calculateTotal(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart", error);
      }
    };
    loadCart();
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => {
      if (item.selected) {
        return acc + item.price * item.quantity;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  };
  

  const toggleSelect = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedItems);
    AsyncStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const changeQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    AsyncStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    AsyncStorage.setItem("cart", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeSelectedItems = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      Alert.alert("Thông báo", "Bạn chưa chọn sản phẩm nào để xóa.");
      return;
    }

    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa các sản phẩm đã chọn?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            const remainingItems = cartItems.filter((item) => !item.selected);
            setCartItems(remainingItems);
            AsyncStorage.setItem("cart", JSON.stringify(remainingItems));
            calculateTotal(remainingItems);
          },
        },
      ]
    );
  };

  const handleCheckout = async () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    await AsyncStorage.setItem(
      "checkoutItems",
      JSON.stringify({ selectedItems, totalPrice })
    );
    router.push("./CheckOut");
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => toggleSelect(item.id)}
        style={styles.checkbox}
      >
        {item.selected && <Text style={styles.checkboxText}>✔</Text>}
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString()}đ
        </Text>
        <Text>Quantity:</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              changeQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            style={styles.quantityButton}
          >
            <Text style={{padding: 5}}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => changeQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={{padding: 5}}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => removeItem(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Nav
        title="GIỎ HÀNG"
        showCart={false}
        onRightPress={removeSelectedItems}
        rightIcon={<Feather name="trash" size={24} color="black" />}
      />

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>
          Tạm tính: {totalPrice.toLocaleString()}đ
        </Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  listContent: { paddingBottom: 150 },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  checkbox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 15,
  },
  checkboxText: { fontSize: 20, color: "#000" },
  productImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 16, color: "green" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: { fontSize: 16 },
  removeButton: { marginTop: 10 },
  removeButtonText: { color: "red" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "green" },
  checkoutButton: {
    backgroundColor: "#A7ECA7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export default CartScreen;
