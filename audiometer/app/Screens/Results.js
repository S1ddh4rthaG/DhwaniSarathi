import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocalSearchParams } from "expo-router";
import {
    VictoryChart, VictoryLine, VictoryAxis,
    VictoryTooltip,
    VictoryScatter, VictoryTheme, VictoryLabel, VictoryLegend
} from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mapDataForScatter = (data, color, symbolType) => {
    return data.map(item => ({
        x: item.x,
        y: item.y,
        symbol: symbolType,
        size: 5
    }));
};

const calculateAverage = (data) => {
    const sum = data.reduce((acc, point) => acc + point.y, 0);
    const avg = sum / data.length;
    return Math.round(avg);
};

// ref: https://doi.org/10.2471%2FBLT.19.230367
const determineHearingCategory = (average) => {
    const hearingCategories = {
        'Normal': [-10, 19],
        'Mild': [20, 34],
        'Moderate': [35, 49],
        'Moderately Severe': [50, 64],
        'Severe': [65, 79],
        'Profound': [80, Infinity],
    };


    for (const category in hearingCategories) {
        const [min, max] = hearingCategories[category];
        if (average >= min && average <= max) {
            const formattedRange = `${min} to ${max}`;
            return {
                category,
                formattedResult: `${category} Hearing`,
                formattedRange,
            };
        }
    }

    return {
        category: 'Uncategorized',
        formattedResult: 'Uncategorized Hearing',
        formattedRange: 'abnormal range',
    };
};

const getData = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId");
        const userType = await AsyncStorage.getItem("userType");

        console.log('userId:', userId);
        console.log('userType:', userType);

        return { userId: userId || null, userType: userType || null };
    } catch (e) {
        console.log('Error reading from AsyncStorage', e);
        return { userId: null, userType: null };
    }
};

