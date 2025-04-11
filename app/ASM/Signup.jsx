import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  StyleSheet, Dimensions, Alert, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import PropTypes from "prop-types";
import AxiosInstance from "../ASM/Axios/AxiosInstance";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

const { width, height } = Dimensions.get("window");

const Signup = ({ onSignup, onGoogleSignup, onFacebookSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }
    setIsLoading(true);
    try {
      const response = await AxiosInstance().post("api/v1/user/register", {
        name, email, phone, password,
      });
      Alert.alert("Thành công", response.data.message, [
        { text: "OK", onPress: () => router.push('/ASM/Login') },
      ]);
      if (onSignup) onSignup();
    } catch (error) {
      console.log("Lỗi đăng ký:", error);
      if (error.response) {
        // Lỗi từ server (có phản hồi từ API)
        console.log("Phản hồi lỗi từ server:", error.response.data);
        Alert.alert("Lỗi", error.response.data?.message || "Đăng ký thất bại");
      } else if (error.request) {
        // Lỗi do request được gửi đi nhưng không có phản hồi
        console.log("Không nhận được phản hồi từ server:", error.request);
        Alert.alert("Lỗi", "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
      } else {
        // Lỗi không xác định
        console.log("Lỗi không xác định:", error.message);
        Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Image source={require("../ASM/image/anh2.png")} style={styles.image} />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Đăng ký</Text>
          <Text style={styles.subtitle}>Tạo tài khoản</Text>

          <TextInput style={styles.input} placeholder="Họ tên" value={name} onChangeText={setName} editable={!isLoading} />
          <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" editable={!isLoading} />
          <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" value={phone} onChangeText={setPhone} editable={!isLoading} />
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} editable={!isLoading} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
              <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleSignup} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? "Đang xử lý..." : "Đăng ký"}</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Hoặc</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={onGoogleSignup} disabled={isLoading}>
              <Image source={require("../ASM/image/gg.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onFacebookSignup} disabled={isLoading}>
              <Image source={require("../ASM/image/logos_facebook.png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/ASM/Login')} disabled={isLoading}>
            <Text style={styles.loginText}>Tôi đã có tài khoản - Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  headerContainer: { width: "100%", height: height * 0.30 },
  image: { width: width, height: height * 0.30, borderBottomLeftRadius: 60, borderBottomRightRadius: 200 },
  card: { marginHorizontal: 20, padding: 20, alignItems: "center", width: "90%", alignSelf: "center" },
  title: { fontSize: 50, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 25, marginBottom: 20, color: "gray" },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 10, marginBottom: 15 },
  inputContainer: { flexDirection: "row", alignItems: "center", width: "100%" },
  button: { backgroundColor: "#27AE60", paddingVertical: 15, borderRadius: 10, alignItems: "center", width: "100%" },
  buttonDisabled: { backgroundColor: "#cccccc" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  orText: { marginVertical: 10, color: "gray" },
  socialContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  socialIcon: { width: 50, height: 50, marginHorizontal: 15 },
  loginText: { color: "#27AE60", fontWeight: "bold", marginTop: 15 },
});

export default Signup;