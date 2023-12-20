import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

const MapData = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [noiseLevel, setNoiseLevel] = useState(0);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;

    // Set the selected location and reset noise level
    setSelectedLocation(coordinate);
    setNoiseLevel(0);
  };

  const handlePickerChange = (value) => {
    setNoiseLevel(value);
  };

  const handleSubmit = () => {
    if (!selectedLocation) {
      alert('Please select a location on the map.');
      return;
    }

    let decibelValue;
    switch (noiseLevel) {
      case 1:
        decibelValue = '20-40 dB (Low)';
        break;
      case 2:
        decibelValue = '40-60 dB (Moderate)';
        break;
      case 3:
        decibelValue = '60-80 dB (High)';
        break;
      case 4:
        decibelValue = '80+ dB (Very High)';
        break;
      default:
        decibelValue = 'Unknown';
        break;
    }

    // Handle submission logic here (e.g., integrate with Firebase)
    alert(
      `Location: ${selectedLocation.latitude}, ${selectedLocation.longitude}\nNoise Level: ${decibelValue}`
    );

    // Reset selected location and noise level
    setSelectedLocation(null);
    setNoiseLevel(0);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 24.5854,
          longitude: 73.7125,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} pinColor="blue" />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.noiseLevelContainer}>
          <Text style={styles.text}>Select Noise Level:</Text>
          <Picker
            selectedValue={noiseLevel}
            style={styles.picker}
            onValueChange={handlePickerChange}
          >
            <Picker.Item label="Low (20-40 dB)" value={1} color="lightgreen" />
            <Picker.Item label="Moderate (40-60 dB)" value={2} color="green" />
            <Picker.Item label="High (60-80 dB)" value={3} color="orange" />
            <Picker.Item label="Very High (80+ dB)" value={4} color="red" />
          </Picker>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  noiseLevelContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  picker: {
    width: 200,
    height: 50,
    marginVertical: 10,
  },
  submitButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold'
  }
});

export default MapData;
