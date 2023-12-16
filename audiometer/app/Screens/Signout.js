
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../FirebaseConfig.js";

import {
  Image,
  StyleSheet,
} from "react-native";

import { Button, Text, Card, TextInput } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useTranslation } from "react-i18next";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};

import {router} from 'expo-router';

const Signout = () => {
  const { t, i18n } = useTranslation();
  const handleSignOut = async () => {
    try {
      FIREBASE_AUTH.signOut();
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userType");
      router.push('/Login'); 
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };
  return (
    <PaperProvider theme={theme}>

    <Image source={require('../assets/images/sad_signout.jpeg')} style={{ width: 300, height: 300, marginTop: 120,alignSelf: 'center' }} />
      <Card style={styles.container}>
        <Button style={styles.Button} mode="contained" onPress={handleSignOut}>
          <Text style={styles.buttonText}>{t("Signout?")}</Text>
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
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  educatorText: {
    fontSize: 14,
    color: '#2B3467',
    marginBottom: 12,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
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
    // marginBottom: 20,
    // textAlign: 'left',
    // fontWeight: 'bold'
  },
  subtitle: {
    // fontSize: 15,
    // color: 'white',
    // marginBottom: 10,
    // textAlign: 'left',
  },
  Button: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // borderRadius: 20,
    paddingVertical: 20,
    // width: "100%",
    // borderColor: 'white',
    // borderWidth: 1,
    // elevation: 5
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma 
  Button1: {
    // backgroundColor: '#0096FF', // Greenish Yellow
    // marginTop: 20,
    // borderRadius: 20,
    // paddingVertical: 15,
    // width: "100%",
    // borderColor: 'white',
    // borderWidth: 1,
    // elevation: 5
  },
  input: {
    // height: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    marginBottom: 20,
    // paddingHorizontal: 10,
    // width: '100%',
    // color: 'white',
    // fontStyle: 'normal',
  },

  gif: {
    // width: '100%',
    // height: 200, // Adjust the height as needed
    // marginBottom: 20,
  },

  signUpCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
  }
});

export default Signout;
