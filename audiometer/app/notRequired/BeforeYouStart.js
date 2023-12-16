import React ,{useState}from 'react';
import { View, Text, Image,  TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {useTranslation} from 'react-i18next'; 
import { router } from 'expo-router';

  
const BeforeYouStart = () => {
    
  const [loudness, setLoudness]= useState(40); 
  const handleLoudnessChange = (value)=>{
    setLoudness(value); 
  }
  const {t,i18n} =useTranslation(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Before You Start..')}</Text>
      <Image style={styles.image}
        source={require('../assets/nosoundwhite.png')}
        resizeMode='cover'/>
      <Text style={styles.title2}>{t('Quiet Place')}</Text>

      <Image style={styles.image}
        source={require('../assets/headphones.png')}
        resizeMode='cover'/>
      <Text style={styles.title2}>{t('Headphones')}</Text>

      <Text style={styles.title2}>{t('Ambient Sound')}</Text>
      <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>0</Text>
      <Slider style={styles.slider}
        minimumValue={0}
        maximumValue={1000}
        onValueChange={handleLoudnessChange}
        minimumTrackTintColor= "#0096FF"
        maximumTrackTinkColor="white"
        thumbTintColor="#0096FF"/>
      <Text style={styles.sliderLabel1}>{t('Loud')}</Text>

      
      </View>
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Proceed to Test!!')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: "center"
    
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
    width:"100%",
    
  },
  image: {
    width: 100,
    height: 100,
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20, 
    textAlign: "center",
    fontWeight: 'bold'
  },
  title2: {
    fontSize : 18, 
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: "left", 
  }, 
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    textAlign: "left",
  },
  Button: {
    backgroundColor: '#0096FF', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 3
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
    fontWeight: 'bold'
  },

  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: 'white',
    fontStyle: 'italic'
    
  },
});

export default BeforeYouStart;
