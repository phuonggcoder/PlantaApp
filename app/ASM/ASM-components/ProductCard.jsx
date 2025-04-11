import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProductCard = ({ name, type, price, image,onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    {type && <Text style={styles.type}>{type}</Text>}
    <Text style={styles.price}>{price}</Text>

    
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  image: { width: 150, height: 150, borderRadius: 10 },
  name: { fontSize: 16, fontWeight: "bold", textAlign: "center", marginTop: 5 },
  type: { fontSize: 14, color: "gray", textAlign: "center" },
  price: { fontSize: 18, fontWeight: "bold", color: "green", textAlign: "center", marginTop: 5 },
});

export default ProductCard;
