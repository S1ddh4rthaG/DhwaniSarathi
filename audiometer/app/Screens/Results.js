import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

// import './locales/i18n'; 
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get("window").width;

const data = {
    labels: ["500", "1000", "2000", "4000", "8000"],
    datasets: [
        {
            data: [15, 20, 30, 45, 60, 55], // Audiogram values for the left ear
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
        },
        {
            data: [30, 15, 25, 40, 55, 50], // Audiogram values for the right ear
            color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
            strokeWidth: 2,
        },
    ],
    legend: ["Left Ear", "Right Ear"],
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for the line
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
    withInnerLines: true, // Display inner lines (grid)
    withOuterLines: true, // Display outer lines (border)
    formatYLabel: (label) => `${label} dB`, // Customize Y-axis labels
    formatXLabel: (label) => `${label} Hz`, // Customize X-axis labels
    yAxisInterval: 20,
};
const Results = () => {
    // will be obtained from backend
    const leftEar_result = "Bad";
    const rightEar_result = "Good";
    const { t, i18n } = useTranslation();
    // const [currentLanguage, setLanguage] = useState('en'); 
    // const changeLanguage= value=>{
    //     i18n.changeLanguage(value)
    //     .then(()=>setLanguage(value))
    //     .catch(err => console.log(err)); 
    // }
    return (
        <ScrollView
            style={{ backgroundColor: 'black' }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >

            <Text style={styles.title}>{t('Test Results')}</Text>
            <View style={styles.container}>
                <View style={styles.tableRow}>
                    <Text style={styles.headerText}>{t('Left Ear')}</Text>
                    <Text style={styles.headerText}>{t('Right Ear')}</Text>
                </View>

                <View style={styles.tableRow}>
                    <Image
                        style={styles.image}
                        source={require('../assets/leftear.png')}
                        resizeMode='cover'
                    />
                    <Image
                        style={styles.image}
                        source={require('../assets/rightear.png')}
                        resizeMode='cover'
                    />
                </View>

                <View style={styles.tableRow}>
                    <Text style={[styles.resultText, leftEar_result === 'Good' ? styles.goodResult : styles.badResult]}>
                        {t(leftEar_result)}
                    </Text>
                    <Text style={[styles.resultText, rightEar_result === 'Good' ? styles.goodResult : styles.badResult]}>
                        {t(rightEar_result)}
                    </Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.graphText}>{t('Graph')}</Text>
                </View>

                <LineChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    chartConfig={chartConfig}
                />
            </View >

            <Chart
                style={{ height: 200 }}
                data={[
                    { x: 250, y: 15 },
                    { x: 500, y: 10 },
                    { x: 1000, y: 70 },
                    { x: 2000, y: 30 },
                    { x: 4000, y: 20 },
                    { x: 8000, y: 55 },
                ]}
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: 10000 }}
                yDomain={{ min: -10, max: 140 }}
            >
                <VerticalAxis tickCount={11} theme={{
                    axis: {
                        visible: true,
                        stroke: {
                            color: 'white',
                            width: 2,
                            opacity: 1,
                            dashArray: [],
                        },
                        dx: 0,
                    }, labels: {
                        visible: true,
                        label: {
                            color: 'white',
                            fontSize: 10,
                            fontWeight: 300,
                            textAnchor: 'end',
                            opacity: 1,
                            dx: -4,
                            dy: 4,
                            rotation: 0,
                        }, formatter: (v) => v.toFixed(0)
                    }
                }} />
                <HorizontalAxis tickCount={6} />
                <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } } }} />
                <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 } } }} />
            </Chart>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 10,
        backgroundColor: 'black',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 50,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        color: 'white',
    },
    image: {
        width: '50%',

        resizeMode: 'cover',
    },
    resultText: {
        fontSize: 30,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    goodResult: {
        color: 'green',
    },
    badResult: {
        color: 'red',
    },
    graphText: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        color: 'white',
    },

});

export default Results;
