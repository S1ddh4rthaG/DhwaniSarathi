
import React , {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import './locales/i18n'; 
 import {useTranslation} from 'react-i18next'; 
const Header=(props)=>{
  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  const {t,i18n} =useTranslation(); 
    return(
        <View style={{marginLeft:15, alignSelf: 'center'}}>
            <Text style={styles.title}>
                {props.name}
            </Text>
        </View>
    )
}


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
      color: 'black',
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
      marginBottom: 100
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      alignContent: 'center'
    },
    title2: {
      fontSize : 25, 
      color: 'black',
      marginBottom: 30,
      textAlign: "left", 
     
    }, 
    subtitle: {
      fontSize: 18,
      color: 'black',
      marginBottom: 10,
      textAlign: "left",
    },
    Button: {
      backgroundColor: 'blue', // Greenish Yellow
      marginTop: 20,
      borderRadius: 10,
      paddingVertical: 20,
  
      width: '100%'
    },
  
    Button1: {
      backgroundColor: '#0096FF', // Greenish Yellow
      marginTop: 50,
      borderRadius: 10,
      paddingVertical: 20,
  
      width: '100%'
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
      color: 'black',
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
      fontSize: 20,
      //fontWeight: 'bold'
    },
  
    input: {
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      width: '100%',
      color: 'black',
      fontStyle: 'italic'
      
    },
  });

  export default Header;