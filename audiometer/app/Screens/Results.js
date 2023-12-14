import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTooltip, VictoryScatter } from 'victory-native';
import { ScrollView } from 'react-native-gesture-handler';

const CustomBackground = () => {
    return (
        <View style={styles.backgroundContainer}>
            <Image
                style={styles.backgroundImage}
                source={require('../assets/audiogram-bg.png')}
            />
        </View>
    );
};

const Results = ({ leftEarData, rightEarData }) => {
    // Dummy data if leftEarData and rightEarData are not provided
    if (!leftEarData || !rightEarData) {
        leftEarData = [
            { x: 0, y: 50 },
            { x: 125, y: 40 },
            { x: 250, y: 50 },
            { x: 500, y: 30 },
            { x: 1000, y: 70 },
            { x: 2000, y: 100 },
            { x: 4000, y: 90 },
            { x: 8000, y: 120 },
        ];

        rightEarData = [
            { x: 0, y: 10 },
            { x: 125, y: 20 },
            { x: 250, y: 60 },
            { x: 500, y: 40 },
            { x: 1000, y: 50 },
            { x: 2000, y: 110 },
            { x: 4000, y: 70 },
            { x: 8000, y: 120 },
        ];
    }

    const yTickCount = 12;

    return (
        <View style={styles.container}>
            <ScrollView>
                <CustomBackground />
                <View style={styles.chartContainer}>
                    <VictoryChart
                        width={340} // Adjust the width as needed
                        height={330} // Adjust the height as needed
                        padding={{ top: 60, left: 35, right: 5, bottom: 35 }} // Adjust padding for proper alignment
                        style={{ background: { opacity: 0 } }}
                    >
                        <VictoryLine
                            data={leftEarData}
                            style={{
                                data: { strokeWidth: 4 },
                            }}
                        />

                        <VictoryLine
                            data={rightEarData}
                            style={{
                                data: { strokeWidth: 4, stroke: 'green' },
                            }}
                        />

                        <VictoryScatter
                            data={leftEarData}
                            size={6}
                            style={{
                                data: { fill: 'red', shape: 'cross' },
                            }}
                            labels={({ datum }) => datum.x}
                            labelComponent={
                                <VictoryTooltip
                                    dy={-15}
                                    constrainToVisibleArea
                                    renderInPortal={false}
                                />
                            }
                        />

                        <VictoryScatter
                            data={rightEarData}
                            size={6}
                            style={{
                                data: { fill: 'green', shape: 'circle' },
                            }}
                            labels={({ datum }) => datum.x}
                            labelComponent={
                                <VictoryTooltip
                                    dy={-15}
                                    constrainToVisibleArea
                                    renderInPortal={false}
                                />
                            }
                        />

                        <VictoryAxis
                            style={{
                                ticks: { opacity: 0 },
                                tickLabels: { opacity: 0 },
                                axis: { opacity: 0 },
                            }}
                        />

                        <VictoryAxis
                            dependentAxis
                            invertAxis={true}
                            tickCount={yTickCount}
                            style={{
                                ticks: { opacity: 0 },
                                tickLabels: { opacity: 0 },
                                axis: { opacity: 0 },
                            }}
                            domain={[0, 120]}
                        />
                    </VictoryChart>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    chartContainer: {
        width: 355, // Adjust the width as needed
        height: 300, // Adjust the height as needed
        position: 'relative',
        zIndex: 1,
    },
});

export default Results;
