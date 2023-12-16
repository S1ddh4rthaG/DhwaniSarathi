// Signup.js
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput, Text, Card } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { baseurl } from "../Constants/ip.js";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useTranslation } from "react-i18next";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { router } from "expo-router";
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};
const Signup = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [age, setAge] = useState(40);
  const [gender, setGender] = useState("male");
  const [educatorName, setEducatorName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        var payload = {
          FID: response.user.uid,
          Type: userType === "User" ? 0 : 1,
        };

        if (userType === "User") {
          if (name == "") {
            alert("Please enter your name");
            return;
          }
          payload["UserName"] = name;
          payload["Age"] = age;
          payload["Gender"] = gender;
        } else {
          if (educatorName == "") {
            alert("Please enter your name");
            return;
          }

          if (instituteName == "") {
            alert("Please enter your institute name");
            return;
          }
          payload["EducatorName"] = educatorName;
          payload["InstituteName"] = instituteName;
        }



        let url = baseurl + "/logininfos/";

        const createUserDB = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

      }


      alert("User created successfully");

      router.push("/Screens/Login");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/signup.png')} resizeMode='cover' />
        <TextInput
          label={t("Name")}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Email")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Age")}
          value={String(age)}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Password")}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Confirm Password")}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
          style={styles.input}
          mode="outlined"
        />
        <Picker
          selectedValue={userType}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item style={styles.pickerItem} label={t("Male")} value="Male" />
          <Picker.Item label={t("Female")} value="Female" />
        </Picker>
        <Button style={styles.Button} mode="contained" onPress={handleSignup}>
          <Text style={styles.buttonText}>{t("Sign Up")}</Text>
        </Button>
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 32,
    paddingTop: 0,
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  sliderContainer: {
    // width: '80%',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 50,
  },
  sliderLabel: {
    // fontSize: 15,
    // color: 'white',
  },
  sliderLabel1: {
    // fontSize: 15,
    // color: 'red',
  },
  slider: {
    // flex: 1,
    // width: '100%',
  },
  image: {
    width: 250,
    height: 250,
    alignContent: 'center',
    alignSelf: 'center',
  },
  title: {
    // fontSize: 24,
    // color: 'black',
    // marginBottom: 20,
    // textAlign: 'center',
    // fontWeight: 'bold',
    // marginTop: 20,
  },
  title2: {
    // fontSize: 18,
    // color: 'black',
    // marginBottom: 5,
    // textAlign: 'left',
    // fontWeight: 'bold'
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderColor: 'black',
  },
  pickerItem: {
    // color: 'black', 
    // backgroundColor: 'white'

  },
  subtitle: {
    // fontSize: 15,
    // color: 'white',
    // marginBottom: 10,
    // textAlign: 'left',
  },
  Button: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // marginTop: 'auto', // Push the button to the bottom
    // borderRadius: 10,
    // paddingVertical: 15,
    // width: '100%',
    // borderColor: 'white',
    // borderWidth: 1,
  },
  educatorContainer: {
    // marginTop: 20,
    // alignItems: 'center',
  },
  educatorText: {
    // color: 'white',
    // marginBottom: 10,
  },
  educatorButton: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },

  input: {
    // height: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    // marginBottom: 10,
    // paddingHorizontal: 10,
    // width: '100%',
    // color: 'white',
    // fontStyle: 'normal',
    marginBottom: 15,
  },
});

export default Signup;