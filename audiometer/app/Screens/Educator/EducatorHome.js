import React from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ImageBackground, Pressable, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import ClassroomList from './ClassroomList';
import { ScrollView } from 'react-native-virtualized-view';

export default function EducatorHome() {

    const profile = {
        name: 'My Name',
        Age: 30,
        Gender: 'Male',
        EducatorID: '123456789'
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.container2}>
                    <View style={styles.header}>

                        <ImageBackground source={require('../../assets/background.png')}
                            style={styles.backgroundImage} />
                        <View style={[styles.content, { backgroundColor: 'white', opacity: 0.6 }]}>
                            <Text style={[styles.text, styles.heading]}>Educator Profile Page</Text>
                        </View>

                        <View style={styles.headerContent}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name}>Welcome</Text>
                                <Text style={styles.userInfo}>{profile.name}</Text>

                            </View>
                            <View>
                                <Image
                                    style={styles.avatar}
                                    source={require('../../assets/profile.png')}
                                />
                            </View>
                        </View>

                        <View style={styles.content}>

                            <View style={styles.profileDataContainer}>
                                <Text style={styles.ptext}>{profile.Age} years</Text>
                                <Text style={styles.ptext}>{profile.Gender}</Text>
                                <Text style={styles.ptext}>ID: {profile.EducatorID}</Text>
                            </View>

                        </View>


                    </View>

                    <View style={styles.body}>

                        <Pressable style={styles.RectangleShapeView}>
                            <Text style={styles.headtText}>Date</Text>
                            <Text style={styles.SubjectText}>30 Sept, 2022 </Text>
                        </Pressable>
                        <View styles={{
                            flexDirection: 'row', alignItems: 'center', margin: 0, padding: 0
                        }}>


                            {/* create a new classroom on button click here*/}

                            <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Button pressed')}>
                                <Text style={styles.btnText}>Create Classroom</Text>
                            </TouchableOpacity>



                        </View>
                        <View style={{ width: '100%', backgroundColor: '#FFD700', height: 40, justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 20 }}>Classrooms</Text>
                        </View>

                        <ClassroomList />

                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    header: {
        height: 300
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 10,
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
        color: 'black',
        fontWeight: 'bold',
    },
    headtText: {
        color: 'grey',
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10
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
        backgroundColor: 'black',
        borderRadius: 10,
        width: '80%',
        margin: 10,
        borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20,
        height: 80,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center'
    },

    RectangleShapeView: {
        marginTop: 20,
        width: '80%',
        height: 80,
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        elevation: 3
    },
    backgroundImage: {
        flex: 1,
        height: 300,
        width: 100 + '%',
        resizeMode: 'cover', // You can adjust the resizeMode as needed
        // Other background styles if required
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
});
