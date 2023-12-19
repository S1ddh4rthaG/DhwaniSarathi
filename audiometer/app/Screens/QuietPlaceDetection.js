import React, { useState, useEffect } from "react";
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
// import './locales/i18n';
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Button,
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  ProgressBar,
} from "react-native-paper";

import { Audio } from "expo-av";
import { router } from "expo-router";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EB455F",
    accent: "#f1c40f",
  },
};

const QuietPlaceDetection = () => {
  const { t, i18n } = useTranslation();
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [barWidth, setBarWidth] = useState(60);
  const params = useLocalSearchParams();
  console.log(params);
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access audio denied");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);

      recordingObject.setProgressUpdateInterval(500); // Set update interval for metering

      recordingObject.setOnRecordingStatusUpdate((status) => {
        setDecibels(status.metering);

        // Change color based on decibel level (you can customize these thresholds)
        if (status.metering > 80) {
          setBarColor("red");
        } else if (status.metering > 60) {
          setBarColor("yellow");
        } else {
          setBarColor("#0096FF"); // Default color
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        setBarWidth(60);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWidth = (num) => {
    if (num < 0) {
      return num + 30;
    }
    return num;
  };

  const calculateRGB = (decibels) => {
    // Use decibel values to calculate RGB components
    const red = Math.min(255, Math.round(200 - 1 * decibels));
    const green = Math.min(255, Math.round(40 - 1 * decibels));
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const [barColor, setBarColor] = useState("#0096FF"); // Initial color

  return (
    <PaperProvider theme={theme}>
      <ProgressBar
        progress={0.25}
        color={"#2B3467"}
        style={{ margin: 15, marginTop: 50 }}
      />
      <View style={{ flex: 1, justifyContent: "top", padding: 32 }}>
        <Text
          style={{
            fontSize: 24,
            alignSelf: "center",
            fontWeight: "bold",
            marginBottom: 40,
            color: "#2B3467",
          }}
        >
          {t("Check Your Surrounding")}
        </Text>
        <Image
          style={{ width: 200, height: 200, alignSelf: "center" }}
          source={require("../assets/images/microphone.png")}
          resizeMode="cover"
        />

        <View
          style={[
            styles.bar,
            { width: 300, height: 90, backgroundColor: calculateRGB(decibels) },
          ]}
        >
          <Text style={styles.barText}>{decibels} dB</Text>
        </View>

        <Button
          mode="contained"
          onPress={isRecording ? stopRecording : startRecording}
          style={{ margin: 5 }}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        <Button
          mode="contained"
          onPress={() =>
            router.push({
              pathname: "/AudiometryTest",
              params: {
                resulttype: params.resulttype,
                AID: params.AID,
                CID: params.CID,
              },
            })
          }
          style={{ margin: 10 }}
        >
          {t("Continue")}
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
    width: 100,
    height: 100,
    alignSelf: "center",
    borderColor: "#0096FF",
    borderWidth: 3,
  },
  bar: {
    backgroundColor: "#0096FF", // Greenish Yellow
    marginTop: 20,
    paddingVertical: 30,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    elevation: 10,
    alignSelf: "center",
    marginBottom: 40,
    borderRadius: 10,
    alignContent: "center",
  },
  barText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
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

export default QuietPlaceDetection;
