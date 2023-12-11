import React from 'react';
import { Box, IconButton, HStack, Icon, MaterialIcons, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 

const Home = () => {
  return (
    <View style={styles.container}>

     
     
      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Start Full Test</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button1}>
        <Text style={styles.buttonText}>Test Single Frequency</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Calibration</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Test Results</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Instructions</Text>
      </TouchableOpacity>

      
    </View>
    
  );
};

function AppBar() {
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
    </>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  Button: {
    backgroundColor: '#D4AF37', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingHorizontal: 100,
    marginBottom: 5,
    paddingVertical: 15,
    width: "100%"
  },
  //new style created for the 2nd button as it has the padding below it as shown in the figma 
  Button1: {
    backgroundColor: '#D4AF37', // Greenish Yellow
    marginTop: 20,
    borderRadius: 20,
    paddingHorizontal: 100,
    marginBottom: 5,
    paddingVertical: 15,
    marginBottom: 80,
    width: "100%"
    
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Home;
