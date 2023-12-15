import React from "react";
import { View,SafeAreaView } from "react-native";
import Header from "./Components/Header";
import { Slot } from "expo-router";


export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Slot />
    </SafeAreaView>
  );
}