const Results = ({ leftEarData, rightEarData }) => {
    const params = useLocalSearchParams();
    console.log('params id', params.id);
    let resultProp = params.results;
    if (typeof resultProp === 'string') {
        try {
            resultProp = JSON.parse(resultProp);
        } catch (error) {
            console.error('Error parsing results JSON:', error);
            resultProp = null;
        }
    }

    // console.log('results', resultProp);
    console.log('results type', typeof resultProp);

    if ((typeof resultProp) === 'object' && Array.isArray(resultProp)) {
        leftEarData = resultProp
            .filter(item => item.ear === 'left' && item.measurementType === 'AIR_UNMASKED_LEFT')
            .map(item => ({ x: item.frequency.toString(), y: item.threshold }));

        rightEarData = resultProp
            .filter(item => item.ear === 'right' && item.measurementType === 'AIR_UNMASKED_RIGHT')
            .map(item => ({ x: item.frequency.toString(), y: item.threshold }));

    } else {
        console.log('Invalid results format');
    }

    if (!leftEarData || !rightEarData) {
        leftEarData = [
            { x: '125', y: 40 },
            { x: '250', y: 45 },
            { x: '500', y: 40 },
            { x: '1000', y: 35 },
            { x: '2000', y: 45 },
            { x: '4000', y: 50 },
            { x: '8000', y: 55 }
        ];

        rightEarData = [
            { x: '125', y: 50 },
            { x: '250', y: 60 },
            { x: '500', y: 70 },
            { x: '1000', y: 65 },
            { x: '2000', y: 55 },
            { x: '4000', y: 40 },
            { x: '8000', y: 30 }
        ];
    }

    // Calculate average hearing level
    const leftEarAverage = calculateAverage(leftEarData);
    const rightEarAverage = calculateAverage(rightEarData);

    const categoryInfo = {
        'Normal': 'You can hear a whisper, rustling leaves, and ticking clocks.',
        'Mild': 'You can hear a conversation in a quiet room, but may have difficulty hearing a whisper or soft sounds.',
        'Moderate': ' You may difficulty hearing some quieter conversations.',
        'Moderately Severe': ' You may have difficulty hearing a normal conversation. May lip-read or use hearing aids to assist with communication.',
        'Severe': 'You can understand speech only if the speaker is in close proximity.',
        'Profound': ' You face proble in understanding speech. Unable to hear "loud" stimuli such as lawn mowers or passing cars.',
    };

    // Get category info for left and right ears
    const leftEarCategoryInfo = determineHearingCategory(leftEarAverage);
    const rightEarCategoryInfo = determineHearingCategory(rightEarAverage);
    const combinedCategoryInfo = determineHearingCategory((leftEarAverage + rightEarAverage) / 2);

    const { t } = useTranslation();
    const yTickCount = 12;

    const [chartDimensions, setChartDimensions] = useState({
        width: screenWidth,
        height: 300,
    });

    // useEffect(() => {
    //     // Update chart dimensions if needed
    //     // You can add logic here to dynamically adjust chart dimensions
    // }, [leftEarData, rightEarData]);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Your Results')}</Text>

                <View style={styles.gridItem}>
                    <Text style={styles.headerText}>{t(combinedCategoryInfo.formattedResult)}</Text>
                    <Text style={styles.pText}>
                        {t(`You can hear sounds from ${combinedCategoryInfo.formattedRange} dB. ${categoryInfo[combinedCategoryInfo.category]}`)}
                    </Text>
                </View>

                <View style={styles.gridItem}>
                    <View style={styles.twoColumnContainer2}>
                        <View style={styles.column2}>
                            <Text style={styles.columnHeaderText}>{t('Categories')}</Text>
                            <Text style={styles.columnText}>{t('Normal\nMild\nModerate\nModerately severe\nSevere\nProfound')}</Text>
                        </View>

                        <View style={styles.column2}>
                            <Text style={styles.columnHeaderText}>{t('Range (dB HL)')}</Text>
                            <Text style={styles.columnText}>-10 to 19{'\n'}20 to 34{'\n'}35 to 49{'\n'}50 to 64{'\n'}65 to 79{'\n'}80+</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.twoColumnContainer}>
                    <View style={styles.earGridItem}>
                        <Text style={styles.headerText}>{t('Left Ear')}</Text>
                        <Image
                            style={styles.image}
                            source={require('../assets/leftear.png')}
                            resizeMode='cover'
                        />
                        <Text style={styles.resultText2}>{t(`${leftEarAverage} dB`)}</Text>
                        <Text style={styles.resultText}>{t(leftEarCategoryInfo.formattedResult)}</Text>
                    </View>

                    <View style={styles.earGridItem}>
                        <Text style={styles.headerText}>{t('Right Ear')}</Text>
                        <Image
                            style={styles.image}
                            source={require('../assets/rightear.png')}
                            resizeMode='cover'
                        />
                        <Text style={styles.resultText2}>{t(`${rightEarAverage} dB`)}</Text>
                        <Text style={styles.resultText}>{t(rightEarCategoryInfo.formattedResult)}</Text>
                    </View>
                </View>

                <View style={styles.gridItem}>
                    <Text style={styles.headerText}>{t('Your Audiogram')}</Text>
                    <Text style={styles.pText}>
                        {t(
                            'An Audiogram shows how loud sounds need to be at different frequencies for you to hear them.'
                        )}
                    </Text>
                    <View style={{
                        padding: 10,
                        paddingLeft: 20,
                    }}>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            width={360}
                            height={300}
                            domainPadding={{ x: 10 }}
                            style={{
                                background: { fill: 'rgba(93,123,123,1)' }
                            }}
                        >
                            <VictoryAxis
                                tickValues={['125', '250', '500', '1000', '2000', '4000', '8000']}
                                tickFormat={['125', '250', '500', '1k', '2k', '4k', '8k']}
                                orientation='top'
                                style={{
                                    axisLabel: { fill: 'white', padding: 30, fontWeight: 'bold' },
                                    tickLabels: { fill: 'white', padding: 15 },
                                    grid: { stroke: 'rgba(255, 255, 255, 0.2)' },
                                }}
                            // label="Hz"
                            />
                            <VictoryAxis
                                dependentAxis
                                invertAxis={true}
                                tickValues={[-10, 0, 20, 40, 60, 80, 100, 120]}
                                style={{
                                    axisLabel: { fill: 'white', padding: 30, fontWeight: 'bold' },
                                    tickLabels: { fill: 'white', padding: 5 },
                                    grid: { stroke: 'rgba(255, 255, 255, 0.2)' },
                                }}
                            // label="dB"
                            />
                            <VictoryLine
                                data={leftEarData}
                                x="x"
                                y="y"
                                style={{
                                    data: { stroke: 'blue', strokeWidth: 2 },
                                    labels: { fill: 'blue', fontSize: 12 },
                                }}
                                labelComponent={<VictoryLabel dy={-110} />}
                            />
                            <VictoryLine
                                data={rightEarData}
                                x="x"
                                y="y"
                                style={{
                                    data: { stroke: 'red', strokeWidth: 2 },
                                    labels: { fill: 'red', fontSize: 12 },
                                }}
                                labelComponent={<VictoryLabel dy={-110} />}
                            />

                            {/* VictoryScatter shapes =  "star"  "square"  "diamond"  "circle"  "triangleUp"*/}

                            <VictoryScatter
                                data={mapDataForScatter(leftEarData, 'blue', 'plus')}
                                labels={({ datum }) => `${datum.x}, ${datum.y}`}
                                labelComponent={
                                    <VictoryTooltip dy={-20} constrainToVisibleArea renderInPortal={false} />
                                }
                                style={{
                                    data: { fill: 'blue' },
                                    labels: {
                                        fill: 'blue', fontSize: 20, padding: 8
                                    }
                                }}
                            />
                            <VictoryScatter
                                data={mapDataForScatter(rightEarData, 'red', 'circle')}
                                labels={({ datum }) => `${datum.x}, ${datum.y}`}
                                labelComponent={
                                    <VictoryTooltip dy={-20} constrainToVisibleArea renderInPortal={false} />
                                }
                                style={{
                                    data: { fill: 'red' },
                                    labels: { fill: 'red', fontSize: 20, padding: 8 },
                                }}

                            />


                            <VictoryLegend
                                x={110}
                                y={270}
                                orientation="horizontal"
                                gutter={10}
                                style={{
                                    border: { stroke: 'white' }, labels: { fill: 'white' }
                                }}
                                data={[
                                    { name: 'Left Ear', symbol: { fill: 'blue', type: 'plus' } },
                                    { name: 'Right Ear', symbol: { fill: 'red', type: 'circle' } },
                                ]}
                            />
                        </VictoryChart>

                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.backgroundContainer}>
                        <Image
                            style={styles.backgroundImage}
                            source={require('../assets/audiogram-bg.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.chartContainer}>
                        <VictoryChart
                            theme={VictoryTheme.grayscale}
                            width={chartDimensions.width}
                            height={chartDimensions.height}
                            padding={{ top: -5, left: 33, right: 45, bottom: 65 }} // Adjust padding for proper alignment
                            style={{ background: { opacity: 0 } }}
                        >
                            <VictoryLine
                                data={leftEarData}
                                style={{
                                    data: { strokeWidth: 4, stroke: 'blue' },
                                }}
                            />
                            <VictoryLine
                                data={rightEarData}
                                style={{
                                    data: { strokeWidth: 4, stroke: 'red' },
                                }}
                            />

                            <VictoryScatter
                                data={leftEarData}
                                size={6}
                                style={{
                                    data: { fill: 'blue', shape: 'cross' },
                                }}
                                labels={({ datum }) => datum.x}
                                labelComponent={
                                    <VictoryTooltip dy={-15} constrainToVisibleArea renderInPortal={false} />
                                }
                            />
                            <VictoryScatter
                                data={rightEarData}
                                size={6}
                                style={{
                                    data: { fill: 'red', shape: 'circle' },
                                }}
                                labels={({ datum }) => datum.x}
                                labelComponent={
                                    <VictoryTooltip dy={-15} constrainToVisibleArea renderInPortal={false} />
                                }
                            />
                            <VictoryAxis
                                categories={{ x: ['0', '125', '250', '500', '1000', '2000', '4000', '8000'] }}
                                tickLabels={['0', '125', '250', '500', '1k', '2k', '4k', '8k']}
                                tickValues={[0, 125, 250, 500, 1000, 2000, 4000, 8000]}
                                style={{
                                    ticks: { opacity: 0 },
                                    tickLabels: { opacity: 0 },
                                    axis: { opacity: 0 },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                invertAxis
                                tickCount={yTickCount}
                                style={{
                                    ticks: { opacity: 0 },
                                    tickLabels: { opacity: 0 },
                                    axis: { opacity: 0 },
                                }}
                                domain={[-10, 120]}
                            />
                        </VictoryChart>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: 'black',
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 10,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    gridItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7,
        padding: 10,
        backgroundColor: 'rgba(93,123,123,1)',
        borderRadius: 10,
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    twoColumnContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    column2: {
        flex: 1,
        marginHorizontal: 15,
    },
    columnHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },

    columnText: {
        fontSize: 14,
        color: 'rgba(219,230,230,1)',
    },
    earGridItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7,
        padding: 10,
        backgroundColor: 'rgba(93,123,123,1)',
        borderRadius: 10,
        width: '48%', // Adjust the width as needed
    },
    headerText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    pText: {
        fontSize: 15,
        textAlign: 'auto',
        color: 'rgba(219,230,230,1)',
    },
    image: {
        width: 100,
        height: 100,
    },
    resultText: {
        fontSize: 15,
        height: 20,
        textAlign: 'center',
        color: 'white',
    },
    resultText2: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    backgroundContainer: {
        width: screenWidth,
        height: 250,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundImage: {
        flex: 1,
        width: screenWidth,
        height: undefined,
        resizeMode: 'center'
    },
    chartContainer: {
        width: screenWidth,
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'transparent',
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default Results;
