import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from "@react-native-picker/picker";
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

    // Handle submission logic here (e.g., integrate with Firebase)
    alert(`Location: ${selectedLocation.latitude}, ${selectedLocation.longitude}\nNoise Level: ${noiseLevel}`);
    
    // Reset selected location and noise level
    setSelectedLocation(null);
    setNoiseLevel(0);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        onLongPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} pinColor="blue" />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.noiseLevelContainer}>
          <Text>Select Noise Level:</Text>
          <Picker
            selectedValue={noiseLevel}
            style={styles.picker}
            onValueChange={handlePickerChange}
          >
            <Picker.Item label="Low" value={1} color="green" />
            <Picker.Item label="Moderate" value={2} color="yellow" />
            <Picker.Item label="High" value={3} color="orange" />
            <Picker.Item label="Very High" value={4} color="red" />
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
});

export default MapData;
