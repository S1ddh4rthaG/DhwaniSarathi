import React ,{useState}from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';


  
const FillDetails = () => {
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
    
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Your Details</Text>
      <Text style={styles.subtitle}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={handleNameChange}
        value={name}
        textAlign="left"  // Set text alignment to left
        color="white"
        placeholderTextColor="grey"
    
      />

    <Text style={styles.subtitle}>Age</Text>
    <TextInput
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={handleAgeChange}
        value={age}
        textAlign="left"  // Set text alignment to left
        color="white"
        placeholderTextColor="grey"
    />


    <Text style={styles.title2}>For Students </Text>
    <Text style={styles.subtitle}>Student Roll Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your roll number"
        onChangeText={handleRollNumberChange}
        value={rollNumber}
        textAlign="left"  // Set text alignment to left
        color="white"
        placeholderTextColor="grey"
      />


    <Text style={styles.subtitle}>Classroom Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Code provided by your teacher/educator"
        onChangeText={handleClassroomCodeChange}
        value={classroomCode}
        textAlign="left"  // Set text alignment to left
        color="white"
        placeholderTextColor="grey"
      />

    <TouchableOpacity style={styles.Button}>
        <Text style={styles.buttonText}>Start Test</Text>
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
