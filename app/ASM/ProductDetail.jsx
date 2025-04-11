import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../ASM/Axios/AxiosInstance";
import Nav from "../ASM/ASM-components/nav";

const ProductDetailScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await AxiosInstance().get(`/api/v1/product/getProductById?id=${id}`);
        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          console.warn("Không tìm thấy sản phẩm với id:", id);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = async () => {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      selected: true,
    };

    try {
      const cartData = await AsyncStorage.getItem("cart");
      let cart = cartData ? JSON.parse(cartData) : [];

      const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push(newItem);
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));

      // ✅ Hiển thị thông báo thành công
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const totalPrice = product ? (product.price * quantity).toLocaleString() + "đ" : "0đ";

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy sản phẩm!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Nav title={product.name} showCart={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.image} />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{product.category?.name}</Text>
          <Text style={styles.type}>{product.size}</Text>
        </View>

        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kích cỡ</Text>
            <Text style={styles.detailValue}>{product.size}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Xuất xứ</Text>
            <Text style={styles.detailValue}>{product.origin}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tình trạng</Text>
            <Text style={styles.detailValue}>Còn hàng</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Mô tả sản phẩm</Text>
          </View>
          <Text style={styles.detailValue}>{product.description}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Hướng dẫn</Text>
          </View>
          <Text style={styles.detailValue}>{product.usage}</Text>
        </View>
      </ScrollView>

      <View style={styles.fixedFooter}>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Đã chọn {quantity} sản phẩm</Text>
          <Text style={styles.quantityPrice}>Tạm tính</Text>
        </View>
        <View style={styles.quantityRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 150 },
  imageContainer: { alignItems: "center", marginVertical: 20 },
  image: { width: 300, height: 300, resizeMode: "contain" },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  category: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    fontSize: 14,
  },
  type: {
    backgroundColor: "#A7ECA7",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  detailLabel: { fontSize: 18, color: "#666" },
  detailValue: { fontSize: 18, color: "#000" },
  fixedFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  quantityLabel: { fontSize: 16, color: "#666" },
  quantityPrice: { fontSize: 16, color: "#666" },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  quantityButtonText: { fontSize: 20, color: "#000" },
  quantityText: { width: 40, textAlign: "center", fontSize: 16 },
  totalPrice: { fontSize: 18, fontWeight: "bold", color: "green" },
  buyButton: {
    backgroundColor: "#007537",
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buyButtonText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { fontSize: 18, color: "red" },
});

export default ProductDetailScreen;
