import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

const TutorialScreen = ({ title, description, image }) => (
  <View style={styles.screenContainer}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const UserTutorial = () => {
  const tutorialData = [
    {
      title: 'Step 1',
      description: 'Enter your classroom code (optional) and click on self test button',
      image: require('../assets/tutorials/homenew.jpeg'),
    },
    {
      title: 'Step 2',
      description: 'Make sure you follow the instructions before you start the test',
      image: require('../assets/tutorials/beforetests.jpeg'),
    },
    {
      title: 'Step 3',
      description: 'Check your surrounding sounds',
      image: require('../assets/tutorials/checkyousurrounding.jpeg'),
    },
    {
      title: 'Step 4',
      description: 'Its time to start the Test',
      image: require('../assets/tutorials/pureToneAudiometry.jpeg'),
    },
   
    {
      title: 'Step 5',
      description: 'Follow the instructions and click yes and no based on the sound audible',
      image: require('../assets/tutorials/TestPage.jpeg'),
    },

    {
      title: 'Step 6',
      description: 'Result page consists of a audiogram and other details',
      image: require('../assets/tutorials/Results.jpeg'),
    }

    ,
    {
      title: 'Step 7',
      description: 'You can export your results and share it in different methods',
      image: require('../assets/tutorials/Export.jpeg'),
    }

    // Add more steps as needed
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>User Tutorial</Text>
      <ScrollView horizontal style={styles.scrollView}>
        {tutorialData.map((step, index) => (
          <TutorialScreen
            key={index}
            title={step.title}
            description={step.description}
            image={step.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  description: {
    textAlign: 'center',
    marginHorizontal: 32,
    width: '90%',
    justifyContent: 'space-between',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default UserTutorial;
