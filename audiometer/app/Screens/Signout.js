// Login.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";

const Signout = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      FIREBASE_AUTH.signOut();
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userType");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.Button} onPress={() => handleSignOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    backgroundColor: "#FFD700",
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
