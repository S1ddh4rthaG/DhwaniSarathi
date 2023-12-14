import React, { Component } from "react";
import { StyleSheet, Pressable, Text, View, Image, ImageBackground, Button, Alert, TouchableOpacity, TextInput } from "react-native";
import ClassroomList from "./ClassroomList";
export default function EducatorHome() {

    const profile = {
        name: "My Name",
        Age: 30,
        Gender: "Male",
        EducatorID: "123456789"
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>


                <ImageBackground source={require('../../assets/background.png')}
                    style={styles.backgroundImage} />
                <View style={[styles.content, { backgroundColor: 'white', opacity: '0.6' }]}>
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
                            source={require("../../assets/profile.png")}
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
                    flexDirection: 'row', alignItems: 'center',
                }}>


                    {/* create a new classroom on button click here*/}
                    <Text style={[styles.text, {
                        color: 'black', borderColor: 'black', borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20,
                        width: "80vw",
                        height: 80,
                        backgroundColor: "white",
                        textAlign: "center",
                    }]}>Create Classroom
                        <TouchableOpacity style={styles.btn} onPress={() => Alert.alert('Button pressed')}>
                            <Text style={styles.btnText}>+</Text>
                        </TouchableOpacity>
                    </Text>


                </View>
                <View style={{ width: '100%', backgroundColor: '#FFD700', height: 40, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 20 }}>Classrooms</Text>
                </View>


                <ClassroomList />

            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    header: {

        height: 300
    },

    headerContent: {
        padding: 30,
        alignItems: "center",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 10,
        float: "right"
    },
    location: {
        borderColor: "white",
        width: 10,
        height: 10,
        float: "left"
    },
    hamburger: {
        borderColor: "white",
        width: 10,
        height: 10,
        float: "right"
    },
    profileDataContainer: {
        flexDirection: 'row', // To display texts in a row
    },
    name: {
        fontSize: 22,
        color: "black",
        fontWeight: "600",

    },
    headtText: {

        color: "grey",
        fontWeight: "600",
        float: "left",
        marginLeft: 20,
        marginTop: 10
    },
    SubjectText: {
        color: "black",
        fontWeight: "500",
        fontSize: 16,

        float: "left",
        marginLeft: 20,
        marginTop: 10
    },
    userInfo: {
        fontSize: 20,
        color: "white",
        fontWeight: "600"
    },
    btn: {
        backgroundColor: "black",
        borderRadius: "100%",
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 6,
        elevation: 3,
        margin: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: "white",
        height: 500,
        alignItems: "center"
    },

    RectangleShapeView: {
        marginTop: 20,
        width: "80%",
        height: 80,
        backgroundColor: "white",
        color: "black",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        elevation: 3
    },
    backgroundImage: {
        flex: 1,
        height: 300,
        width: 100 + "%",
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

});
