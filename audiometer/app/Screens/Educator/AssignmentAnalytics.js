import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';
import { Link, router, useLocalSearchParams } from "expo-router";

import { VictoryChart, VictoryPie, VictoryTooltip, VictoryLabel } from "victory-native";
import { ScrollView } from 'react-native-gesture-handler';

const AssignmentAnalytics = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignmentResults, setAssignmentResults] = useState([]);
    const [listUserCard, setListUserCard] = useState([]);

    const params = useLocalSearchParams();
    console.log(params);
    let AID = params.AID;

    useEffect(() => {
        const url = `${baseurl}/assignments/${AID}/userassignmentresults/`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setAssignmentResults(data);
                    
                    card_details = {}


                    setLoading(false);
                } else {
                    console.error('Failed to fetch Assignments here', response.status);
                }
            } catch (error) {
                console.error('Error fetching Assignments:', error);
            }
        };

        fetchData();
    }, []);

    const hearingCategories = {
        'Normal': [-10, 19],
        'Mild': [20, 34],
        'Moderate': [35, 59],
        'Severe': [60, 79],
        'Profound': [80, Infinity],
    };

    const getCategory = (pta) => {
        for (const [category, range] of Object.entries(hearingCategories)) {
            const [min, max] = range;
            if (pta >= min && pta <= max) {
                return category;
            }
        }
    };



    const data3 = Object.keys(hearingCategories).map(category => ({
        x: category,
        y: 0
    }));

    const data2 = [
        {
            "UID": "1",
            "UserName": "Swami",
            "Age": "10",
            "Gender": "Male",
            "Deadline": "2021-08-01"
        },
        {
            "UID": "2",
            "UserName": "Aadi",
            "Age": "14",
            "Gender": "Male",
            "Deadline": "2021-08-02"
        },
        {
            "UID": "3",
            "UserName": "Aaradhya",
            "Age": "15",
            "Gender": "Female",
            "Deadline": "2021-08-03"
        },
        {
            "UID": "4",
            "UserName": "Arjun",
            "Age": "12",
            "Gender": "Male",
            "Deadline": "2021-08-04"
        },
    ];


    assignmentResults.forEach(entry => {
        const ptaLeft = entry.Results.pta_left;
        const ptaRight = entry.Results.pta_right;
        const maxPta = Math.max(ptaLeft, ptaRight);
        const category = getCategory(maxPta);

        const existingCategory = data3.find(item => item.x === category);
        if (existingCategory) {
            existingCategory.y += 1;
        }
    });

    console.log(data3);

    // const data3 = backendData.reduce((acc, entry) => {
    //     const ptaLeft = entry.Results.pta_left;
    //     const ptaRight = entry.Results.pta_right;
    //     const maxPta = Math.max(ptaLeft, ptaRight);
    //     const category = getCategory(maxPta);

    //     const existingCategory = acc.find((item) => item.x === category);

    //     if (existingCategory) {
    //         existingCategory.y += 1;
    //     } else {
    //         acc.push({ x: category, y: 1 });
    //     }

    //     return acc;
    // }, []);

    useEffect(() => {

        if (AID == null) {
            AID = '354598f9-2d73-4272-9cbc-3e27da8ec238';
        }


        const fetchData = async () => {
            const url = `${baseurl}/assignments/${AID}/`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    // setAssignments(data);
                    setAssignments(data2);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch Assignments here', response.status);
                }
            } catch (error) {
                console.error('Error fetching Assignments:', error);
            }
        };

        fetchData();
    }, []);

    const renderAssignmentCard = ({ item }) => (
        // <Link style={styles.card}
        //     href={{
        //         pathname: 'Screens/Results',
        //         params: { CID: item.CID }
        //     }}
        // >
        console.log("item", item),
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                router.push('Screens/Results', { CID: item.CID });
            }}
        >
            <Text style={styles.cardTitle}>{item.UserName}</Text>
            <Text style={styles.cardDate}>Age: {item.Age}</Text>
            <Text style={styles.cardDate}>Gender: {item.Gender}</Text>
            <Text style={styles.cardMore}>More Details</Text>
        </TouchableOpacity>
        // </Link>
    );

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        return item.UserName.toLowerCase().includes(query);
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0096FF" />
            </View>
        );
    }

    const getTotalStudents = () => data3.reduce((total, d) => total + d.y, 0);

    const totalStudents = getTotalStudents();

    const hearingCategoryColors = {
        'Normal': '#00FF00',    // Green
        'Mild': '#FFFF00',      // Yellow
        'Moderate': '#FFA500',  // Orange
        'Severe': 'red',    // Red
        'Profound': '#800080',  // Purple
    };

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Assignments Analytics</Text>
           
            <FlatList
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View style={styles.chartContainer}>
                        <VictoryPie
                            height={300}
                            data={data3}
                            outerRadius={120}
                            innerRadius={60}
                            colorScale={Object.values(hearingCategoryColors)}
                            style={{ labels: { fill: 'white', fontSize: 16, fontWeight: 'bold' } }}
                        />
                        {data3.map((point) => (
                            <VictoryLabel
                                key={point.x}
                                textAnchor="middle"
                                style={{ fontSize: 14, color: 'white' }}
                                x={175}
                                y={175 + 25} // Adjust based on the chart size
                                text={`${point.x}\n10(${((point.y / totalStudents) * 100).toFixed(2)}%)`}
                            />
                        ))}
                    </View>
                }
                data={assignments.filter(searchFilter)}
                renderItem={renderAssignmentCard}
                keyExtractor={(item) => item.UID}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 40,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10
    },
    listContainer: {
        paddingHorizontal: 5,
        opacity: 0.9,
    },
    chartContainer: {
        alignItems: 'center',
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
        backgroundColor: 'green',
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
    cardMore: {
        color: '#0096FF',
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default AssignmentAnalytics;
