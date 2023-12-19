import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';
import { Link, router, useLocalSearchParams } from "expo-router";
import { VictoryChart, VictoryPie, VictoryTooltip, VictoryLabel } from "victory-native";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';


const AssignmentAnalytics = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [assignmentResults, setAssignmentResults] = useState([]);
    const [listUserCard, setListUserCard] = useState([]);

    const params = useLocalSearchParams();
    let AID = params.AID;

    useEffect(() => {
        const url = `${baseurl}/assignments/${AID}/userassignmentresults/`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                  
                    setAssignmentResults(data);
                    
                    let card_details = []

                    data.forEach(element => {
                        let current_details = element["UserDetails"];
                        current_details["Results"] = element["Results"];
                        card_details.push(current_details);
                    });

                    console.log(card_details[3]["Results"]["info"]);
                    setListUserCard(card_details);
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

    // Remove categories with no data
    const filterData = data3.filter(
        (item) => item.y !== 0
    );

    const renderAssignmentCard = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: hearingCategoryColors[getCategory(Math.max(item.Results.pta_left, item.Results.pta_right))] }]}
            onPress={() => {
                router.push({pathname:'Screens/Results', params: {results: JSON.stringify(item["Results"]["info"]) }});
            }}
        >
            <Text style={styles.cardTitle}>{item.UserName}</Text>
            <Text style={styles.cardDate}>Age: {item.Age}</Text>
            <Text style={styles.cardDate}>Gender: {item.Gender}</Text>
            <Text style={styles.cardMore}>More Details</Text>
        </TouchableOpacity>
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

    const colorScale = filterData.map((point) => hearingCategoryColors[point.x]);

    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Assignments Analytics</Text>
           
            <FlatList
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View style={styles.chartContainer}>
                        <VictoryPie
                            height={300}
                            data={filterData}
                            outerRadius={120}
                            innerRadius={60}
                            colorScale= {colorScale}
                            style={{ labels: { fill: 'white', fontSize: 16, fontWeight: 'bold' } }}
                        />
                        {filterData.map((point) => (
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
                data={listUserCard.filter(searchFilter)}
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
