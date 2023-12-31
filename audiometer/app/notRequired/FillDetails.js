import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { baseurl } from "../Constants/ip.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

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

const FillDetails = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [classroomCode, setClassroomCode] = useState("");
  const [assignmentCode, setAssignmentCode] = useState("");

  const verifyAID = async () => {
    if (assignmentCode !== "") {
      const url = `${baseurl}/assignments/${assignmentCode}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          //console.log(response)
          const data = await response.json();
          //console.log(data);
          setClassroomCode(data.CID);
        } else {
          console.error("Failed to fetch Assignment:", response.status);
        }
      } catch (error) {
        console.error("Error fetching Assignment:", error);
      }
    } else {
      alert("Assignment Code cannot be empty");
    }

    router.push({
      pathname: '/Screens/BeforeTest1',
      params: { AID: assignmentCode, CID : classroomCode },
    });
    //router.push("/Screens/BeforeTest1");
  };
  const handleNameChange = (inputText) => {
    setName(inputText);
  };
  const handleAgeChange = (inputText) => {
    setAge(inputText);
  };
  const handleRollNumberChange = (inputText) => {
    setRollNumber(inputText);
  };
  const handleClassroomCodeChange = (inputText) => {
    setAssignmentCode(inputText);
  };
  const { t, i18n } = useTranslation();

  const handleStartTest = () => {
    //TODO: IF student store the details
  };

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        <Text style={styles.title2}>{t("For Students(only)")}</Text>
        <Text style={styles.title}>{t("Fill Your Details")}</Text>
        <Image
          style={styles.image}
          source={require("../assets/images/student_test.jpeg")}
          resizeMode="cover"
        />

        <TextInput
          label={t("Student Roll Number")}
          value={rollNumber}
          onChangeText={handleRollNumberChange}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label={t("Assignment Code")}
          value={assignmentCode}
          onChangeText={handleClassroomCodeChange}
          style={styles.input}
          mode="outlined"
        />

        <Button
          style={styles.Button}
          mode="contained"
          onPress={() => verifyAID()}
        >
          <Text style={styles.buttonText}>{t("Start Test")}</Text>
        </Button>
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 10,
  },
  educatorText: {
    fontSize: 14,
    color: "#2B3467",
    marginBottom: 12,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    // color: 'black',
    // marginBottom: 20,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  title2: {
    fontSize: 14,
    // color: 'black',
    // marginBottom: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
  subtitle: {
    // fontSize: 15,
    // color: 'white',
    // marginBottom: 10,
    // textAlign: 'left',
  },
  Button: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // borderRadius: 20,
    paddingVertical: 20,
    // width: "100%",
    // borderColor: 'white',
    // borderWidth: 1,
    // elevation: 5
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma
  Button1: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // marginTop: 20,
    // borderRadius: 20,
    // paddingVertical: 15,
    // width: "100%",
    // borderColor: 'white',
    // borderWidth: 1,
    // elevation: 5
  },
  input: {
    // height: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    marginBottom: 20,
    // paddingHorizontal: 10,
    // width: '100%',
    // color: 'white',
    // fontStyle: 'normal',
  },

  gif: {
    // width: '100%',
    // height: 200, // Adjust the height as needed
    // marginBottom: 20,
  },

  signUpCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 15,
  },
});
export default FillDetails;
