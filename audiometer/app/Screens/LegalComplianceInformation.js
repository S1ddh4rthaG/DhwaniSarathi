
// Import necessary navigation components
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Box, IconButton, HStack, Icon, MaterialIcons, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 
// import './locales/i18n';  
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme, Appbar } from 'react-native-paper';

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

  

const pollutionBoards = [
  {
    id: 1,
    name: 'Central Pollution Control Board',
    websiteUrl: 'https://cpcb.nic.in/noise-monitoring-data/?&page_id=noise-monitoring-data',
    imagepath: require('../assets/images/india.jpg')
  },
  {
    id: 2,
    name: 'Maharashtra Pollution Control Board',
    websiteUrl: 'https://mpcb.gov.in/noise-pollution',
    imagepath: require('../assets/images/maharashtra.jpg')
  },
  // Add more boards as needed
];

// React Native component
const LegalComplianceInformation = () => {
  const navigation = useNavigation();

  // Function to handle card click
  const handleCardClick = (board) => {
    // Navigate to the Pollution Control Board website
    router.push({pathname: '/Screens/LegalWebViewScreen', params:  board });
  };

  return (
    <PaperProvider theme={theme}>
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require('../assets/images/legal_compliance_information.jpeg')}
        style={styles.headerImage}
      />

      {/* List of Pollution Control Board Cards */}
      {pollutionBoards.map((board) => (
        <TouchableOpacity
          key={board.id}
          style={styles.card}
          onPress={() => handleCardClick(board)}
        >
          <Image source={board.imagepath} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{board.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </PaperProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '80%'
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LegalComplianceInformation;
