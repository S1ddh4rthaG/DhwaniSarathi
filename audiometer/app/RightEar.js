import React ,{useState}from 'react';
import { View, Text, Image,  TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';


  
const RightEar = () => {
   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Right Ear</Text>
      <Image style={styles.image}
        source={require('./assets/rightear.png')}
        resizeMode='cover'/>
      
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Frequency 1000HZ</Text>
      </TouchableOpacity>
      
       <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Intensity 20DB</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.buttonText1}>Press if you hear a beep</Text>
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

export default RightEar;
