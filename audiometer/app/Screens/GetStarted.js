import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
// import './locales/i18n'; 
import { useTranslation } from 'react-i18next';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};

const GetStarted = () => {

  // const [currentLanguage, setLanguage] = useState('en'); 
  // const changeLanguage= value=>{
  //   i18n.changeLanguage(value)
  //   .then(()=>setLanguage(value))
  //   .catch(err => console.log(err)); 
  // }
  const {t,i18n} =useTranslation(); 
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 300, height: 300, alignSelf: 'center' }} />
        <Text style={styles.title}>"Dhwani Sarathi"</Text>
        <Text style={styles.subtitle}>{t('App based audiometer')}</Text>

        <Button style={styles.getStartedButton} mode="contained" onPress={() => console.log('Pressed')}>
        <Text style={styles.getStartedText} variant="bodyMedium">{t('Get Started')}</Text>
        </Button>

        <Card style={styles.educatorContainer}>
          <Text style={styles.educatorText} variant="bodyMedium">{t('Are you an educator?')}</Text>
          <Text style={styles.educatorDesc} variant="bodySmall">{t('Educators can conduct batch tests, get analytics and many more')}</Text>
          <Button style={styles.educatorButton} mode="outlined" onPress={() => console.log('Pressed')}>
            {t('Sign up here !')}
          </Button>
        </Card>
      </View>
    </PaperProvider>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 32,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#2B3467',
  },

  subtitle: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20,
    color: '#2B3467',
  },

  getStartedButton: {
    marginTop: 10,
    marginBottom: 40,
    backgroundColor: '#EB455F',
  },
  getStartedText: {
    fontSize: 16,
    color: '#fff',
  },
  educatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    padding: 15,
  },
  educatorText: {
    fontSize: 20,
    color: '#2B3467',
    marginBottom: 8,
  },
  educatorDesc: {
    fontSize: 12,
    color: '#2B3467',
    marginBottom: 10,
  },
  educatorButton: {
    borderColor: '#EB455F',
  },
};

export default GetStarted;
