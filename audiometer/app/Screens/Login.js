// Login.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from "react-native";
import { Button, Text, Card, TextInput } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { t, useTranslation } from "react-i18next";
import { baseurl } from "../Constants/ip.js";

import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
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


const Login = () => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username+"@gmail.com",
        password
      );

      if (response) {
        let url = `${baseurl}/logininfos/${response.user.uid}/`;
        const response1 = await fetch(url);

        if (response1.ok) {
          const data = await response1.json();

          responseObject = data;

          await AsyncStorage.setItem("userId", response.user.uid);
          await AsyncStorage.setItem(
            "userType",
            JSON.stringify(responseObject.Type)
          );

          console.log("User data fetched successfully:", responseObject)

          if (responseObject.Type == 1) {
            router.push(
              {
                pathname: "/Screens/Educator/EducatorHome",
                params: { EID:  response.user.uid},
              }
            );
          }
          else {
            router.push(
              {
                pathname: "/Screens/HomeNew",
                params: { UID:  response.user.uid},
              }
            );
          }
        } else {
          Alert.alert('Failed to fetch the data', 'Retry again!');
          console.error("Failed to fetch user data:", response1.status);
        }
      }
    
    } catch (error) {
      Alert.alert('Check your credentials again', 'Retry again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Card style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/login.png')} resizeMode='cover' />
        <TextInput
          label={t("Mobile Number")}
          value={username}
          onChangeText={(text) => setUsername(text)}
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
        <Button style={styles.Button} mode="contained" onPress={signIn}>
          <Text style={styles.buttonText}>{t("Login")}</Text>
        </Button>
        <Button style={styles.Button} mode="contained" onPress={()=> router.push({
          pathname: "/Screens/SkipTest",
          params: {
            resulttype: "selftest",
            AID: "selftest",
            CID: "selftest",
          },
        })}>
          <Text style={styles.buttonText}>{t("Skip To Home")}</Text>
        </Button>
        <Card style={styles.signUpCard}>
          <Text style={styles.educatorText}>
            {t("Don't have an Account? Sign Up here")}
          </Text>
          <Button
            style={styles.Button}
            mode="outlined"
            onPress={() => {
              router.push("/Screens/Signup");
            }}
          >
            {t("Sign up")}
          </Button>
        </Card>
      </Card>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 32,
    justifyContent: 'flex-start',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  educatorText: {
    fontSize: 14,
    color: '#2B3467',
    marginBottom: 12,
  },
  image: {
    width: 300,
    height: 300,
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
    // marginBottom: 20,
    // textAlign: 'left',
    // fontWeight: 'bold'
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
    // paddingVertical: 15,
    // width: "100%",
    // borderColor: 'white',
    // borderWidth: 1,
    // elevation: 5
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
  }
});

export default Login;