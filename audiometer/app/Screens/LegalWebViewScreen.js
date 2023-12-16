import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import router, { useLocalSearchParams } from 'expo-router'; 
const LegalWebViewScreen = ({ route }) => {
  const params = useLocalSearchParams;
  const {board}= params; 
  console.log(board); 
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: board.websiteUrl}} />
    </View>
  );
};

export default LegalWebViewScreen;
