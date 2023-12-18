import React, { useState } from 'react';
import { Box, IconButton, HStack, MaterialIcons, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
// import './locales/i18n';  
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme, Appbar, Tooltip } from 'react-native-paper';
// Use icons
import Icon from 'react-native-vector-icons/FontAwesome';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};
import { router } from "expo-router";

const Home = () => {
  const { t, i18n } = useTranslation();



  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'flex-fill', padding: 32 }}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 300, height: 300, alignSelf: 'center' }} />
        <Text style={{ fontSize: 32, alignSelf: 'center', fontWeight: 'bold', marginBottom: 40, color: "#2B3467" }}>{t('Hertz hEARing Test')}</Text>

      </View>
      {/* Flex fill */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', padding: 10, margin: 8, backgroundColor: '#EB4557', width: "96%",
          justifyContent: 'center', alignItems: 'center', borderRadius: 25
        }}>
          <Button mode="contained" style={styles.bNav} onPress={() => router.push('/Screens/FillDetails')}>
            {/* Start test */}
            <Tooltip title='Start test' placement='top'>
              <Icon name="play" size={18} color="white" style={styles.bIcon} />
            </Tooltip>
          </Button>
          <Button mode="contained" style={styles.bNav} onPress={() => { }}>
            {/* Test results */}
            <Tooltip title='Test results' placement='top'>
              <Icon name="list" size={18} color="white" style={styles.bIcon} />
            </Tooltip>
          </Button>
          <Button mode="contained" style={styles.bNav} onPress={() => { }}>
            {/* Instructions */}
            <Tooltip title='Instructions' placement='top' >
              <Icon name="info" size={18} color="white" style={styles.bIcon} />
            </Tooltip>
          </Button>
          <Button mode="contained" style={styles.bNav} onPress={() => { router.push('/Screens/LegalComplianceInformation') }}>
            {/* Legal compliance */}
            <Tooltip title='Legal compliance' placement='top'>
              <Icon name="legal" size={18} color="white" style={styles.bIcon} />
            </Tooltip>
          </Button>
          <Button mode="contained" style={styles.bNav} onPress={() => { router.push('/Screens/Maps') }}>
            {/* Doctors near me */}
            <Tooltip title='Doctors near me' placement='top'>
              <Icon name="map-marker" size={18} color="white" style={styles.bIcon} />
            </Tooltip>
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  bIcon: {
    padding: 0,
    margin: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#B5B6BA',
    padding: 20,
    justifyContent: 'center',

    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderColor: '#0096FF',
    borderWidth: 3
  },
  Button: {
    backgroundColor: '#0096FF', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5

  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma 
  Button1: {
    backgroundColor: '#0096FF', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

  gif: {
    width: '100%',
    height: 200, // Adjust the height as needed
    marginBottom: 20,
  },
  bNav: {
    padding: 0,
    marginStart: 3,
    marginEnd: 3,
    backgroundColor: '#2B3467',
    justifyContent: 'center',
  }
});

export default Home;
