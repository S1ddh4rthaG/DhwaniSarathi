import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Audiometry } from "./utils/Audiometry.js";
import { PureTone } from "./utils/PureTone.js";
import { baseurl } from "./Constants/ip.js";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Button,
  Card,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EB455F",
    accent: "#f1c40f",
  },
};

const AudiometryTest = () => {
  const [playState, setPlayState] = useState(0); // 0: stopped, 1: playing, 2: paused
  const [ear, setEar] = useState("left");
  const [conduction, setConduction] = useState("air");
  const [masking, setMasking] = useState(true);
  const [frequency, setFrequency] = useState(1000);
  const [threshold, setThreshold] = useState(0);
  const [audiometry, setAudiometry] = useState(new Audiometry());
  const [isTestOver, setIsTestOver] = useState(false);

  const { t, i18n } = useTranslation();

  const typeBasedPost = async (url, data, resulttype) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
        console.log(`${resulttype} Results Posted`);
      } else {
        console.error(`Failed to post ${resulttype} Results:`, response.status);
      }
    } catch (error) {
      console.error(`Error posting ${resulttype} Results:`, error);
    }
  };
  
  // Update state values with view getters
  const updateState = () => {
    setEar(audiometry.getEar());
    setConduction(audiometry.getConduction());
    setMasking(audiometry.getMask());
    setFrequency(audiometry.getFrequency());
    setThreshold(audiometry.getThreshold());
  };

  const start = () => {
    audiometry.start();
    updateState();
    setPlayState(1);
  };
  const updateResponse = async (response) => {
    const over = audiometry.regResponse(response);
    setIsTestOver(over);
    updateState();
  
    if (over) {
      console.log("hi");
      const resulttype = "userassignmentresults";
      const userAID = "6f85bbb3-1ee1-4159-9d08-ec76acc82b68";
      const userCID = "354598f9-2d73-4272-9cbc-3e27da8ec238";
      const userId = "BNyCI19R1GgqUCSPqqBpKG3uxGD3";
    //  const userId = await AsyncStorage.getItem("userID");

      const userassignmentresults = `${baseurl}/userassignmentresults/`;
      const useronlyresults = `${baseurl}/useronlyresults/`;
  
      if (resulttype === "userassignmentresults") {
        const url = userassignmentresults;
        const data = {
          CID: userCID,
          UID: userId,
          AID: userAID,
          Results: JSON.stringify(getResults()),
        };
        await typeBasedPost(url, data, resulttype);
      } else {
        const url = useronlyresults;
        const data = {
          UID: userId,
          Results: JSON.stringify(getResults()),
        };
        await typeBasedPost(url, data, resulttype);
      }
    } else {
      audiometry.playTone();
    }
  };

  const getResults = () => {
    return audiometry.getResults();
  };
  console.log(JSON.stringify(getResults()));

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        {playState !== 1 && (
          <View>
            <Image
              style={styles.image}
              source={require("./assets/images/atest_icon.jpeg")}
            />
            <Text style={styles.title}>{t("Pure Tone Audiometry Test")}</Text>
            <Button style={styles.Button2} mode="contained" onPress={start}>
              <Text style={styles.buttonText}>{t("Start Test")}</Text>
            </Button>
          </View>
        )}

        {isTestOver && (
          <Button style={styles.Button2} mode="contained" onPress={() => {}}>
            Results
            <Text>{JSON.stringify(getResults())}</Text>
          </Button>
        )}

        {!isTestOver && playState === 1 && (
          <View>
            <View>
              <Text style={styles.titleTest}>
                {t("Can you hear the sound?")}
              </Text>
              <Text style={styles.titleEar}>
                {t(ear === "left" ? "Left Ear" : "Right Ear")}
              </Text>
              {ear === "left" && (
                <Image
                  style={styles.image}
                  source={require("./assets/images/left_ear.png")}
                />
              )}
              {ear === "right" && (
                <Image
                  style={styles.image}
                  source={require("./assets/images/right_ear.png")}
                />
              )}
              <View style={styles.buttonContainer2}>
                <Button
                  style={styles.ButtonFT}
                  mode="contained"
                  theme={{ colors: { primary: "#2B3467" } }}
                >
                  <Text style={styles.buttonTextFT}>{frequency + "Hz"}</Text>
                </Button>
                <Button
                  style={styles.ButtonFT}
                  mode="contained"
                  theme={{ colors: { primary: "#2B3467" } }}
                >
                  <Text style={styles.buttonTextFT}>{threshold + " dB"}</Text>
                </Button>
                <Button
                  style={styles.ButtonFT}
                  mode="contained"
                  theme={{ colors: { primary: "#2B3467" } }}
                >
                  <Text style={styles.buttonTextFT}>
                    {masking ? "MSK" : "UNMSK"}
                  </Text>
                </Button>
              </View>
            </View>

            <Button
              style={styles.Button}
              mode="contained"
              icon={"play-circle"}
              onPress={() => audiometry.playTone()}
            >
              {t("replay?")}
            </Button>
            <View style={styles.buttonContainer}>
              <Button
                style={styles.ButtonYes}
                mode="contained"
                theme={{ colors: { primary: "green" } }}
                onPress={() => updateResponse(true)}
              >
                <Text style={styles.buttonText}>{t("Yes")}</Text>
              </Button>
              <Button
                style={styles.ButtonNo}
                mode="contained"
                theme={{ colors: { primary: "red" } }}
                onPress={() => updateResponse(false)}
              >
                <Text style={styles.buttonText}>{t("No")}</Text>
              </Button>
            </View>
          </View>
        )}
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
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
  image: {
    width: 300,
    height: 300,
    alignContent: "center",
    alignSelf: "center",
    marginBottom: 40,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 10,
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
    marginBottom: 5,
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
  },
  Button: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 1,
    marginTop: 20,
    width: "40%",
  },
  ButtonYes: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    width: "45%",
    color: "green",
  },
  ButtonFT: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 1,
    width: "32%",
    borderRadius: 50,
  },
  buttonTextFT: {
    fontSize: 15,
  },
  ButtonNo: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    width: "45%",
    color: "red",
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

export default AudiometryTest;
