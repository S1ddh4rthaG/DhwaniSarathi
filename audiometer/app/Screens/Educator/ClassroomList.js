import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from "../../Constants/ip.js";

const ClassroomList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const EID = 124; // Get EID from AsyncStorage or any source

            const url = `${baseurl}/educators/${EID}/classrooms/`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setClassrooms(data);
                    setLoading(false);
                } else {
                    console.error("Failed to fetch Classrooms:", response.status);
                }
            } catch (error) {
                console.error("Error fetching Classrooms:", error);
            }
        };

        fetchData();
    }, []);

    const renderClassroomCard = ({ item }) => (
        <View style={[styles.card, { backgroundColor: "#ffdcb2" }]}>
            <Text style={styles.cardTitle}>{item.ClassroomName}</Text>
            {/* Add more relevant data based on your response */}
            <Text style={styles.cardCode}>Classroom ID: {item.CID}</Text>
            <Text style={styles.cardCode}>Educator ID: {item.EID}</Text>
            {/* Add more data as needed */}
        </View>
    );

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        return item.ClassroomName.toLowerCase().includes(query);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0096FF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="black"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={classrooms.filter(searchFilter)}
                renderItem={renderClassroomCard}
                keyExtractor={(item) => item.CID}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#B5B6BA',
        justifyContent: 'center',

        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 10,

    },
    listContainer: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
        margin: 10,
    },
    card: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    cardCode: {
        fontSize: 18,
        paddingVertical: 5,
    },
    cardDates: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    cardDate: {
        color: 'black',
    },
    cardContent: {
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    attendeesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    attendeeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: -10,
        borderWidth: 0.5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        marginTop: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,

        borderWidth: 1,
    },
    backgroundImage: {
        flex: 1,
        height: 50,
        width: 100 + "%",
        resizeMode: 'cover', // You can adjust the resizeMode as needed
        // Other background styles if required
    },
});

export default ClassroomList;
