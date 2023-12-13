import React ,{useState}from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

// import './locales/i18n'; 
import {useTranslation} from 'react-i18next'; 
  
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
      navigation.navigate('BeforeYouStart');
    }
    
  return (
    <View style={styles.container}>
            <Text style={styles.title}>{t('Fill Your Details')}</Text>
            {/* <Text style={styles.subtitle}>{t('Name')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Enter your name')}
                onChangeText={handleNameChange}
                value={name}
                textAlign="left"  // Set text alignment to left
                color="white"
                placeholderTextColor="grey"
            />

            <Text style={styles.subtitle}>{t('Age')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Enter your age')}
                onChangeText={handleAgeChange}
                value={age}
                textAlign="left"  // Set text alignment to left
                color="white"
                placeholderTextColor="grey"
            /> */}

            <Text style={styles.title2}>{t('For Students')}</Text>
            <Text style={styles.subtitle}>{t('Student Roll Number')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Enter your roll number')}
                onChangeText={handleRollNumberChange}
                value={rollNumber}
                textAlign="left"  // Set text alignment to left
                color="white"
                placeholderTextColor="grey"
            />

            <Text style={styles.subtitle}>{t('Classroom Code')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('Code provided by your teacher/educator')}
                onChangeText={handleClassroomCodeChange}
                value={classroomCode}
                textAlign="left"  // Set text alignment to left
                color="white"
                placeholderTextColor="grey"
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
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'flex-start',
    
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 40, 
    textAlign: "center"
  },
  title2: {
    fontSize : 20, 
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: "left", 
    marginTop: 30,
  }, 
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: "left",
  },
  Button: {
    backgroundColor: 'blue', // Greenish Yellow
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 80,
    width: '100%'
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
    backgroundColor: '#D4AF37', // Greenish Yellow
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    
  },

  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: 'white',
    fontStyle: 'italic'
    
  },
});

export default FillDetails;
