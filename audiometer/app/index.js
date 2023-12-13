import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Components/Header";
import Home from "./Screens/Home";
import GetStarted from "./Screens/GetStarted.js";
import FillDetails from "./Screens/FillDetails";
import BeforeYouStart from "./Screens/BeforeYouStart";
import LeftEar from "./Screens/LeftEar";
import Results from "./Screens/Results";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import i18n from "./locales/i18n";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import Signout from "./Screens/Signout";
import { FIREBASE_AUTH } from "../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import AudiometryTest from "./AudiometryTest.js";
import EducatorHome from "./Screens/Educator/EducatorHome.js";
import AssignmentList from "./Screens/Educator/AssignmentList.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RightEar from "./Screens/RightEar.js";

const Stack = createStackNavigator();

export default () => {
  const [user, setUser] = useState(null); // Initialize user state as null
  //TODO: why is it called all the time
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        try {
          await AsyncStorage.setItem("userId", user.uid);

          const response = await fetch(`http://192.168.1.5/login/${user.uid}/`);

          if (response.ok) {
            const data = await response.json();

            responseObject = data;

            await AsyncStorage.setItem(
              "userType",
              JSON.stringify(responseObject.Type)
            );
          } else {
            console.error("Failed to fetch user data:", response.status);
          }
        } catch (error) {
          console.error(
            "Error fetching user data or storing user type:",
            error
          );
        }
      }

      // Retrieve user ID and user type from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      const userType = await AsyncStorage.getItem("userType");
      console.log(userId);
      console.log(userType);

      setUser(user);
    });
  }, []);

  function Mystack() {

    const { t } = useTranslation();
    return (
      //TODO: check if user is Educator or User
      <Stack.Navigator initialRouteName='LeftEar' /*initialRouteName={user ? "Home" : "Login"}*/>
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
            },
          }}
        />

        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
            },
          }}
        />

        <Stack.Screen
          name="RightEar"
          component={RightEar}
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
              backgroundColor: "#FFD700",
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
              backgroundColor: "#FFD700",
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer independent={true}>{Mystack()}</NavigationContainer>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
  },
});
