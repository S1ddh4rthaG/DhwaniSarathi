
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Components/Header";
import Home from "./Screens/Home";
import Signin from "./Screens/Signin";
import FillDetails from "./Screens/FillDetails";
import BeforeYouStart from "./Screens/BeforeYouStart";
import LeftEar from "./Screens/LeftEar";
import Results from "./Screens/Results";
import Login from "./Screens/Login"; 
import Signup from "./Screens/Signup"; 
import i18n from './locales/i18n'; 
import {useTranslation} from 'react-i18next';
import { I18nextProvider } from "react-i18next";  
import Signout from "./Screens/Signout";
import { FIREBASE_AUTH } from "../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import EducatorHome from "./Screens/Educator/EducatorHome.js";
import AssignmentList from "./Screens/Educator/AssignmentList.js";
import RightEar from "./Screens/RightEar.js";

const Stack = createStackNavigator();

function Page() {
  // const [currentLanguage, setLanguage] = useState('hi'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  const {t} =useTranslation(); 
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          headerTitleAlign: "Signin", // Center the header title

          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="Signup"
        alignItems="center"
        component={Signup}
        options={{
          headerTitle: () => <Header name={t("Sign Up")} />,
          headerTitleAlign: "Signin", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity> */}

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: () => <Header name={t("Login")} />,
          headerTitleAlign: "Signin", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity> */}

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          headerTitleAlign: "center", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="FillDetails"
        component={FillDetails}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          headerTitleAlign: "left", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="BeforeYouStart"
        component={BeforeYouStart}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          heeaderTitlAlign: "left", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="LeftEar"
        component={LeftEar}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          headerTitleAlign: "left", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />

      <Stack.Screen
        name="Results"
        component={Results}
        options={{
          headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
          headerTitleAlign: "left", // Center the header title
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <MaterialCommunityIcons
                  style={styles.button}
                  name="account-circle"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>

              {/* Additional icons or content for the right side */}
            </View>
          ),
          headerStyle: {
            height: 70,
            backgroundColor: "#D4AF37",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
  },
});

export default () => {
  const [user, setUser] = useState(null); // Initialize user state as null
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
    <NavigationContainer independent={true}>
      {user ? <Signout /> : <Signup />}
    </NavigationContainer>
    </I18nextProvider>
  );
};
