// Signup.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { baseurl } from "../Constants/ip.js";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [age, setAge] = useState(0);
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
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/signup.png")}
        resizeMode="cover"
      />
      <Text style={styles.title2}>{t("User Type")}</Text>
      <Picker
        selectedValue={userType}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item style={styles.pickerItem} label={t("User")} value="User" />
        <Picker.Item
          style={styles.pickerItem}
          label={t("Educator")}
          value="Educator"
        />
      </Picker>

      {userType === "User" ? (
        <>
          <Text style={styles.title2}>{t("Name")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Enter your name")}
            onChangeText={(text) => setName(text)}
            value={name}
            textAlign="left"
            color="black"
            placeholderTextColor="black"
          />
          {/* <Text style={styles.title2}>{t("Age")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Enter your Age")}
            onChangeText={(text) => setAge(text)}
            value={String(age)} // Convert 'age' to string explicitly
            textAlign="left"
            color="black"
            placeholderTextColor="black"
          /> */}
        </>
      ) : (
        <>
          <Text style={styles.title2}>{t("Educator Name")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Enter your name")}
            onChangeText={(text) => setEducatorName(text)}
            value={educatorName} // Use the 'educatorName' state variable
            textAlign="left"
            color="black"
            placeholderTextColor="black"
          />
          <Text style={styles.title2}>{t("Institute Name")}</Text>
          <TextInput
            style={styles.input}
            placeholder={t("Enter Institute name")}
            onChangeText={(text) => setInstituteName(text)}
            value={instituteName} // Use the 'instituteName' state variable
            textAlign="left"
            color="black"
            placeholderTextColor="black"
          />
        </>
      )}

      <Text style={styles.title2}>{t("Email")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your email id")}
        onChangeText={(text) => setEmail(text)}
        value={email}
        textAlign="left"
        color="black"
        placeholderTextColor="black"
      />
      <Text style={styles.title2}>{t("Password")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your password")}
        onChangeText={(text) => setPassword(text)}
        value={password}
        textAlign="left"
        color="black"
        placeholderTextColor="black"
      />

      <Text style={styles.title2}>{t("Confirm Password")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Confirm Password")}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        textAlign="left"
        color="black"
        placeholderTextColor="black"
      />

      <TouchableOpacity style={styles.Button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{t("Sign Up")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5B6BA",
    padding: 20,
    justifyContent: "flex-start",
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
    width: 50,
    height: 50,
    alignContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  title2: {
    fontSize: 18,
    color: "black",
    marginBottom: 5,
    textAlign: "left",
    fontWeight: "bold",
  },
  pickerItem: {
    color: "black",
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 15,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  Button: {
    backgroundColor: "#0096FF", // Greenish Yellow
    marginTop: "auto", // Push the button to the bottom
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
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
    backgroundColor: "#0096FF", // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
    color: "white",
    fontStyle: "normal",
  },
});

export default Signup;
