import React ,{useState}from 'react';
import { View, StyleView, Text, Image,  TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {NavigationContainer} from "@react-navigation/native"; 
import {createStackNavigator} from "@react-navigation/stack"; 
import {MaterialCommunityIcons} from "@expo/vector-icons";  
import {useTranslation} from 'react-i18next'; 
  
const LeftEar = () => {
  const {t,i18n} =useTranslation(); 
  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Left Ear')}</Text>
      <Image style={styles.image} source={require('../assets/leftear.png')} resizeMode='cover' />
      
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Frequency 1000HZ')}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>{t('Intensity 20DB')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.buttonText1}>{t('Press if you hear a beep')}</Text>
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
    width: 150,
    height: 150,
    alignContent: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20, 
    textAlign: "center",
    fontWeight: 'bold'
  },
  title2: {
    fontSize : 25, 
    color: 'white',
    marginBottom: 30,
    textAlign: "left", 
   
  }, 
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: "left",
  },
  Button: {
    backgroundColor: '#FFD700', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 3
  },
  Button1: {
    backgroundColor: '#FFD700', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 15,
    width: "100%",
    borderColor: 'white',
    borderWidth: 3
  },
  buttonText1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
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
    backgroundColor: '#FFD700', // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    //fontWeight: 'bold'
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

export default LeftEar;
