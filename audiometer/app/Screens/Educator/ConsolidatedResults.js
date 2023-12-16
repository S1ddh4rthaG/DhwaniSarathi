import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import {
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryArea,
    VictoryPie,
    VictoryScatter,
    VictoryAxis,
    VictoryTheme,
} from 'victory-native';

const ConsolidatedResults = () => {

    const assignmentID = 123; // Get assignment ID from AsyncStorage or any source

    const barChartData = [

        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 },
    ];

    const lineChartData = [
        { x: 1, y: 13000 },
        { x: 2, y: 16500 },
        { x: 3, y: 14250 },
        { x: 4, y: 19000 },
    ];

    const areaChartData = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
    ];

    const pieChartData = [
        { x: 'Cats', y: 35 },
        { x: 'Dogs', y: 40 },
        { x: 'Birds', y: 55 },
    ];

    const scatterChartData = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 7 },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 25, padding: 10, fontWeight: 'bold' }}>CONSOLIDATED RESULTS</Text>
                    <Text style={{ color: 'white', textAlign: 'center', width: '100%', padding: 10, fontSize: 18 }}>ASSIGNMENT ID: {assignmentID}</Text>
                </View>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                    {/* Bar Chart */}
                    <VictoryBar data={barChartData} x="quarter" y="earnings" />
                </VictoryChart>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                    {/* Scatter Plot */}
                    <VictoryScatter data={scatterChartData} />
                    <VictoryAxis dependentAxis />
                </VictoryChart>

                <VictoryChart width={350} theme={VictoryTheme.material}>
                    {/* Area Chart */}
                    <VictoryArea data={areaChartData} />
                    <VictoryAxis dependentAxis />
                </VictoryChart>

                <VictoryChart width={350} theme={VictoryTheme.material}>
                    {/* Pie Chart */}
                    <VictoryPie data={pieChartData} />

                </VictoryChart>

                <VictoryChart width={350} theme={VictoryTheme.material}>
                    {/* Line Chart */}
                    <VictoryLine data={lineChartData} />

                </VictoryChart>


            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',


    },
    title: {
        width: '100%',
        backgroundColor: '#0096FF',
    }
});

export default ConsolidatedResults;
