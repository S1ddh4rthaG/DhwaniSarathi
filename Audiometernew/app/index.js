import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Home</Text>
          <Text>Welcome to our homepage!</Text>
  
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
