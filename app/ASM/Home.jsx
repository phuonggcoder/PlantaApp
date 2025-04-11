import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router"; // Thêm hook useRouter
import AxiosInstance from "../ASM/Axios/AxiosInstance";

import Header from "../ASM/ASM-components/Header";
import CategorySection from "../ASM/ASM-components/CategorySection";
import TabBar from "../ASM/ASM-components/TabBar";

const HomeScreen = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();  // Khai báo useRouter

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AxiosInstance().get("/api/v1/product/getCropProducts");
        if (response.success) {
          const categorizedProducts = {};
          response.data.forEach((product) => {
            const categoryName = product.category.name;
            if (!categorizedProducts[categoryName]) {
              categorizedProducts[categoryName] = [];
            }
            categorizedProducts[categoryName].push({
              id: product.id,
              name: product.name,
              price: `${product.price.toLocaleString()}đ`,
              image: { uri: product.images[0] },
            });
          });

          setProducts(categorizedProducts);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00C853" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Header />}
        data={Object.keys(products)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategorySection
            title={item}
            items={products[item]}
            onItemPress={(productId) => router.push(`/ASM/ProductDetail?id=${productId}`)}

            />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default HomeScreen;
