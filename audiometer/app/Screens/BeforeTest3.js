import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, ProgressBar } from 'react-native-paper';
// import './locales/i18n'; 
import { useTranslation } from 'react-i18next';

import { router } from 'expo-router';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};

const BeforeTest3 = () => {

  const [loudness, setLoudness] = useState(40);
  const handleLoudnessChange = (value) => {
    setLoudness(value);
  }
  const { t, i18n } = useTranslation();
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ProgressBar progress={1} color={'#2B3467'} style={{margin: 15}} />
        <Text style={styles.title}>{t('Before you start the audiometry test..')}</Text>
        <Image
          style={styles.image1}
          source={require('../assets/images/silence.png')}
          resizeMode='cover'
        />
        <Text style={styles.title2}>{t('You are in quiet place')}</Text>

        <Image
          style={styles.image2}
          source={require('../assets/images/noise-pollution.png')}
          resizeMode='cover'
        />
        <Text style={styles.title2}>{t('Set noise cancellation to zero')}</Text>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            router.push('/AudiometryTest')
          }}
        >
          <Text style={styles.buttonText}>{t('Next')}</Text>
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
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
  image1: {
    width: 150,
    height: 150,
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  image2: {
    width: 120,
    height: 120,
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    marginBottom: 65,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    marginTop: 'auto', // Push the button to the bottom
    paddingVertical: 15,
    width: '100%',
    borderColor: 'white',
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
    fontSize: 20,
    color: '#fff',
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

export default BeforeTest3;