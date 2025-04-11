import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
const TabBar = ({ activeTab, setActiveTab }) => {

  const tabs = [
    { key: "/ASM/Home", label: "Trang chủ", icon: "home-outline" },
    { key: "/ASM/Search", label: "Tìm kiếm", icon: "magnify" }, 
    { key: "/ASM/Notifications", label: "Thông báo", icon: "bell-outline" },
    { key: "/ASM/Account", label: "Tài khoản", icon: "account-outline" },
  ];
 
  
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.item}
          onPress={() => {
            setActiveTab(tab.key);
            router.push(tab.key);
          }}
        >
          <IconMaterial name={tab.icon} size={24} color={activeTab === tab.key ? "green" : "black"} />
          <Text style={[styles.text, activeTab === tab.key && styles.activeText]}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: { flexDirection: "row", height: 60, justifyContent: "space-around", alignItems: "center", backgroundColor: "white" },
  item: { alignItems: "center", flex: 1 },
  text: { fontSize: 12, marginTop: 4 },
  activeText: { fontWeight: "bold", color: "green" },
});

export default TabBar;
