import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, Card } from 'react-native-paper';
// import './locales/i18n'; 
import { useTranslation } from 'react-i18next';

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

const UDCard = (props) => {
  const { t, i18n } = useTranslation();
  //  One state variable for each of the following
  // - Self test or Class test
  // - Timestamp
  // - Name (either self or educator)
  // - View Results button
  const [selfTest, setSelfTest] = useState(props.selfTest || true);
  const [timestamp, setTimestamp] = useState(props.timestamp || Date.now());
  const [name, setName] = useState(props.name || 'John Doe');
  const [viewResults, setViewResults] = useState(props.viewResults || 'View Results');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignContent: 'center',
      color: '#fff',
      margin: "auto",
      backgroundColor: { selfTest } ? '#EB455F' : '#00BFFF',
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderWidth: 2,
      borderRadius: 100,
    },
    timestamp: {
      justifyContent: 'center',
      alignContent: 'center',
      margin: "auto",
    },
    name: {
      margin: "auto",
    },
    button: {
      alignItems: 'center',
      margin: "auto",
      padding: 2,
    },
  });

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Card style={{ margin: 10, padding: 5 }}>
          <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>
            <Text style={styles.title}
            >{
                selfTest ? t('S') : t('C')
              }</Text>
            <Text style={styles.timestamp}>{timestamp}</Text>
            <Text style={styles.name}>{name}</Text>
            <Button style={styles.button} mode="contained" onPress={() => router.push(viewResults)}>
              <Text>

                {t('View Results')}
              </Text>
            </Button>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

export default UDCard;