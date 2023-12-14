// Signup.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useTranslation } from "react-i18next";

const Signup = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [age, setAge] = useState(50);
  const [gender, setGender] = useState("Male");
  const [educatorName, setEducatorName] = useState("dummy");
  const [instituteName, setInstituteName] = useState("dummy");
  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response) {
        const createUserDB = await fetch(
          `http://192.168.1.5/login/${response.user.uid}/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              FID: response.user.uid,
              Type: userType === "User" ? 0 : 1,
              UserName: name,
              Age: age,
              Gender: gender,
              EducatorName: educatorName,
              InstituteName: instituteName,
            }),
          }
        );
        console.log(createUserDB);
      }
      console.log(response);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{t("User Type")}</Text>
      <Picker
        selectedValue={userType}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setUserType(itemValue)}
      >
        <Picker.Item style={styles.pickerItem} label={t("User")} value="User" />
        <Picker.Item label={t("Educator")} value="Educator" />
      </Picker>

      <Text style={styles.subtitle}>{t("Email")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your email id")}
        onChangeText={(text) => setEmail(text)}
        value={email}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      />

      <Text style={styles.subtitle}>{t("Password")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your password")}
        onChangeText={(text) => setPassword(text)}
        value={password}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      />

      <Text style={styles.subtitle}>{t("Confirm Password")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Confirm Password")}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      />

      <Text style={styles.subtitle}>{t("Name")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your name")}
        onChangeText={(text) => setName(text)}
        value={name}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      />
      <Text style={styles.subtitle}>{t("Gender")}</Text>
      <Picker
        selectedValue={userType}
        style={styles.picker}
        itemStyle={styles.pickerItem}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item style={styles.pickerItem} label={t("Male")} value="Male" />
        <Picker.Item label={t("Female")} value="Female" />
      </Picker>
{/* 
      <Text style={styles.subtitle}>{t("Educator Name")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter your name")}
        onChangeText={(text) => setEducatorName(text)}
        value={name}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      />
      <Text style={styles.subtitle}>{t("Institute Name")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("Enter Institute name")}
        onChangeText={(text) => setInstituteName(text)}
        value={name}
        textAlign="left"
        color="white"
        placeholderTextColor="grey"
      /> */}
      <TouchableOpacity style={styles.Button} onPress={handleSignup}>
        <Text style={styles.buttonText}>{t("Sign Up")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    color: "black",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  pickerItem: {
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    color: "white",
    fontStyle: "italic",
  },
  Button: {
    backgroundColor: "#FFD700",
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 5,
    width: "50%",
    alignSelf: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Signup;
