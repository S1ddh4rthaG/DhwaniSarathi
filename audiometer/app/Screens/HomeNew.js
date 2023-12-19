import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  HStack,
  MaterialIcons,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { baseurl } from "../Constants/ip.js";
// import {AppBar} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
// import './locales/i18n';
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import {
  Button,
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
  Tooltip,
  Card,
  TextInput,
} from "react-native-paper";
// Use icons
import Icon from "react-native-vector-icons/FontAwesome";
import UDCard from "./UDCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Draggable from "react-native-draggable";
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

const Home = () => {
  const { t, i18n } = useTranslation();


  const [assignmentCode, setAssignmentCode] = useState("");

  const verifyAID = async (resulttype) => {
    if (assignmentCode !== "") {
      const url = `${baseurl}/assignments/${assignmentCode}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.CID);

        router.push({
          pathname: "/Screens/BeforeTest1",
          params: {
            resulttype: resulttype,
            AID: assignmentCode,
            CID: data.CID,
          },
        });
      } catch (error) {
        console.error("Error fetching Assignment:", error);
      }

      
    } else {
      alert("Assignment Code cannot be empty");
    }
  };
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    const getresult = async () => {
      const userId = await AsyncStorage.getItem("userId");
      ///const userId = "00001";
      const url = `${baseurl}/results/${userId}/`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setAssignments(data);
      console.log(data);
    };
    getresult();
  }, []);

  // const dummyData = [
  //   {
  //     id: 1,
  //     selfTest: true,
  //     timestamp: Date.now(),
  //     name: "John Doe",
  //     viewResults: "/Screens/Result1",
  //   },
  //   {
  //     id: 2,
  //     selfTest: false,
  //     timestamp: Date.now(),
  //     name: "Jane Doe",
  //     viewResults: "/Screens/Result2",
  //   },
  //   // Add more dummy data as needed
  // ];

  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-fill",
          padding: 32,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 0,
            margin: 0,
            width: "100%",
          }}
        >
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={styles.bigTitle}>
            <Text style={{ width: "100%" }}>Hi,</Text>
            <Text
              style={{
                width: "100%",
                marginStart: 12,
                paddingTop: 10,
                paddingStart: 10,
                paddingEnd: 10,
              }}
            >
              {" Siddhartha G"}
            </Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
            margin: 5,
          }}
        >
          {/* <Text style={styles.classHeading}>
            Classroom Test
          </Text> */}
          <Card style={{ margin: 20, padding: 10 }}>
            <Text style={styles.classTitle}>
              {t("Enter Classroom Details")}
            </Text>
            <TextInput
              label={t("Enter Room Code")}
              style={styles.classInput}
              value={assignmentCode}
              onChangeText={(text) => setAssignmentCode(text)}
              mode="outlined"
            />
            <Button
              style={styles.classButton}
              mode="contained"
              onPress={() => verifyAID("userassignmentresults")}
            >
              <Text style={styles.classButtonText}>{t("Enter")}</Text>
            </Button>
          </Card>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
            margin: 5,
          }}
        >
          {/* <Text style={styles.classHeading}>
            Self Test
          </Text> */}
          <Button
            style={styles.classButton}
            mode="contained"
            onPress={() => verifyAID("useronlyresults")}
          >
            <Text style={styles.classButtonText}>{t("Self Test!")}</Text>
          </Button>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 1,
            margin: 5,
          }}
        ></View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {assignments &&
              assignments.map((item) => (
                <UDCard
                  key={item.AID}
                  selfTest={item.isSelf}
                  timestamp={item.Timestamp}
                  name={item.ClassroomName || "Self Test"}
                  viewResults={item.Results.info}
                />
              ))}
          </View>
        </ScrollView>
      </View>

      {/* Flex fill */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            margin: 8,
            backgroundColor: "#EB4557",
            width: "96%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
        >
          {/* Button 1 */}
          <View style={{ alignItems: "center" }}>
            <Button
              mode="contained"
              style={styles.bNav}
              onPress={() => router.push("/Screens/BeforeTest1")}
            >
              <Icon name="play" size={18} color="white" style={styles.bIcon} />
            </Button>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Start Test
            </Text>
          </View>

          {/* Button 2 */}
          <View style={{ alignItems: "center" }}>
            <Button mode="contained" style={styles.bNav} onPress={() => {}}>
              {/* Test results */}
              <Icon name="list" size={18} color="white" style={styles.bIcon} />
            </Button>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Results
            </Text>
          </View>

          {/* Button 3 */}
          <View style={{ alignItems: "center" }}>
            <Button mode="contained" style={styles.bNav} onPress={() => {}}>
              {/* Instructions */}
              <Icon name="info" size={18} color="white" style={styles.bIcon} />
            </Button>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Instructions
            </Text>
          </View>

          {/* Button 4 */}
          <View style={{ alignItems: "center" }}>
            <Button
              mode="contained"
              style={styles.bNav}
              onPress={() => {
                router.push("/Screens/LegalComplianceInformation");
              }}
            >
              {/* Legal compliance */}
              <Icon name="legal" size={18} color="white" style={styles.bIcon} />
            </Button>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Legal Rules
            </Text>
          </View>

          {/* Button 5 */}
          <View style={{ alignItems: "center" }}>
            <Button
              mode="contained"
              style={styles.bNav}
              onPress={() => {
                router.push("/Screens/Maps");
              }}
            >
              {/* Doctors near me */}
              <Icon
                name="map-marker"
                size={18}
                color="white"
                style={styles.bIcon}
              />
            </Button>
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Doctors Near Me
            </Text>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  classTitle: {
    padding: 10,
    fontSize: 24,
  },
  classInput: {
    marginHorizontal: 10,
  },
  floatingButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
    backgroundColor: "#B5B6BA",
    borderRadius: 25,
    padding: 15,
    elevation: 5,
  },
  classButton: {
    margin: 15,
  },
  classButtonText: {
    fontSize: 16,
  },
  classHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },
  bigTitle: {
    flex: 1,
    flexDirection: "row",
    fontSize: 24,
    marginTop: 50,
    color: "black",
  },
  bIcon: {
    padding: 0,
    margin: 1,
  },
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
  bNav: {
    padding: 0,
    marginStart: 3,
    marginEnd: 3,
    backgroundColor: "#2B3467",
    justifyContent: "center",
  },
});

export default Home;
