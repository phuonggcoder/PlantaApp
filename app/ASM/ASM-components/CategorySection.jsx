import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import ProductCard from "../ASM-components/ProductCard";

const CategorySection = ({ title, items, onItemPress }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard
          onPress={() => onItemPress(item.id)} 
          {...item} 
        />
      )}
      columnWrapperStyle={styles.wrapper}
    />
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
      <Text style={styles.text}>Xem thêm {title.toLowerCase()}</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  section: { marginTop: 20, paddingHorizontal: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  wrapper: { justifyContent: "space-between" },
  button: { alignSelf: "center", marginTop: 10, paddingVertical: 10 },
  buttonPressed: { backgroundColor: "#A7ECA7" },
  text: { fontSize: 16, textDecorationLine: "underline" },
});

export default CategorySection;
