import React, { useState } from 'react';
import { Box, IconButton, HStack, Icon, MaterialIcons, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
// import './locales/i18n';  
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme, Appbar } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};


const Home = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }

  return (
    <PaperProvider theme={theme}>
      <View style={{ flex: 1, justifyContent: 'top', padding: 32 }}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 300, height: 300, alignSelf: 'center' }} />
        <Text style={{ fontSize: 32, alignSelf: 'center', fontWeight: 'bold', marginBottom: 40 }}>{t('Hertz hEARing Test')}</Text>
        <Button mode="contained" onPress={() => navigation.navigate('FillDetails')} style={{ margin: 10 }}>
          {t('Start Full Test')}
        </Button>
        <Button mode="contained" onPress={() => { }} style={{ margin: 5 }}>
          {t('Test Single Frequency')}
        </Button>
        <Button mode="contained" onPress={() => { }} style={{ margin: 5 }}>
          {t('Calibration')}
        </Button>
        <Button mode="contained" onPress={() => { }} style={{ margin: 5 }}>
          {t('Test Results')}
        </Button>
        <Button mode="contained" onPress={() => { }} style={{ margin: 5 }}>
          {t('Instructions')}
        </Button>
      </View>
    </PaperProvider>
  );
};

export default Home;
