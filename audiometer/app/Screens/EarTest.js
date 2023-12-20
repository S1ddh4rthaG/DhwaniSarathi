import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, } from "react-native";
import { router } from "expo-router";
import { Audio } from "expo-av";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  Card,
  Icon,

  ProgressBar,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EB455F",
    accent: "#f1c40f",
  },
};

const EarTest = () => {
  const { t } = useTranslation();
  const [ear, setEar] = useState(Math.random() < 0.5 ? "left" : "right");
  const [player, setPlayer] = useState(new Audio.Sound());

  useEffect(() => {

    if (player) {
      player.unloadAsync();
    }

    if (ear == "left") {
      player.loadAsync(require("../assets/eartest/left.wav")).then(() => {
        player.setVolumeAsync(0.1);
      });
    } else {
      player.loadAsync(require("../assets/eartest/right.wav")).then(() => {
        player.setVolumeAsync(0.1);
      });
    }

  }
    , []);

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        <View>
          <View>
            <Text style={styles.titleTest}>
              {t("Which ear do you hear the sound in?")}
            </Text>

            <View style={{ flexDirection: "column", }}>
              <Image
                style={styles.image}
                source={require("../assets/images/questionmark.jpeg")}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              style={[styles.ButtonNo, { width: "40%", marginBottom: 0 }]}
              mode="contained"
              theme={{ colors: { primary: "red" } }}
              onPress={() => {
                player.stopAsync();
                player.playAsync();
              }}
            >
              <Text style={styles.buttonText}>{t("Play")}</Text>
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.ButtonYes}
              mode="contained"
              theme={{ colors: { primary: "green" } }}
              onPress={() => {
                console.log(ear, "LEFT");

                if (ear == "left") {
                  Alert.alert(t("Correct!"));
                  // write here
                } else {
                  Alert.alert(t("Please switch your headphones!"));
                }
                player.stopAsync();
              }}
            >
              <Text style={styles.buttonText}>{t("Left")}</Text>
            </Button>
            <Button
              style={styles.ButtonNo}
              mode="contained"
              theme={{ colors: { primary: "blue" } }}
              onPress={() => {
                console.log(ear, "RIGHT");
                if (ear == "right") {
                  Alert.alert(t("Correct!"));
                  // write here
                } else {
                  Alert.alert(t("Incorrect Configuration!"));
                }
                player.stopAsync();
              }}
            >
              <Text style={styles.buttonText}>{t("Right")}</Text>
            </Button>
            <Button
              style={styles.ButtonNo}
              mode="contained"
              theme={{ colors: { primary: "grey" } }}
              onPress={() => {
                Alert.alert(t("EQUIPMENT MALFUNCTION!"));
                player.stopAsync();
              }}
            >
              <Text style={styles.buttonText}>{t("None?")}</Text>
            </Button>
          </View>
        </View>
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  FBar: {
    margin: 10,
  },
  TBar: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 2,
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
  },
  sliderContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  sliderLabel: {
    fontSize: 15,
    color: "white",
  },
  sliderLabel1: {
    fontSize: 15,
    color: "red",
  },
  slider: {
    flex: 1,
    width: "100%",
  },
  imageAudio: {
    width: 300,
    height: 300,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 40,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
  },
  image: {
    width: 250,
    height: 250,
    alignContent: "center",
    alignSelf: "center",
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 20,
  },
  image2: {
    width: 300,
    height: 300,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleTest: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  title2: {
    fontSize: 25,
    textAlign: "center",
  },
  titleEar: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "left",
  },
  buttonContainer: {
    // Make all buttons side by side
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer2: {
    // Make all buttons side by side
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  Button: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 1,
    marginTop: 20,
    width: "40%",
  },
  ButtonCircle: {
    borderRadius: 30,
    marginHorizontal: 5,
    marginTop: 20,
    fontSize: 30,
  },
  ButtonYes: {
    paddingVertical: 1,
    marginTop: 20,
    marginHorizontal: 5,
    width: "30%",
    color: "green",
  },
  ButtonFT: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 1,
    width: "32%",
    borderRadius: 50,
  },
  ButtonFTM: {
    borderRadius: 20,
    marginBottom: 15,
    fontSize: 11
  },
  buttonTextFT: {
    fontSize: 15,
  },
  ButtonNo: {
    paddingVertical: 1,
    marginHorizontal: 5,
    marginTop: 20,
    width: "30%",
    color: "green",
  },
  Button2: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
  },

  Button1: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // marginTop: 50,
    // borderRadius: 10,
    // paddingVertical: 20,
    // width: '100%'
  },
  buttonText1: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  educatorContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  educatorText: {
    color: "white",
    marginBottom: 10,
  },
  educatorButton: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 10,
  },
  buttonText: {
    // color: 'white',
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
  },

  input: {
    // height: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    // marginBottom: 20,
    // paddingHorizontal: 10,
    // width: '100%',
    // color: 'white',
    // fontStyle: 'italic'
  },
});

export default EarTest;
