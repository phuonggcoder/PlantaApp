import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AxiosInstance from "../ASM/Axios/AxiosInstance";
import Nav from "../ASM/ASM-components/nav"; // ✅ viết hoa N (component)
import ProductCard from "../ASM/ASM-components/ProductCard";
import { useRouter } from "expo-router"; // ✅ Sử dụng router để điều hướng

const ProductListScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const res = await AxiosInstance().get("api/v1/category/getAll");
      setCategories([{ name: "Tất cả", id: null }, ...res.data]);
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    }
  };

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const url = categoryId
        ? `api/v1/product/getProductsByCategoryId?id=${categoryId}`
        : `api/v1/product/getCropProducts`;

      const res = await AxiosInstance().get(url);
      setProducts(res.data || []);
    } catch (error) {
      console.error("Lỗi lấy sản phẩm:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(null);
  }, []);

  const onCategoryPress = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategoryId === item.id && styles.categoryButtonSelected,
      ]}
      onPress={() => onCategoryPress(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategoryId === item.id && styles.categoryTextSelected,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productWrapper}>
     <ProductCard
        name={item.name}
        type={item.type}
        price={item.price.toLocaleString() + "đ"}
        image={{ uri: item.images[0] }}
        onPress={() => router.push(`./ProductDetail?id=${item.id}`)}
        />

    </View>
  );

  return (
    <View style={styles.container}>
      <Nav title="CÂY TRỒNG" />

      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={renderCategory}
        contentContainerStyle={styles.categoryList}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#27AE60" />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginBottom: 10 },
  categoryList: { paddingHorizontal: 10, marginBottom: 10,  marginTop: 10,},
  categoryButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    borderRadius: 15,
    minHeight: 36,
    justifyContent: "center",
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: "#27AE60",
  },
  categoryText: {
    color: "#333",
    fontSize: 14,
  },
  categoryTextSelected: {
    color: "#fff",
  },
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productWrapper: {
    width: "50%",
    paddingHorizontal: 5,
    marginBottom: 15,
  },
});

export default ProductListScreen;
