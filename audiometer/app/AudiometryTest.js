import React, { useState } from 'react';
import { View, StyleView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Audiometry } from "./utils/Audiometry.js";
import { PureTone } from "./utils/PureTone.js";

const AudiometryTest = () => {
  const [playState, setPlayState] = useState(0); // 0: stopped, 1: playing, 2: paused
  const [ear, setEar] = useState('left');
  const [conduction, setConduction] = useState('air');
  const [masking, setMasking] = useState(true);
  const [frequency, setFrequency] = useState(1000);
  const [threshold, setThreshold] = useState(0);
  const [audiometry, setAudiometry] = useState(new Audiometry());
  const [isTestOver, setIsTestOver] = useState(false);

  // Update state values with view getters
  const updateState = () => {
    setEar(audiometry.getEar());
    setConduction(audiometry.getConduction());
    setMasking(audiometry.getMask());
    setFrequency(audiometry.getFrequency());
    setThreshold(audiometry.getThreshold());
  }

  const start = () => {
    audiometry.start();
    updateState();
    setPlayState(1);
  }

  const updateResponse = (response) => {
    setIsTestOver(audiometry.regResponse(response));
    updateState();
    audiometry.playTone();
  }

  const getResults = () => {
    return audiometry.getResults();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Audiometry Test</Text>

      {playState !== 1 && (
        <TouchableOpacity style={styles.Button} onPress={start}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {
        isTestOver && (
          <TouchableOpacity style={styles.Button} onPress={() => { }}>
            <Text style={styles.buttonText}>Results</Text>
            {/* Display object given by getResults functions */}
            <Text style={styles.title2}>{JSON.stringify(getResults())}</Text>
          </TouchableOpacity>
        )
      }

      {
        playState === 1 && (
          <View>
            <Text style={styles.title2}>Ear: {ear}</Text>
            <Text style={styles.title2}>Conduction: {conduction}</Text>
            <Text style={styles.title2}>Masking: {masking ? "Yes" : "No"}</Text>
            <Text style={styles.title2}>Frequency: {frequency}</Text>
            <Text style={styles.title2}>Threshold: {threshold}</Text>

            {/* Button to play sound */}
            <TouchableOpacity style={styles.Button} onPress={() => audiometry.playTone()}>
              <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>

            {/* Button for updating response */}
            <TouchableOpacity style={styles.Button} onPress={() => updateResponse(true)}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} onPress={() => updateResponse(false)}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        )
      }


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
    width: "100%",

  },
  image: {
    width: 100,
    height: 100,
    alignContent: 'center',
    marginBottom: 100
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 60,
    textAlign: "center"
  },
  title2: {
    fontSize: 25,
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
    backgroundColor: 'blue', // Greenish Yellow
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 20,

    width: '100%'
  },

  Button1: {
    backgroundColor: '#D4AF37', // Greenish Yellow
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
    color: 'white',
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

export default AudiometryTest;
