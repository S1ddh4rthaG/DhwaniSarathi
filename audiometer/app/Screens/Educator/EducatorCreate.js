import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ImageBackground, Pressable, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import ClassroomList from '../../Components/ClassroomList.js';
import { ScrollView } from 'react-native-virtualized-view';
import { Link, router, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { baseurl } from '../../Constants/ip.js';


export default function EducatorCreate() {

    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [classroomName, onChangeName] = useState('');
    const [classroomStrength, onChangeStrength] = useState('');

    let EID = params.EID;

    const handleCreateClassroom = async () => {
        const url = `${baseurl}/classrooms/`;
        const data = {
            "ClassroomName": classroomName,
            "Count": classroomStrength,
            "EID": EID
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                Alert.alert('Classroom created successfully');
                setLoading(false);

                alert("Classroom created successfully");

                router.push({ pathname: '/Screens/Educator/EducatorHome', params: { EID: EID } });

            } else {
                console.error("Failed to create classroom:", response.status);
            }
        } catch (error) {
            console.error("Error creating classroom:", error);
        }
    }

    return (
        (loading == true) ? (<Text>Loading...</Text>) :
            (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    
                        <View style={styles.container2}>
                            <View style={styles.header}>
                                <View style={[styles.content, { backgroundColor: '#eb455f', opacity: 1 }]}>
                                    <Text style={[styles.text, styles.heading, { color: 'white', padding: 2 }]}>Educator Profile Page</Text>
                                </View>
                                <ImageBackground source={require('../../assets/background.png')}
                                    style={styles.backgroundImage} >
                                    <View style={styles.headerContent}>
                                        <View>
                                            <Image
                                                style={styles.avatar}
                                                source={require('../../assets/profile.png')}
                                            />
                                        </View>
                                        <View style={{ flex: 1, flexWrap: 'wrap-reverse' }}>
                                            <Text style={styles.name}>Welcome</Text>
                                        </View>

                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.body}>
                                <View style={{ width: "100%", }}>
                                    <View style={{
                                        width: '90%',  // To align the avatar and texts horizontally,
                                        padding: 0,
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        marginHorizontal: 25,
                                        padding: 5,
                                        paddingVertical: 15,
                                        borderRadius: 10,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, marginBottom: 13 }}>Create Classroom</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Classroom Name'
                                            onChangeText={(text) => onChangeName(text)}
                                            value={classroomName}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder='Classroom Strength'
                                            onChangeText={(text) => onChangeStrength(text)}
                                            value={classroomStrength}
                                        />
                                        <TouchableOpacity style={styles.btn} onPress={() => handleCreateClassroom()}>
                                            <Text style={styles.btnText}>Create Classroom</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                   
                </TouchableWithoutFeedback>
            )
    );

}

const styles = StyleSheet.create({
    header: {
        height: 250,
        backgroundColor: '#2b3467',
        flex: 1,
        justifyContent: 'center',

    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
        display: 'flex', // To align the avatar and texts horizontally,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginRight: 30,
        marginTop: 20,


    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 10,
        marginLeft: 30,
    },
    location: {
        borderColor: 'white',
        width: 10,
        height: 10,
    },
    hamburger: {
        borderColor: 'white',
        width: 10,
        height: 10,
    },
    profileDataContainer: {
        flexDirection: 'row', // To display texts in a row
    },
    name: {
        fontSize: 22,
        color: '#bad7e9',
        fontWeight: 'bold',
    },
    headtText: {
        color: 'grey',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 16,
        padding: 2
    },
    SubjectText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10
    },
    userInfo: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#eb455f',
        borderRadius: 10,
        width: '80%',
        borderColor: '#bad7e9', borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    body: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
    },

    RectangleShapeView: {
        marginTop: 20,
        width: '60%',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        elevation: 3,
        padding: 10,
        paddingTop: 1,
        margin: "auto"
    },
    backgroundImage: {
        flex: 1,
        height: 200,
        width: 100 + '%',
        resizeMode: 'cover',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: 'black',
        margin: 10,
    },
    ptext: {
        fontSize: 16,
        color: 'white',
        margin: 10,
    },
    heading: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 3,
        width: "80%",
        borderRadius: 10,
        borderColor: 'grey',
        color: 'grey',
        textAlign: 'center',

    },
});

