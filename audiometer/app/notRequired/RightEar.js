import React ,{useState}from 'react';
import { View, Text, Image,  TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
// import './locales/i18n'; 
import {useTranslation} from 'react-i18next'; 

  
const RightEar = () => {
  const {t,i18n} =useTranslation(); 
  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Right Ear')}</Text>
      <Image style={styles.image} resizeMode='cover' />
      
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Frequency 1000HZ')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Intensity 20DB')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.buttonText}>{t('Press if you hear a beep')}</Text>
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
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    
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
export default RightEar;
