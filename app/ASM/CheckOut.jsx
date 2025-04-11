import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Nav from "../ASM/ASM-components/nav"; // Không hiển thị icon

const CheckoutScreen = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingMethod, setShippingMethod] = useState("fast");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const loadCheckout = async () => {
      const data = await AsyncStorage.getItem("checkoutItems");
      if (data) {
        const { selectedItems, totalPrice } = JSON.parse(data);
        setSelectedItems(selectedItems);
        setTotalPrice(totalPrice);
      }
    };
    loadCheckout();
  }, []);

  const validateInfo = () => {
    if (!name.trim() || !address.trim() || !phone.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin giao hàng.");
      return false;
    }
    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ.");
      return false;
    }
    return true;
  };

  const handleConfirmOrder = () => {
    if (!validateInfo()) return;

    const shippingFee = shippingMethod === "fast" ? 15000 : 20000;

    const order = {
      customer: { name, email, address, phone },
      items: selectedItems,
      total: totalPrice + shippingFee,
      shippingMethod,
      paymentMethod,
      createdAt: new Date(),
    };

    console.log("Đơn hàng đã tạo:", order);
    Alert.alert("Thành công", "Đặt hàng thành công!");
  };

  const renderShippingOption = (label, value, fee, dateRange) => (
    <TouchableOpacity onPress={() => setShippingMethod(value)} style={styles.radioContainer}>
      <View style={styles.radioTextContainer}>
        <Text style={[styles.radioLabel, shippingMethod === value && styles.selectedText]}>
          {label} - {fee.toLocaleString()}đ
        </Text>
        <Text style={styles.subText}>Dự kiến giao hàng {dateRange}</Text>
      </View>
      {shippingMethod === value && <Text style={styles.checkIcon}>✓</Text>}
    </TouchableOpacity>
  );

  const renderPaymentOption = (label, value) => (
    <TouchableOpacity onPress={() => setPaymentMethod(value)} style={styles.radioContainer}>
      <Text style={[styles.radioLabel, paymentMethod === value && styles.selectedText]}>{label}</Text>
      {paymentMethod === value && <Text style={styles.checkIcon}>✓</Text>}
    </TouchableOpacity>
  );

  const shippingFee = shippingMethod === "fast" ? 15000 : 20000;
  const grandTotal = totalPrice + shippingFee;

  return (
    <View style={styles.container}>
      <Nav title="Thanh toán" showCart={false} showTrash={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Thông tin khách hàng</Text>

          <TextInput placeholder="Họ tên" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Địa chỉ" value={address} onChangeText={setAddress} style={styles.input} />
          <TextInput placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />

          <Text style={styles.header}>Sản phẩm</Text>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={styles.productName}>{item.name} x{item.quantity}</Text>
              <Text style={styles.productPrice}>{(item.price * item.quantity).toLocaleString()}đ</Text>
            </View>
          ))}

          <Text style={styles.header}>Phương thức vận chuyển</Text>
          {renderShippingOption("Giao hàng Nhanh", "fast", 15000, "5-7/9")}
          {renderShippingOption("Giao hàng COD", "cod", 20000, "4-8/9")}

          <Text style={styles.header}>Hình thức thanh toán</Text>
          {renderPaymentOption("Thẻ VISA/MASTERCARD", "card")}
          {renderPaymentOption("Thẻ ATM", "atm")}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.total}>{grandTotal.toLocaleString()}đ</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
            <Text style={styles.buttonText}>TIẾP TỤC</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 150, // Để không bị che bởi footer
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  radioTextContainer: {
    flex: 1,
  },
  radioLabel: {
    fontSize: 16,
  },
  selectedText: {
    color: "green",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 13,
    color: "#888",
  },
  checkIcon: {
    fontSize: 20,
    color: "green",
    marginLeft: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  productName: {
    fontSize: 15,
  },
  productPrice: {
    fontSize: 15,
    color: "#333",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    backgroundColor: "#aaa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
