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

import { FIREBASE_AUTH } from "../../FirebaseConfig.js";

const Signout = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
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
    backgroundColor: "#0096FF",
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

export default Signout;
