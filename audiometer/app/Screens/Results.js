import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import { AreaChart } from 'react-native-svg-charts'
import { Dots, Line } from './AreaChartScreen/chartAdds'
import { XAxis, YAxis } from 'react-native-svg-charts'
import { SafeAreaView } from 'react-native'

// import './locales/i18n'; 
import { useTranslation } from 'react-i18next';

const data2 = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

const data3 = {
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 3, 4, 8],
    type: 'scatter',
};
const layout = { title: 'My cool chart!' };

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

                <AreaChart
                    style={{ height: 200 }}
                    data={data2}
                    gridMin={-100}
                    gridMax={120}
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{ fill: '#ADD8E6' }}>
                    {/* <Grid /> */}
                    <Line />
                    <Dots />
                </AreaChart>

                <AreaChart style={{ height: 200 }} data={data2} svg={{ fill: '#ADD8E6' }} />
                <SafeAreaView
                    style={{ flexDirection: 'row', flex: 1 }}
                    onLayout={(event) => {
                        const { width } = event.nativeEvent.layout
                        // setComponentWidth(width)
                    }}>
                    <YAxis
                        data={data2}
                        contentInset={{ top: 20, bottom: 20 }}
                        min={-50}
                        max={150}
                        svg={{
                            fill: 'grey',
                            fontSize: 11,
                        }}
                        style={{ marginRight: 5, height: 300 }}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value} km`}
                    />
                    <XAxis
                        style={{ marginHorizontal: -10, width: 300, marginTop: 10 }}
                        data={data2}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />
                    {/* <AxisXLine width={componentWidth} />
                        <AxisYLine />
                        <HorizontalArrow />
                        <VerticalArrow /> */}
                </SafeAreaView>
            </View >
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
