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
  Icon,
  ProgressBar,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

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
  const params = useLocalSearchParams();
  console.log(params);
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
      const resulttype = params.resulttype;
      const userAID = params.AID;
      const userCID = params.CID;
      if (resulttype !== "selftest") {
        //const userId = "BNyCI19R1GgqUCSPqqBpKG3uxGD3";
        const userId = await AsyncStorage.getItem("userId");
        console.log(userId);
        const userassignmentresults = `${baseurl}/userassignmentresults/`;
        const useronlyresults = `${baseurl}/useronlyresults/`;

        if (resulttype == "userassignmentresults") {
          const url = userassignmentresults;
          const data = {
            CID: userCID,
            UID: userId,
            AID: userAID,
            Results: getResults(),
          };
          await typeBasedPost(url, data, resulttype);
        } else {
          const url = useronlyresults;
          const data = {
            UID: userId,
            Results: getResults(),
          };
          await typeBasedPost(url, data, resulttype);
        }
      }

      router.push({
        pathname: "/Screens/Results",
        params: { results: JSON.stringify(getResults().info) },
      });
    } else {
      audiometry.playTone();
    }
  };

  const getResults = () => {
    let newResults = {};
    newResults["info"] = audiometry.getResults();
    let pta_left = 0;
    let pta_right = 0;

    let left_count = 0;
    let right_count = 0;

    let left = newResults["info"].filter(
      (item) =>
        item.ear === "left" && item.measurementType === "AIR_UNMASKED_LEFT"
    );
    let right = newResults["info"].filter(
      (item) =>
        item.ear === "right" && item.measurementType === "AIR_UNMASKED_RIGHT"
    );

    left.forEach((item) => {
      if (
        item.frequency == 500 ||
        item.frequency == 1000 ||
        item.frequency == 2000 ||
        item.frequency == 4000
      ) {
        pta_left += item.threshold;
        left_count++;
      }
    });

    right.forEach((item) => {
      if (
        item.frequency == 500 ||
        item.frequency == 1000 ||
        item.frequency == 2000 ||
        item.frequency == 4000
      ) {
        pta_right += item.threshold;
        right_count++;
      }
    });

    pta_left = Math.round(pta_left / left_count);
    pta_right = Math.round(pta_right / right_count);

    newResults["pta_left"] = pta_left;
    newResults["pta_right"] = pta_right;

    return newResults;
  };
  console.log(JSON.stringify(getResults()));

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        {playState !== 1 && (
          <View>
            <Image
              style={styles.imageAudio}
              source={require("./assets/images/atest_icon.jpeg")}
            />
            <Text style={styles.title}>{t("Pure Tone Audiometry Test")}</Text>
            <Button style={styles.Button2} mode="contained" onPress={start}>
              <Text style={styles.buttonText}>{t("Start Test")}</Text>
            </Button>
          </View>
        )}

        {isTestOver && (
          // <Button style={styles.Button2} mode="contained" onPress={() => { }}>
          //   Results
          //   <Text>{JSON.stringify(getResults())}</Text>
          // </Button>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )}

        {!isTestOver && playState === 1 && (
          <View>
            <View>
              <Button
                style={styles.ButtonFTM}
                mode="contained-tonal"
                theme={{ colors: { primary: "#2B3467" } }}
              >
                <Text style={styles.buttonTextFT}>
                  {masking ? "MASKED TEST" : "UNMASKED TEST"}
                </Text>
              </Button>

              <Text style={styles.titleTest}>
                {t("Can you hear the sound?")}
              </Text>
              <Text
                style={{
                  width: "100%",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Progress
              </Text>
              <ProgressBar
                progress={audiometry.Fptr / audiometry.MAX_F}
                style={styles.FBar}
              />
              <Text style={styles.titleEar}>
                {t(ear === "left" ? "Left Ear" : "Right Ear")}
              </Text>
              <View style={{ flexDirection: "column" }}>
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
                <Card
                  style={{ padding: 10, marginVertical: 20, width: "100%" }}
                >
                  <Text
                    style={{
                      width: "100%",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    Threshold
                  </Text>
                  <ProgressBar
                    progress={audiometry.Aptr / audiometry.MAX_A}
                    style={styles.TBar}
                  />
                </Card>
              </View>
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
                  icon={"play-circle"}
                  onPress={() => audiometry.playTone()}
                >
                  {t("Replay")}
                </Button>
                <Button
                  style={styles.ButtonFT}
                  mode="contained"
                  theme={{ colors: { primary: "#2B3467" } }}
                >
                  <Text style={styles.buttonTextFT}>{threshold + " dB"}</Text>
                </Button>
              </View>
            </View>
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
  FBar: {
    margin: 10,
  },
  TBar: {
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
    marginTop: 10,
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
    paddingVertical: 10,
    marginTop: 20,
    width: "41%",
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
    fontSize: 11,
  },
  buttonTextFT: {
    fontSize: 15,
  },
  ButtonNo: {
    // backgroundColor: 'blue', // Greenish Yellow
    // borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    width: "41%",
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
