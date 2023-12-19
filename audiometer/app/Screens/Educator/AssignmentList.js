import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';
import { Link, router, useLocalSearchParams } from "expo-router";

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
        <Link style={styles.card}
            href={{
                pathname: 'Screens/Educator/AssignmentAnalytics',
                params: { AID: item.AID }
            }}
        >
            {/* <TouchableOpacity onPress={()=>{
                router.push({pathname: '/Screens/Educator/ClassResults', params: {id: 456, AID: item.AID, CID: CID}}); 
            }}> */}


            <Text style={styles.cardTitle}>{item.AssignmentName}</Text>
            <Text style={styles.cardDate}>Deadline: {item.Deadline}</Text>
            <Text style={styles.cardField}>Class Strength: {Count}</Text>
            <View style={styles.progressBarContainer}>
                <Text style={styles.cardField}>
                    Progress: {item.SubmittedCount}/{Count}
                </Text>
                <View style={styles.progressBar}>
                    <View
                        style={{
                            width: `${(item.SubmittedCount / Count) * 100}%`,
                            height: 10,
                            backgroundColor: '#2b3467',
                            borderRadius: 5,
                        }}
                    />
                </View>
            </View>


            {/* </TouchableOpacity> */}
        </Link>
    );

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        return item.AssignmentName.toLowerCase().includes(query);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#eb455f" />
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
                style={[styles.button, { width: 80 + '%', alignSelf: 'center', margin: 5, borderRadius: 5 }]}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
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
        backgroundColor: '#eb455f',
        height: 40,
        textAlign: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#eb455f',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
        width: 90 + '%',
        alignSelf: 'center',
    },
    card: {
        flex: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#eb455f',
        backgroundColor: 'white',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#eb455f',
    },
    cardDate: {
        color: 'black',
    },
    cardField: {
        color: 'black',
        marginTop: 5,
    },
    progressBarContainer: {
        marginTop: 5,
    },
    progressBar: {
        backgroundColor: '#bad7e9',
        borderRadius: 5,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#2b3467',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default AssignmentList;
