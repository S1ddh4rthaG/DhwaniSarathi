import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signin from "./Signin";
import Home from "./Home";
import FillDetails from "./FillDetails";
import BeforeYouStart from "./BeforeYouStart";
import RightEar from "./RightEar";
import LeftEar from "./LeftEar";
import Results from "./Results";
const stack = createStackNavigator();

export default function Page() {
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator initialRouteName="Signin">
        <stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
