import React , {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import './locales/i18n'; 
import {useTranslation} from 'react-i18next'; 
const GetStarted = () => {

  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  const {t,i18n} =useTranslation(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Hertz hEARing Test')}</Text>
      <Text style={styles.subtitle}>{t('Digital audiometer')}</Text>

      <TouchableOpacity style={styles.getStartedButton}>
        <Text style={styles.buttonText}>{t('Get Started')}</Text>
      </TouchableOpacity>

      <View style={styles.educatorContainer}>
        <Text style={styles.educatorText}>{t('Are you an educator?')}</Text>
        <TouchableOpacity style={styles.educatorButton}>
          <Text style={styles.buttonText}>{t('Sign up')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 140,
  },
  getStartedButton: {
    backgroundColor: '#D4AF37', // Greenish Yellow
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 80,
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
    backgroundColor: '#D4AF37', // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default GetStarted;
