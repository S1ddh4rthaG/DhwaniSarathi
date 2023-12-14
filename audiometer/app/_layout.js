import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import Header from "./Components/Header";
import { useTranslation } from "react-i18next";
export default function Layout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="Screens/Login"
        options={{
          headerTitle: () => <Header name={t("Login")} />,
          headerTitleAlign: "Signin",
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#0096FF",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 2,
            borderColor: "white",
          },
        }}
      />
    </Stack>
  );
}
