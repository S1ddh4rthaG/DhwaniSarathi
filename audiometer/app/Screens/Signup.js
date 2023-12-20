// Signup.js
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView, // Import Alert
} from "react-native";
import { Button, TextInput, Text, Card } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { baseurl } from "../Constants/ip.js";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";
import { useTranslation } from "react-i18next";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useTogglePasswordVisibility } from "../Components/useTogglePasswordVisibility.js";
import { router } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import { use } from "i18next";
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
  const [selectedAge, setSelectedAge] = useState(null); // Changed to null initially
  const [gender, setGender] = useState("male");
  const [educatorName, setEducatorName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    try {
      // Email format validation
      const mobileRegex = /^[0-9]{10}$/;
      // if email doesnt have @gmail.com append 

      // setEmail(email + "@gmail.com");
      const email_current = email + "@gmail.com";

      if (!mobileRegex.test(email)) {
        Alert.alert('Mobile Number Error', 'Please enter a valid mobile number');
        return;
      }

      if(userType === "User") {

        // Name validation (no numbers allowed)
        const nameRegex = /^[^\d]+$/;
        if (!nameRegex.test(name)) {
          Alert.alert('Name Error', 'Numbers are not allowed in the name field');
          return;
        }
      }

      // Password strength validation
      if (password.length < 8) {
        Alert.alert('Password Error', 'Password must be at least 8 characters long');
        return;
      }

      if(userType === "User") {

        // Age validation
        if (selectedAge === null) {
          Alert.alert('Age Error', 'Please select a valid age');
          return;
        }
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email_current,
        password
      );

      if (response) {
        var payload = {
          FID: response.user.uid,
          Type: userType === "User" ? 0 : 1,
        };

        if (userType === "User") {
          payload["UserName"] = name;
          payload["Age"] = selectedAge;
          payload["Gender"] = gender;
        } else {
          payload["EducatorName"] = educatorName;
          payload["InstituteName"] = instituteName;
        }

        let url = baseurl + "/logininfos/";

        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      Alert.alert("Success", "User created successfully");

      router.push("/Screens/Login");

    } catch (error) {
      Alert.alert('Username Already In Use', 'Mobile Already Registered.');
      console.log(error);
    }
  };

  const renderAgePickerItems = () => {
    const ageItems = [];
    for (let i = 1; i <= 130; i++) {
      ageItems.push(<Picker.Item key={i} label={`${i}`} value={i} />);
    }
    return ageItems;
  };



  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();



  

  return (
    <PaperProvider theme={theme}>
    
      <Card style={styles.container}>
        <Image style={styles.image} source={require('../assets/images/signup.png')} resizeMode='cover' />

      
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
          label={"Teacher"}
          value="Educator"
        />
      </Picker>

      {userType === "User" ? (
        <>
        <TextInput
          label={t("Name")}
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          mode="outlined"
        />
        </>
      ) : (
        <>
        <Text style={styles.title2}>{"Teacher Name"}</Text>
        <TextInput
          style={styles.input}
          // placeholder={t("Enter your name")}
          onChangeText={(text) => setEducatorName(text)}
          value={educatorName} // Use the 'educatorName' state variable
          textAlign="left"
          color="black"
          placeholderTextColor="black"
        />
        <Text style={styles.title2}>{t("Institute Name")}</Text>
        <TextInput
          style={styles.input}
          // placeholder={t("Enter Institute name")}
          onChangeText={(text) => setInstituteName(text)}
          value={instituteName} // Use the 'instituteName' state variable
          textAlign="left"
          color="black"
          placeholderTextColor="black"
        />
      </>
      )}

        <TextInput
          label={t("Mobile Number")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Password")}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={passwordVisibility}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label={t("Confirm Password")}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={passwordVisibility}
          style={styles.input}
          mode="outlined"
        />

{userType === "User" ? (
  <>
        <Picker
          selectedValue={selectedAge}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setSelectedAge(itemValue)}
        >
          <Picker.Item label={t("Select Age")} value={null} />
          {renderAgePickerItems()}
        </Picker>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item style={styles.pickerItem} label={t("Male")} value="Male" />
          <Picker.Item style={styles.pickerItem} label={t("Female")} value="Female" />
        </Picker>
        
        </>
      ) : null}
     
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
    height: 150,
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
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
