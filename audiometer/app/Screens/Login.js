// Login.js
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import './locales/i18n';
import { t, useTranslation } from "react-i18next";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

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
      console.log(response);
      if (response) {
        try {
          await AsyncStorage.setItem("userId", response.user.uid);
        } catch (error) {
          console.error("Error storing userId:", error);
        }
      } else {
        alert("Invalid Credentials");
      }
      const userId = await AsyncStorage.getItem('userId');
      console.log(userId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>{t("Login")}</Text>
      <TextInput
        placeholder={t("Email")}
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
        placeholderTextColor="grey"
        textAlign="center"
      />
      <TextInput
        placeholder={t("Password")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="grey"
        textAlign="center"
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },

  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },

  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 40,
    textAlign: "center",
  },

  title2: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "left",
    marginTop: 80,
  },

  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 0,
    width: "90%",
    color: "white",
    alignContent: "center",
  },
  Button: {
    backgroundColor: "#D4AF37", // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginBottom: 20,
    borderRadius: 10,
  },

  educatorText: {
    color: "white",
    marginBottom: 10,
  },

  buttonText: {
    color: "black",
    textAlign: "center",
  },
});

export default Login;
