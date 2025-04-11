import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LOGIN from "./ASM/Login";
import Signup from "./ASM/Signup";
import Home from "./ASM/Home";
import Search from "./ASM/Search";
import Notifications from "./ASM/Notifications";  
import Account from "./ASM/Account";  
import ProductDetailScreen from "./ASM/ProductDetail"; 
import CartScreen from "./ASM/Cart"; 
import TabBar from "./ASM/ASM-components/TabBar";
import Header from "./ASM/ASM-components/Header";
import CheckOut from "./ASM/CheckOut"; // Import Checkout component
import ProductList from "./ASM/ProductList"; // Import ProductList component

//

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator initialRouteName="LOGIN" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LOGIN" component={LOGIN} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Notifications" component={Notifications} /> 
      <Stack.Screen name="Account" component={Account} />  
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen}/>
      <Stack.Screen name="Header" component={Header} />
      <Stack.Screen name="CheckOut" component={CheckOut} /> 
      <Stack.Screen name="ProductList" component={ProductList} /> 

    </Stack.Navigator>
  );
}
