import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, FlatList, TouchableOpacity, 
  StyleSheet, Image 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; 
import TabBar from "../ASM/ASM-components/TabBar";
import Nav from "../ASM/ASM-components/nav";
import AxiosInstance from "./Axios/AxiosInstance"; // Import your AxiosInstance

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeTab, setActiveTab] = useState("search");
  const [products, setProducts] = useState([]); // State to store fetched products

  // Load search history from AsyncStorage
  useEffect(() => {
    const loadSearchHistory = async () => {
      const history = await AsyncStorage.getItem("searchHistory");
      if (history) {
        setRecentSearches(JSON.parse(history));
      }
    };
    loadSearchHistory();
  }, []);

  const fetchProductsByName = async (name) => {
    try {
      const token = ''; 
      const response = await AxiosInstance(token).get('api/v1/product/getAccessoryProduct', {
        params: { name: name } 
      });
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (searchText.trim() === "") return;

    // Update search history
    const updatedSearches = [searchText, ...recentSearches].slice(0, 5);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedSearches));

    // Fetch products by name
    fetchProductsByName(searchText);

    // Clear search input
    setSearchText("");
  };

  // Remove an item from search history
  const removeSearchItem = async (item) => {
    const updatedSearches = recentSearches.filter(search => search !== item);
    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedSearches));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Nav title="TÌM KIẾM" showCart={false} />
      
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image style={styles.productImage} source={{ uri: item.images[0] }} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} VND</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Recent Searches */}
      <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.searchItem}>
            <Ionicons name="time-outline" size={18} color="gray" />
            <Text style={styles.searchText}>{item}</Text>
            <TouchableOpacity onPress={() => removeSearchItem(item)}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Tab Navigation */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: { flex: 1, height: 40 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  productItem: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
  productImage: { width: 60, height: 60, marginRight: 10 },
  productInfo: { flex: 1 },
  productName: { fontWeight: "bold" },
  productPrice: { color: "gray" },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  searchText: { flex: 1, marginLeft: 10 },
});

export default SearchScreen;
