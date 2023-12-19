import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ImageBackground, Pressable, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import ClassroomList from '../../Components/ClassroomList.js';
import { ScrollView } from 'react-native-virtualized-view';
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from 'react';
import { baseurl } from '../../Constants/ip.js';


export default function EducatorHome() {

    const params = useLocalSearchParams();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [classroomName, onChangeName] = React.useState('Enter Classroom Name');


    useEffect(() => {
        //get the profile data from the backend
        const fetchData = async () => {
            var EID;
            if (params.EID) {

                EID = params.EID;
            }
            const url = `${baseurl}/educators/${EID}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setProfile(data);
                    setLoading(false);
                } else {
                    console.error("Failed to fetch Profile:", response.status);
                }
            } catch (error) {
                console.error("Error fetching Profile:", error);
            }
        };
        fetchData();

        // Function to get the current date
        const fetchCurrentDate = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Month is zero-indexed
            const day = date.getDate();

            const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
            setCurrentDate(formattedDate);
        };

        fetchCurrentDate(); // Fetch the date when the component mounts

    }, []);


    //  const sampleProfile =
    //     {
    //         "EID": "124",
    //         "EducatorName": "Sachin",
    //         "InstituteName": "IIT Tirupati"
    //     }


    return (
        (loading == true) ? (<Text>Loading...</Text>) :

            (<KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView style={styles.container2}>
                        <View style={styles.header}>
                            <View style={[styles.content, { backgroundColor: '#eb455f', opacity: 1 }]}>
                                <Text style={[styles.text, styles.heading, { color: 'white' }]}>Educator Profile Page</Text>
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
                                        <Text style={styles.userInfo}>{profile.EducatorName}</Text>
                                        <Text style={styles.userInfo}>{profile.InstituteName}</Text>
                                    </View>

                                </View>
                            </ImageBackground>


                            {/* <View style={styles.content}>

                            <View style={styles.profileDataContainer}>
                                <Text style={styles.ptext}>{profile.Age} years</Text>
                                <Text style={styles.ptext}>{profile.Gender}</Text>
                                <Text style={styles.ptext}>ID: {profile.EducatorID}</Text>
                            </View>

                        </View> */}


                        </View>

                        <View style={styles.body}>

                            <Pressable style={styles.RectangleShapeView}>
                                <Text style={styles.headtText}>Date: {currentDate}</Text>
                            </Pressable>
                            <View styles={{
                                flexDirection: 'row', alignItems: 'center', margin: 0, padding: 0
                            }}>

                                <View style={{
                                    width: '100%',  // To align the avatar and texts horizontally,
                                    margin: 10,
                                    padding: 0,
                                    flexDirection: 'row',

                                }}>
                                    {/* create a new classroom on button click here*/}
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeName}
                                        value={classroomName}
                                    />
                                    <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Button pressed')}>
                                        <Text style={styles.btnText}>Create Classroom</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                            <View style={{ width: '100%', backgroundColor: '#2b3467', height: 50, justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Classrooms</Text>
                            </View>

                            <ClassroomList EID={profile.EID} />

                        </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>)
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
        width: '40%',

        borderColor: '#bad7e9', borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20,

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
        alignItems: 'center'
    },

    RectangleShapeView: {
        marginTop: 20,
        width: '60%',
        height: 40,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        elevation: 3
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
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: 'grey',
        color: 'grey',
        textAlign: 'center',

    },
});

