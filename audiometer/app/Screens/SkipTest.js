import React, { useState } from "react";
import {
  Box,
  IconButton,
  HStack,
  Icon,
  MaterialIcons,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import {AppBar} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
// import './locales/i18n';
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import {
  Button,
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EB455F",
    accent: "#f1c40f",
  },
};
import { router } from "expo-router";

const SkipTest = () => {
  const { t, i18n } = useTranslation();
  const params = useLocalSearchParams();

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: "top", padding: 32 }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 300, height: 250, alignSelf: "center" }}
        />
        <Text
          style={{
            fontSize: 32,
            alignSelf: "center",
            fontWeight: "bold",
            marginBottom: 40,
            color: "#2B3467",
          }}
        >
          Dhwani Sarathi
        </Text>
        <Button
          mode="contained"
          onPress={() =>
            router.push({
              pathname: "/Screens/BeforeTest1",
              params: {
                resulttype: params.resulttype,
                AID: params.AID,
                CID: params.CID,
              },
            })
          }
          style={{ margin: 10 }}
        >
          {t("Start Full Test")}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/UserTutorial");
          }}
          style={{ margin: 5 }}
        >
          {t("Instructions")}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/LegalComplianceInformation");
          }}
          style={{ margin: 5 }}
        >
          {t("Legal Compliance Information")}
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/Maps");
          }}
          style={{ margin: 5 }}
        >
          {t("Doctors Near Me")}
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/MapData");
          }}
          style={{ margin: 5 }}
        >
          {t("Contribute To Noise Data")}
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/JewelleryDetection");
          }}
          style={{ margin: 5 }}
        >
          Obstacle Detection (β)
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            router.push("/Screens/ML");
          }}
          style={{ margin: 5 }}
        >
          Digitization (β)
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5B6BA",
    padding: 20,
    justifyContent: "center",

    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    borderColor: "#0096FF",
    borderWidth: 3,
  },
  Button: {
    backgroundColor: "#0096FF", // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    elevation: 5,
  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma
  Button1: {
    backgroundColor: "#0096FF", // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  gif: {
    width: "100%",
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
});

export default SkipTest;
