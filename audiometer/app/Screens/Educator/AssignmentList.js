import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';
import { Link, router, useLocalSearchParams } from "expo-router";
import { Card, Title, Paragraph } from 'react-native-paper';
import {
    DefaultTheme,
    Provider as PaperProvider,
    Button,
    Icon,
    ProgressBar,
} from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: "#EB455F",
        accent: "#f1c40f",
    },
};

const AssignmentList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignmentName, setAssignmentName] = useState('');

    const params = useLocalSearchParams();
    let CID = params.CID;
    let Count = params.Count;

    useEffect(() => {

        if (CID == null) {
            CID = '354598f9-2d73-4272-9cbc-3e27da8ec238';
        }

        const fetchData = async () => {
            const url = `${baseurl}/classrooms/${CID}/assignments/`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setAssignments(data);
                    setLoading(false);
                } else {
                    // Dummy Assignment
                    console.error('Failed to fetch Assignments:', response.status);
                    const dummyAssignment = {
                        AID: 'dummy-assignment-id',
                        AssignmentName: 'Dummy Assignment',
                        Deadline: '2023-12-31',

                        SubmittedCount: 10
                    };

                    setAssignments([dummyAssignment]);
                    setLoading(false);
                    console.error('Failed to fetch Assignments:', response.status);
                }
            }
            catch (error) {
                console.error('Error fetching Assignments:', error);
            }

            // try {
            //     const response = await fetch(url);
            //     if (response.ok) {
            //         const data = await response.json();
            //         setAssignments(data);
            //         setLoading(false);
            //     } else {
            //         // Dummy Assignment
            //         console.error('Failed to fetch Assignments:', response.status);
            //         const dummyAssignment = {
            //             AID: 'dummy-assignment-id',
            //             AssignmentName: 'Dummy Assignment',
            //             Deadline: '2023-12-31',
            //             ClassStrength: 30,
            //             SubmittedCount: 10,
            //             TotalStudents: 30,
            //         };

            //         setAssignments([dummyAssignment]);
            //         setLoading(false);
            //         console.error('Failed to fetch Assignments:', response.status);
            //     }
            // } catch (error) {
            //     console.error('Error fetching Assignments:', error);

            // }

            // Dummy Assignment
            // const dummyAssignment = {
            //     AID: 'dummy-assignment-id',
            //     AssignmentName: 'Dummy Assignment',
            //     Deadline: '2023-12-31',
            //     ClassStrength: 30,
            //     SubmittedCount: 10,
            //     TotalStudents: 30,
            // };

            // setAssignments([dummyAssignment]);
            // setLoading(false);

        };

        fetchData();
    }, []);

    const handleNewAssignment = async () => {
        // Handle button press for creating a new assignment
        //post request

        const url = `${baseurl}/assignments/`;
        const data = {
            AssignmentName: assignmentName,
            CID: CID,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New Assignment:', data);
                // data of SubmittedCount set to 0
                data['SubmittedCount'] = 0;
                setAssignments([...assignments, data]);
                setAssignmentName('');
            } else {
                console.error('Failed to create Assignment:', response.status);
            }
        } catch (error) {
            console.error('Error creating Assignment:', error);
        }
    };

    const renderAssignmentCard = ({ item }) => (

        <Card
            onPress={() => {
                router.push({ pathname: '/Screens/Educator/ClassResults', params: { id: 456, AID: item.AID, CID: CID } });
            }}>
            <Link style={styles.card}
                href={{
                    pathname: 'Screens/Educator/ClassResults',
                    params: { AID: item.AID }
                }}>
                <Card.Content>
                    <Title style={styles.cardTitle}>{item.AssignmentName}</Title>
                    <Paragraph style={styles.cardDate}>Deadline: {item.Deadline}</Paragraph>
                    <Paragraph style={styles.cardField}>Class Strength: {Count}</Paragraph>
                    <View style={styles.progressBarContainer}>
                        <Paragraph style={styles.cardField}>
                            Progress: {item.SubmittedCount}/{Count}
                        </Paragraph>
                        <View style={styles.progressBar}>
                            <View
                                style={{
                                    width: `${(item.SubmittedCount / Count) * 100}%`,
                                    height: 10,
                                    backgroundColor: '#0096FF',
                                    borderRadius: 5,
                                }}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Link>
        </Card>
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
        <PaperProvider theme={theme}>
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
                <Text style={styles.title}>Create New Assignment</Text>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Assignment Name"
                    placeholderTextColor="grey"
                    value={assignmentName}
                    onChangeText={setAssignmentName}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Deadline"
                    placeholderTextColor="grey"
                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // Handle button press for creating a new assignment
                        // You can navigate to a new screen or show a modal, etc.
                        console.log('Create New Assignment');
                        handleNewAssignment();
                    }}
                >
                    <Text style={styles.buttonText}>Create New Assignment</Text>
                </TouchableOpacity>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10
    },
    listContainer: {
        paddingHorizontal: 5,
        opacity: 0.9,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0096FF',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        marginBottom: 20,
        borderWidth: 1,
        padding: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDate: {
    },
    cardField: {
        marginTop: 5,
    },
    progressBarContainer: {
        marginTop: 5,
    },
    progressBar: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0096FF',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AssignmentList;
