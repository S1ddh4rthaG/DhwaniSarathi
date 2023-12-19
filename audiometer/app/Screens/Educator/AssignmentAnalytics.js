import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { baseurl } from '../../Constants/ip.js';
import { Link, router, useLocalSearchParams } from "expo-router";
import { VictoryChart, VictoryPie, VictoryTooltip, VictoryLabel } from "victory-native";


const AssignmentAnalytics = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [assignmentResults, setAssignmentResults] = useState([]);
    const [listUserCard, setListUserCard] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
                router.push({ pathname: 'Screens/Results', params: { results: JSON.stringify(item["Results"]["info"]) } });
            }}
        >
            <Text style={styles.cardTitle}>{item.UserName}</Text>
            <Text style={styles.cardDate}>Age: {item.Age}</Text>
            <Text style={styles.cardDate}>Gender: {item.Gender}</Text>
            <Text style={styles.cardMore}>More Details</Text>
        </TouchableOpacity>
    );

    // const searchFilter = (item) => {
    //     const query = searchQuery.toLowerCase();
    //     return item.UserName.toLowerCase().includes(query);
    // };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#eb455f" />
            </View>
        );
    }

    const getTotalStudents = () => data3.reduce((total, d) => total + d.y, 0);

    const totalStudents = getTotalStudents();

    const hearingCategoryColors = {
        'Normal': '#00FF00',    // Green
        'Mild': '#ffbf00',      // Yellow
        'Moderate': '#FFA500',  // Orange
        'Severe': '#d22b2b',    // Red
        'Profound': '#800080',  // Purple
    };

    const colorScale = filterData.map((point) => hearingCategoryColors[point.x]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        const categoryMatch = selectedCategory ? getCategory(Math.max(item.Results.pta_left, item.Results.pta_right)) === selectedCategory : true;
        return item.UserName.toLowerCase().includes(query) && categoryMatch;
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Assignments Analytics</Text>


            <View style={styles.chartContainer}>
                <VictoryPie
                    height={250}
                    data={filterData}
                    outerRadius={100}
                    innerRadius={45}
                    colorScale={colorScale}
                    style={{ labels: { fill: '#2b3467', fontSize: 16, fontWeight: 'bold' } }}
                    events={
                        [{
                            target: "data",
                            eventHandlers: {
                                onPressIn: () => {
                                    return [
                                        {
                                            target: "data",
                                            mutation: ({ style, datum }) => {
                                                const category = datum.x;

                                                setSelectedCategory((prevCategory) => (
                                                    prevCategory === category ? null : category
                                                ));

                                                return style.fill === hearingCategoryColors[category]
                                                    ? null
                                                    : { style: { fill: hearingCategoryColors[category] } };
                                            },
                                        },
                                    ];
                                }
                            }
                        }]
                    }
                />
                {filterData.map((point) => (
                    <VictoryLabel
                        key={point.x}
                        style={{ fontSize: 14, color: 'black' }}
                        dx={5}
                        dy={5}
                        text={`${point.x}\n(${((point.y / totalStudents) * 100).toFixed(2)}%)`}
                    />
                ))}
            </View>
            <FlatList
                contentContainerStyle={styles.listContainer}
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

        backgroundColor: '#f0f0f0',
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
        backgroundColor: '#eb455f',
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#eb455f',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    card: {
        flex: 1,
        marginBottom: 20,
        paddingBottom: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#eb455f',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    cardDate: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    cardMore: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'right',
        paddingHorizontal: 10,
    },
});

export default AssignmentAnalytics;
