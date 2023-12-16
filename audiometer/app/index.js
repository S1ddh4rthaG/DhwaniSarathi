import React from "react";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { Link, Redirect } from "expo-router";
export default () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      setUser(user);
    });
  }, []);

  if (user) {
    return <Redirect href="/Screens/Signout" />;
  }

  return <Redirect href ="/Screens/Signout" />;
};

// const styles = StyleSheet.create({
//   button: {
//     alignSelf: "center",
//   },
// });

// function Mystack() {
//   const { t } = useTranslation();
//   return (
//     //TODO: check if user is Educator or User

//     <Stack.Navigator initialRouteName={user ? "Signout" : "Signup"}>
//       <Stack.Screen
//         name="Home"
//         component={AudiometryTest}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "Signin", // Center the header title

//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="Signup"
//         alignItems="center"
//         component={Signup}
//         options={{
//           headerTitle: () => <Header name={t("Sign Up")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="BeforeTest1"
//         alignItems="center"
//         component={BeforeTest1}
//         options={{
//           headerTitle: () => <Header name={t("Before Test 1")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="BeforeTest2"
//         alignItems="center"
//         component={BeforeTest2}
//         options={{
//           headerTitle: () => <Header name={t("Before Test 2")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="BeforeTest3"
//         alignItems="center"
//         component={BeforeTest3}
//         options={{
//           headerTitle: () => <Header name={t("Before Test 3")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="QuietPlaceDetection"
//         alignItems="center"
//         component={QuietPlaceDetection}
//         options={{
//           headerTitle: () => <Header name={t("Check your surrounding")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           headerTitle: () => <Header name={t("Login")} />,
//           headerTitleAlign: "Signin", // Center the header title
//           headerRight: () => (
//             <View
//               style={{ flexDirection: "row", alignItems: "center" }}
//             ></View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="GetStarted"
//         component={GetStarted}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "center", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>

//               {/* Additional icons or content for the right side */}
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="FillDetails"
//         component={FillDetails}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="BeforeYouStart"
//         component={BeforeYouStart}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           heeaderTitlAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="LeftEar"
//         component={LeftEar}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>

//               {/* Additional icons or content for the right side */}
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />

//       <Stack.Screen
//         name="RightEar"
//         component={RightEar}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />
//       <Stack.Screen
//         name="Signout"
//         component={Signout}
//         options={{
//           headerTitle: () => <Header name={t("Signout")} />,
//           headerTitleAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />
//       <Stack.Screen
//         name="Results"
//         component={Results}
//         options={{
//           headerTitle: () => <Header name={t("Hertz hEARing Test")} />,
//           headerTitleAlign: "left", // Center the header title
//           headerRight: () => (
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <TouchableOpacity style={{ marginRight: 15 }}>
//                 <MaterialCommunityIcons
//                   style={styles.button}
//                   name="account-circle"
//                   size={28}
//                   color="black"
//                 />
//               </TouchableOpacity>
//             </View>
//           ),
//           headerStyle: {
//             height: 70,
//             backgroundColor: "#0096FF",
//             borderBottomLeftRadius: 10,
//             borderBottomRightRadius: 10,
//             borderWidth: 2,
//             borderColor: "white",
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }
