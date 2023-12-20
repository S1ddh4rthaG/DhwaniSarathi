
// Import necessary navigation components
import { useNavigation } from '@react-navigation/native';

import React, { useState } from 'react';
import { Box, IconButton, HStack, Icon, MaterialIcons, ScrollView, StatusBar, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
  {
    id: 3,
    name: 'Delhi Pollution Control Board',
    websiteUrl: 'https://www.dpcc.delhigovt.nic.in/noise_standards#gsc.tab=0',
    imagepath: require('../assets/images/delhi.jpg')
  },
  {
    id: 4,
    name: 'Rajasthan Pollution Control Board',
    websiteUrl: 'https://environment.rajasthan.gov.in/content/environment/en/rajasthan-state-pollution-control-board.html',
    imagepath: require('../assets/images/rajasthan.webp')
  },
  {
    id: 5,
    name: 'Andhra Pradesh Pollution Control Board',
    websiteUrl: 'https://pcb.ap.gov.in/UI/Home.aspx',
    imagepath: require('../assets/images/andhra.webp')
  },
  {
    id: 6,
    name: 'Karntaka Pollution Control Board',
    websiteUrl: 'https://kspcb.karnataka.gov.in/',
    imagepath: require('../assets/images/karantaka.webp')
  },
  // Add more boards as needed
];

// React Native component
const LegalComplianceInformation = () => {
  const navigation = useNavigation();

  // Function to handle card click
  const handleCardClick = (board) => {
    // Navigate to the Pollution Control Board website
    router.push({pathname: '/Screens/LegalWebViewScreen', params: {uri: board.websiteUrl}});
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView>
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
    </ScrollView>
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
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#EB455F',
    borderWidth: 2,
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
