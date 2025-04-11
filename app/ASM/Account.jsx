import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Nav from "../ASM/ASM-components/nav"; // Giả sử bạn đã có sẵn Nav
import TabBar from "../ASM/ASM-components/TabBar";
import { usePathname } from "expo-router";

const AccountScreen = () => {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userInfo");
    Alert.alert("Đăng xuất", "Bạn đã đăng xuất thành công.");
  };

  return (
    <View style={{ flex: 1 }}>
      <Nav title="Profile" showBack={false} showCart={false} showDelete={false} />
      <ScrollView contentContainerStyle={styles.container}>
        {user && (
          <>
            <View style={styles.profileSection}>
              <Ionicons name="person-circle-outline" size={64} color="black" />
              <View style={styles.info}>
                <Text style={styles.name}>{user.name}</Text>
                <Text>{user.email}</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Chung</Text>
              <Text style={styles.item}>Chỉnh sửa thông tin</Text>
              <Text style={styles.item}>Cẩm nang trồng cây</Text>
              <Text style={styles.item}>Lịch sử giao dịch</Text>
              <Text style={styles.item}>Q & A</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bảo mật và Điều khoản</Text>
              <Text style={styles.item}>Điều khoản và điều kiện</Text>
              <Text style={styles.item}>Chính sách quyền riêng tư</Text>
            </View>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logout}>Đăng xuất</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <TabBar activeTab={pathname} setActiveTab={() => {}} />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    paddingVertical: 8,
  },
  logout: {
    color: "red",
    fontSize: 16,
    marginTop: 30,
  },
});
