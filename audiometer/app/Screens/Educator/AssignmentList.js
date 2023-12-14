import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';

const AssignmentList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const CID = '354598f9-2d73-4272-9cbc-3e27da8ec238';
            const url = `${baseurl}/classrooms/${CID}/assignments/`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setAssignments(data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch Assignments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching Assignments:', error);
            }
        };

        fetchData();
    }, []);

    const renderAssignmentCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>{item.AssignmentName}</Text>
            <Text style={styles.cardDate}>Deadline: {item.Deadline}</Text>
        </TouchableOpacity>
    );

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        return item.AssignmentName.toLowerCase().includes(query);
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
            <Text style={styles.title}>Assignments</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="grey"
            />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={assignments.filter(searchFilter)}
                renderItem={renderAssignmentCard}
                keyExtractor={(item) => item.AID}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10
    },
    listContainer: {
        paddingHorizontal: 5,
        opacity: 0.9,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0096FF',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    card: {
        flex: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#0096FF',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    cardDate: {
        color: 'white',
    },
});

export default AssignmentList;
