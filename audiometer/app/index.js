
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import Home from "./Home";
import Signin from "./Signin";
import FillDetails from "./FillDetails";
import BeforeYouStart from "./BeforeYouStart";
import LeftEar from "./LeftEar";
import Results from "./Results";
const Stack = createStackNavigator();

// export default function Page() {
//   return (

//     // <View style={styles.container}>
//     //   <View style={styles.main}>
//     //     <Text style={styles.title}>Hello World</Text>
//     //     <Text style={styles.subtitle}>This is the first page of your app.</Text>
//     //   </View>
//     // </View>
//     <View style={{flex:1}}>
//       <LeftEar/>
//     </View>
//   );
// }

function Page() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={LeftEar}
        options={{
          headerTitle: () => <Header name="Hertz hEARing Test" />,
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#D4AF37",
            
          },
        }}
      />

      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerTitle: () => <Header name="Hertz hEARing Test" />,
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#D4AF37",
            
          },
        }}
      />

      <Stack.Screen
        name="FillDetails"
        component={FillDetails}
        options={{
          headerTitle: () => <Header name="Hertz hEARing Test" />,
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#D4AF37",
            
          },
        }}
      />

      <Stack.Screen
        name="BeforeYouStart"
        component={BeforeYouStart}
        options={{
          headerTitle: () => <Header name="Hertz hEARing Test" />,
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#D4AF37",
            
          },
        }}
      />

      <Stack.Screen
        name="LeftEar"
        component={LeftEar}
        options={{
          headerTitle: () => <Header name="Hertz hEARing Test" />,
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
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
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
  return (
    <NavigationContainer independent={true}>
      <Page />
    </NavigationContainer>
  );
};
