import React, { useState ,useEffect } from 'react';
import { Box, IconButton, HStack, Icon, MaterialIcons, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 
import {useNavigation} from '@react-navigation/native'; 
// import './locales/i18n';  
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native'; 
import { LANGUAGES } from '../Constants/lng';
const Home = () => {
  const navigation= useNavigation()
  const {t,i18n} =useTranslation(); 
  // const [currentLanguage, setLanguage] = useState('hi'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  return (
    <View style={styles.container}>
     
      <Image style={styles.image} source={require('../assets/audiometer.jpeg')} resizeMode='cover' />
      <TouchableOpacity style={styles.Button} onPress={()=>navigation.navigate('FillDetails')}>
        <Text style={styles.buttonText}>{t('Start Full Test')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.buttonText}>{t('Test Single Frequency')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Calibration')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Test Results')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Instructions')}</Text>
      </TouchableOpacity>

      
    </View>
    
  );
};


const styles = StyleSheet.create({
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
});

export default Home;
