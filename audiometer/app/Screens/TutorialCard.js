import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TutorialCard = ({ stepNumber, imageSource, description }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.stepNumber}>{stepNumber}</Text>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    alignItems: 'center',
    elevation: 3,

  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    alignContent: 'center',

  },
});

export default TutorialCard;
