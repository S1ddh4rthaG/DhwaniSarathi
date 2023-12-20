import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import router, { useLocalSearchParams } from 'expo-router'; 
const LegalWebViewScreen = ({ route }) => {
  const params = useLocalSearchParams();
  console.log(params.uri); 
  return (
    <View style={{ flex: 1 , padding: 5, backgroundColor: '#B5B6BA'}}>
      <WebView source={{ uri: params.uri}} />
    </View>
  );
};

export default LegalWebViewScreen;
