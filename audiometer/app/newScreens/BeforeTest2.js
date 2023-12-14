import React ,{useState}from 'react';
import { View, Text, Image,  TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
// import './locales/i18n'; 
 import {useTranslation} from 'react-i18next'; 

  
const BeforeTest2 = ({navigation}) => {
    
  const [loudness, setLoudness]= useState(40); 
  const handleLoudnessChange = (value)=>{
    setLoudness(value); 
  }
  const {t,i18n} =useTranslation(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('We recommend')}</Text>
      <Image style={styles.image}
        source={require('../assets/notifications.png')}
        resizeMode='cover'/>
      <Text style={styles.title2}>{t('Turn off notifications')}</Text>

      <Image style={styles.image}
        source={require('../assets/equalizer.png')}
        resizeMode='cover'/>
      <Text style={styles.title2}>{t('Set Equalizer to Neutral')}</Text>

      <TouchableOpacity style={styles.Button} onPress={()=>{navigation.navigate('BeforeTest3')}}>
        <Text style={styles.buttonText}>{t('Ok')}</Text>
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
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 5,
      borderRadius: 10
    },
    sliderContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 50,
    },
    sliderLabel: {
      fontSize: 15,
      color: 'white',
    },
    sliderLabel1: {
      fontSize: 15,
      color: 'red',
    },
    slider: {
      flex: 1,
      width: '100%',
    },
    image: {
      width: 60,
      height: 60,
      alignContent: 'center',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    title: {
      fontSize: 24,
      color: 'black',
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 20,
    },
    title2: {
      fontSize: 18,
      color: 'black',
      marginBottom: 20,
      textAlign: 'left',
      fontWeight: 'bold'
    },
    subtitle: {
      fontSize: 15,
      color: 'white',
      marginBottom: 10,
      textAlign: 'left',
    },
    Button: {
      backgroundColor: '#0096FF', // Greenish Yellow
      marginTop: 'auto', // Push the button to the bottom
      borderRadius: 10,
      paddingVertical: 15,
      width: '100%',
      borderColor: 'white',
      borderWidth: 1,
    },
    educatorContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    educatorText: {
      color: 'white',
      marginBottom: 10,
    },
    educatorButton: {
      backgroundColor: '#0096FF', // Greenish Yellow
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttonText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
  
    input: {
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      width: '100%',
      color: 'white',
      fontStyle: 'italic',
    },
  });
  
  export default BeforeTest2;