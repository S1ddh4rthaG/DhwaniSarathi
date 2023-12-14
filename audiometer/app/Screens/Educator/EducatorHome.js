import React, { Component } from "react";
import { StyleSheet, Pressable, Text, View, Image, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import image from "../../assets/background.png";
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
                <View style={[styles.content, { backgroundColor: 'white', opacity: '0.8' }]}>
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
                        <Text style={styles.text}>{profile.Age} years</Text>
                        <Text style={styles.text}>{profile.Gender}</Text>
                        <Text style={styles.text}>ID: {profile.EducatorID}</Text>
                    </View>

                </View>
            </View>

            <View style={styles.body}>

                <Pressable style={styles.RectangleShapeView}>
                    <Text style={styles.headtText}>Date</Text>
                    <Text style={styles.SubjectText}>30 Sept, 2022 </Text>
                </Pressable>
                <View styles={{
                    flexDirection: 'row', display: "flex",
                    flex: 1,
                }}>
                    <Text style={[styles.text, { color: 'black' }]}>Create New Classroom</Text>
                    <Pressable style={[styles.btn, { borderRadius: "100%" }]}>
                        <Text style={{ color: 'white', alignContent: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 'bold' }}>+</Text>
                    </Pressable>
                </View>
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
        fontFamily: "Helvetica"
    },
    headtText: {
        fontFamily: "Helvetica",
        color: "grey",
        fontWeight: "600",
        float: "left",
        marginLeft: 20,
        marginTop: 10
    },
    SubjectText: {
        color: "black",
        fontWeight: "550",
        fontSize: 16,
        fontFamily: "Helvetica",
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
        backgroundColor: "#3B525F",
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 6,
        elevation: 3
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
    heading: {
        fontWeight: 'bold',
        marginTop: 20,
    },

});
