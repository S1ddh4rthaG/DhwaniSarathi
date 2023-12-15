import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';
import {router} from 'expo-router';

const QuietPlaceDetection = () => {
  const { t, i18n } = useTranslation();
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [barWidth, setBarWidth] = useState(60); 
  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access audio denied');
      }
    })();
  }, []);
  
  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);

      recordingObject.setProgressUpdateInterval(500); // Set update interval for metering

      recordingObject.setOnRecordingStatusUpdate((status) => {
        setDecibels(status.metering);

        // Change color based on decibel level (you can customize these thresholds)
        if (status.metering > 80) {
          setBarColor('red');
        } else if (status.metering > 60) {
          setBarColor('yellow');
        } else {
          setBarColor('#0096FF'); // Default color
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        setIsRecording(false);
        setBarWidth(60); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWidth = (num) => {
    if (num < 0) {
      return num + 30;
    }
    return num;
  };

  const calculateRGB = (decibels) => {
    // Use decibel values to calculate RGB components
    const red = Math.min(255, Math.round(40-1*decibels));
    const green = Math.min(255, Math.round((120-1*decibels)));
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };


  const [barColor, setBarColor] = useState('#0096FF'); // Initial color

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Check Your Surrounding')}</Text>
      <Image style={styles.image} source={require('../assets/microphone.png')} resizeMode='cover' />

      <View
        style={[
          styles.bar,
          { width: 100 + getWidth(160 + decibels), height: 40, backgroundColor: calculateRGB(decibels) },
        ]}
      >
        <Text style={styles.barText}>{decibels} dB</Text>
      </View>

      <TouchableOpacity
        style={styles.Button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1} onPress={()=>{router.push("/newScreens/BeforeTest2")} }>
        <Text style={styles.buttonText}>{t('Continue')}</Text>
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
  bar: {
    backgroundColor: '#0096FF',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    alignContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
    width: 60,
    marginBottom: 20,
    elevation: 10
  },
  barText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
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
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
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
    elevation: 5,
    
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
export default QuietPlaceDetection;
