import React, { useState, useCallback } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Image, 
  StyleSheet, Dimensions, Alert, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { router } from "expo-router";
import AxiosInstance from "../ASM/Axios/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width, height } = Dimensions.get("window");

const Login = ({ onLogin, onForgotPassword, onSignup, onGoogleLogin, onFacebookLogin }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("nguyenvana@example.com");
  const [password, setPassword] = useState("securePassword123");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await AxiosInstance().post("api/v1/user/login", {
        email: username,
        password,
      });
  
      // ✅ Lưu thông tin người dùng vào AsyncStorage
      if (response.success && response.data) {
        await AsyncStorage.setItem("userInfo", JSON.stringify(response.data));
  
        Alert.alert("Thành công", "Đăng nhập thành công!", [
          { text: "OK", onPress: () => router.push("/ASM/Home") },
        ]);
      } else {
        Alert.alert("Lỗi", response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:", error.response?.data || error.message);
  
      if (error.response) {
        const { status, data } = error.response;
  
        if (status === 400) {
          Alert.alert("Lỗi", data?.message || "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin.");
        } else if (status === 401) {
          Alert.alert("Lỗi", "Tài khoản hoặc mật khẩu không chính xác.");
        } else {
          Alert.alert("Lỗi", data?.message || "Đăng nhập thất bại.");
        }
      } else if (error.request) {
        Alert.alert("Lỗi", "Không thể kết nối đến server. Vui lòng thử lại sau.");
      } else {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi xử lý đăng nhập.");
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
          <Image source={require("../ASM/image/anh.png")} style={styles.image} />
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Chào mừng bạn</Text>
          <Text style={styles.subtitle}>Đăng nhập tài khoản</Text>

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="Nhập email hoặc số điện thoại" 
              value={username} 
              onChangeText={setUsername} 
              keyboardType="email-address" 
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isLoading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon} disabled={isLoading}>
              <Icon name={showPassword ? "eye" : "eye-off"} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            <TouchableOpacity style={styles.rememberContainer} onPress={() => setRememberMe(!rememberMe)}>
              <Icon name={rememberMe ? "checkbox-marked" : "checkbox-blank-outline"} size={20} color="green" />
              <Text style={styles.rememberText}>Nhớ tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? "Đang xử lý..." : "Đăng nhập"}</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Hoặc</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={onGoogleLogin} disabled={isLoading}>
              <Image source={require("../ASM/image/gg.png")} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onFacebookLogin} disabled={isLoading}>
              <Image source={require("../ASM/image/logos_facebook.png")} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.rowCenter}>
            <Text>Bạn không có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push("/ASM/Signup")} disabled={isLoading}>
              <Text style={styles.signupText}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    position: "relative"
  },
  image: {
    width: width,
    height: height * 0.48,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 70
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
    borderRadius: 50
  },
  card: {
    marginHorizontal: 20,
    padding: 10,
    marginTop: -20,
    alignItems: "center",
    width: "90%",
    alignSelf: "center"
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 20,
    color: "gray"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height: 50
  },
  input: {
    flex: 1,
    height: 50
  },
  eyeIcon: {
    padding: 10
  },
  button: {
    backgroundColor: "#27AE60",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    width: "100%"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 15
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15
  },
  signupText: {
    color: "#27AE60",
    fontWeight: "bold"
  },
  forgotText: {
    color: "blue",
  },
  orText: {
    marginVertical: 10,
    color: "gray",
  },
});

Login.propTypes = {
  onLogin: PropTypes.func,
  onForgotPassword: PropTypes.func,
  onSignup: PropTypes.func,
  onGoogleLogin: PropTypes.func,
  onFacebookLogin: PropTypes.func,
};

export default Login;
