import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Nav = ({ title = "", showCart = true, rightIcon = null, onRightPress = null }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <Text style={styles.title}>{title}</Text>

      {/* Bên phải: thùng rác hoặc giỏ hàng */}
      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.button}>
          {rightIcon}
        </TouchableOpacity>
      ) : showCart ? (
        <TouchableOpacity onPress={() => router.push("./Cart")} style={styles.button}>
          <Feather name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  button: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  placeholder: {
    width: 44,
  },
});

export default Nav;
