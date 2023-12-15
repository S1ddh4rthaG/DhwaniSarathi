import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const Maps = () => {
  const markers = [
    { id: 1, title: 'Marker 1', coordinate: { latitude: 37.78825, longitude: -122.4324 } },
    { id: 2, title: 'Marker 2', coordinate: { latitude: 37.79825, longitude: -122.4424 } },
    { id: 3, title: 'Marker 3', coordinate: { latitude: 37.77825, longitude: -122.4224 } },
    // Add more markers as needed
  ];

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default Maps;
