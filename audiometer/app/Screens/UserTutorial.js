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
      description: 'Ensure a quiet environment',
      image: require('../assets/tutorialNew/Make_sure.png'),
    },
    {
      title: 'Step 2',
      description: 'Check for any background noise',
      image: require('../assets/tutorialNew/Surrounding_Check.png'),
    },
    {
      title: 'Step 3',
      description: 'Click on the start test button',
      image: require('../assets/tutorialNew/Start_test.png'),
    },
    {
      title: 'Step 4',
      description: 'Audio test starts',
      image: require('../assets/tutorialNew/Test.png'),
    },

    {
      title: 'Step 5',
      description: 'Result page',
      image: require('../assets/tutorialNew/Result_user.png'),
    },

    {
      title: 'Step 6',
      description: 'Export results',
      image: require('../assets/tutorialNew/Share_page.png'),
    }

    ,
    {
      title: 'Step 7',
      description: 'Select export option',
      image: require('../assets/tutorialNew/Share_selection.png'),
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
    color: 'white',
    backgroundColor: '#eb455f',
    padding: 10,
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
