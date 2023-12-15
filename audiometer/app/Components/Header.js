import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Header = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Audiometer</Text>
        <TouchableOpacity style={styles.headerRight}>
          {/* Your right header component */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0096FF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginRight: 15,
  },
});

export default Header;
