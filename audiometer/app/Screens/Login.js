// Login.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

// import './locales/i18n';
import { t, useTranslation } from "react-i18next";
import {baseurl} from "../Constants/ip.js";

import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";

const Login = ({ navigation }) => {
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
        username,
        password
      );
      if (response) {
        let url = `${baseurl}/login/${response.user.uid}/`;
        const response1 = await fetch(url);

        if (response1.ok) {
          const data = await response1.json();

          responseObject = data;

          await AsyncStorage.setItem(
            "userType",
            JSON.stringify(responseObject.Type)
          );
        } else {
          console.error("Failed to fetch user data:", response1.status);
        }
      }
      navigation.navigate("Signout");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("Login")}</Text>
      <Image style={styles.image} source={require('../assets/login.png')} resizeMode='cover' />
      <TextInput
        placeholder={t("Email")}
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        placeholderTextColor="black"
        textAlign="left"
      />
      <TextInput
        placeholder={t("Password")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="black"
        textAlign="left"
      />
      <TouchableOpacity style={styles.Button} onPress={signIn}>
        <Text style={styles.buttonText}>{t("Login")}</Text>
      </TouchableOpacity>

      <Text style={styles.educatorText}>
        {t("Don't have an Account? Sign Up here")}
      </Text>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.buttonText}>{t("Sign up")}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5B6BA',
    padding: 20,
    justifyContent: 'flex-start',

    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  educatorText: {
    color: 'black',
    alignSelf: "center",
    marginTop: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  title2: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
  },
  Button: {
    backgroundColor: '#0096FF', // Greenish Yellow
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5
  
  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma 
  Button1: {
    backgroundColor: '#0096FF', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: 'white',
    fontStyle: 'normal',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  gif: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
});

export default Login;
