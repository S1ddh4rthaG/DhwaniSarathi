import React ,{useState}from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import './locales/i18n'; 
import {useTranslation} from 'react-i18next'; 
import {Image} from 'react-native'
const FillDetails = ({navigation}) => {
    const [name, setName] = useState('');
    const [age, setAge]= useState(''); 
    const [rollNumber, setRollNumber]= useState(''); 
    const [classroomCode, setClassroomCode]=useState(''); 
    const handleNameChange = (inputText) => {
        setName(inputText);
    };
    const handleAgeChange = (inputText) => {
        setAge(inputText);
    };
    const handleRollNumberChange = (inputText) => {
        setRollNumber(inputText);
    };
    const handleClassroomCodeChange = (inputText) => {
        setClassroomCode(inputText);
    };
    const {t,i18n} =useTranslation(); 
    // const [currentLanguage, setLanguage] = useState('en'); 
    // const changeLanguage= value=>{
    //   i18n.changeLanguage(value)
    //   .then(()=>setLanguage(value))
    //   .catch(err => console.log(err)); 
    // }

    const handleStartTest = () => {
      //TODO: IF student store the details
      navigation.navigate('BeforeTest1');
    }
    
  return (
    <View style={styles.container}>
            <Text style={styles.title}>{t('Fill Your Details')}</Text>

            <Text style={styles.title2}>{t('For Students')}</Text>
            <Image style={styles.image} source={require('../assets/student.png')} resizeMode='cover' />
            <Text style={styles.title2}>{t('Student Roll Number')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Enter your roll number')}
                onChangeText={handleRollNumberChange}
                value={rollNumber}
                textAlign="left"  // Set text alignment to left
                color="black"
                placeholderTextColor='black'
            />

            <Text style={styles.title2}>{t('Classroom Code')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Code provided by your teacher/educator')}
                onChangeText={handleClassroomCodeChange}
                value={classroomCode}
                textAlign="left"  // Set text alignment to left
                color="black"
                placeholderTextColor="black"
            />

            <TouchableOpacity style={styles.Button} onPress={handleStartTest}>
                <Text style={styles.buttonText}>{t('Start Test')}</Text>
            </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5B6BA',
    padding: 20,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 10
  },
  sliderContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  sliderLabel: {
    fontSize: 15,
    color: 'white',
  },
  sliderLabel1: {
    fontSize: 15,
    color: 'red',
  },
  slider: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  title2: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 10,
    textAlign: 'left',
  },
  Button: {
    backgroundColor: '#0096FF', // Greenish Yellow
    marginTop: 'auto', // Push the button to the bottom
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    borderColor: 'white',
    borderWidth: 3,
  },
  educatorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  educatorText: {
    color: 'white',
    marginBottom: 10,
  },
  educatorButton: {
    backgroundColor: '#0096FF', // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: 'white',
    fontStyle: 'normal',
  },
});
export default FillDetails;
