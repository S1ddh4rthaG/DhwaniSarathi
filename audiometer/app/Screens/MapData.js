import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
// import {AppBar} from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
// import './locales/i18n';  
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { Button, Provider as PaperProvider, DefaultTheme, Appbar } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EB455F',
    accent: '#f1c40f',
  },
};
const Maps = () => {
  const markers = [
    { id: 1, title: 'Udaipur Arogya', coordinate: { latitude: 24.5854, longitude: 73.7125} },
    { id: 2, title: 'Sankalp Speclialist', coordinate: { latitude: 24.1820, longitude: 73.339 } },
    { id: 3, title: 'Sutar Arogya center', coordinate: { latitude: 24.3839, longitude: 73.2809 } },
    // Add more markers as needed
  ];

  return (
    <PaperProvider theme={theme}>
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 24.5854,
          longitude: 73.7125,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={`Lat: ${marker.coordinate.latitude}, Long: ${marker.coordinate.longitude}`}

          >
            
            <Image source={require('../assets/images/logo.png')} style={{ width: 30, height: 30, alignSelf: 'center' }} />
           </Marker>
        ))}
      </MapView>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});

export default Maps;
