import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, Button, Card } from 'react-native-paper';
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
  const { t } = useTranslation();

  const [selfTest] = useState(props.selfTest && true);
  const [timestamp] = useState(props.timestamp || Date.now());
  const [name] = useState(props.name || 'John Doe');
  const [viewResults] = useState(props.viewResults || 'View Results');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      margin: 10,
      padding: 10,
      width: 300, // Adjust the width as needed
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: selfTest ? '#EB455F' : '#00BFFF',
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderWidth: 2,
      borderRadius: 100,
    },
    text: {
      marginHorizontal: 10,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    button: {
      margin: 5,
      alignSelf: 'flex-end',
    },
  });

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.contentContainer}>
              <View style={styles.rowContainer}>
                <Text style={styles.title}>{selfTest ? t('S') : t('C')}</Text>
                <Text style={styles.text}>{timestamp}</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.text}>{name}</Text>
                <Button style={styles.button} mode="contained" onPress={() =>router.push({pathname: '/Screens/Results', params: {results:viewResults}})}>
                  {t('View Results')}
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
};

export default UDCard;
