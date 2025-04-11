import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Link } from "expo-router"; // Link điều hướng

const Header = () => {
  return (
    <View style={styles.container}>
      {/* ✅ Banner hình ảnh có Link */}
      <Link href="./ProductList" asChild>
        <TouchableOpacity>
        <Image source={require("@/assets/images/banner.png")} style={styles.image} />
        </TouchableOpacity>
      </Link>

      {/* Nội dung giới thiệu */}
      <View style={styles.content}>
        <Text style={styles.title}>Planta - toả sáng không gian nhà bạn</Text>
        <Link href="./ProductList" asChild>
          <TouchableOpacity style={styles.linkContainer}>
            <Text style={styles.link}>Xem hàng mới về</Text>
            <Icon name="arrow-right" size={18} color="green" />
          </TouchableOpacity>
        </Link>
      </View>

      {/* Nút giỏ hàng */}
      <Link href="./Cart" style={styles.cartButton}>
        <View style={styles.cartWrapper}>
          <Icon name="shopping-cart" size={22} color="black" />
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 320,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
  },
  content: {
    position: "absolute",
    left: 10,
    top: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginRight: 5,
  },
  cartButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  cartWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default Header;
