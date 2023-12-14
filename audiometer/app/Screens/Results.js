import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel, VictoryLegend } from 'victory-native';

const Results = () => {

    const leftEar_result = [
        { frequency: '250', intensity: 45 },
        { frequency: '500', intensity: 50 },
        { frequency: '1000', intensity: 45 },
        { frequency: '2000', intensity: 40 },
        { frequency: '4000', intensity: 45 },
        { frequency: '8000', intensity: 50 },
    ];

    const rightEar_result = [
        { frequency: '250', intensity: 35 },
        { frequency: '500', intensity: 45 },
        { frequency: '1000', intensity: 40 },
        { frequency: '2000', intensity: 30 },
        { frequency: '4000', intensity: 50 },
        { frequency: '8000', intensity: 60 },
    ];

    const { t } = useTranslation();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{t('Your Results')}</Text>

                <View style={styles.gridItem}>
                    <Text style={styles.headerText}>{t('Normal Hearing')}</Text>
                </View>

                <View style={styles.twoColumnContainer}>
                    <View style={styles.earGridItem}>
                        <Text style={styles.headerText}>{t('Left Ear')}</Text>
                        <Image
                            style={styles.image}
                            source={require('../assets/leftear.png')}
                            resizeMode='cover'
                        />
                        <Text style={styles.resultText}>{t('12 dB HL')}</Text>
                    </View>

                    <View style={styles.earGridItem}>
                        <Text style={styles.headerText}>{t('Right Ear')}</Text>
                        <Image
                            style={styles.image}
                            source={require('../assets/rightear.png')}
                            resizeMode='cover'
                        />
                        <Text style={styles.resultText}>{t('10 dB HL')}</Text>
                    </View>
                </View>

                <View style={styles.gridItem}>
                    <Text style={styles.headerText}>{t('Your Audiogram')}</Text>
                    <Text style={styles.pText}>
                        {t(
                            'An Audiogram shows how loud sounds need to be at different frequencies for you to hear them.'
                        )}
                    </Text>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={360}
                        height={300}
                        domainPadding={{ x: 10 }}
                        style={{
                            background: { fill: 'rgba(93,123,123,1)' },
                        }}
                    >
                        <VictoryAxis
                            tickValues={['250', '500', '1000', '2000', '4000', '8000']}
                            tickFormat={['250', '500', '1k', '2k', '4k', '8k']}
                            orientation='top'
                            style={{
                                // axis: { stroke: 'white' },
                                tickLabels: { fill: 'white', padding: 5 },
                                grid: { stroke: 'rgba(255, 255, 255, 0.2)' },
                            }}
                        />
                        <VictoryAxis
                            dependentAxis
                            invertAxis={true}
                            tickValues={[0, 20, 40, 60, 80, 100, 120]}
                            style={{
                                // axis: { stroke: 'white' },
                                tickLabels: { fill: 'white', padding: 5 },
                                grid: { stroke: 'rgba(255, 255, 255, 0.2)' },
                            }}
                        />
                        <VictoryLine
                            data={leftEar_result}
                            x="frequency"
                            y="intensity"
                            style={{
                                data: { stroke: 'blue', strokeWidth: 3 },
                                labels: { fill: 'blue', fontSize: 12 },
                            }}
                            labelComponent={<VictoryLabel dy={-110} />}
                        />
                        <VictoryLine
                            data={rightEar_result}
                            x="frequency"
                            y="intensity"
                            style={{
                                data: { stroke: 'red', strokeWidth: 3 },
                                labels: { fill: 'red', fontSize: 12 },
                            }}
                            labelComponent={<VictoryLabel dy={-110} />}
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
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(93,123,123,1)',
        borderRadius: 10,
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    earGridItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(93,123,123,1)',
        borderRadius: 10,
        width: '48%', // Adjust the width as needed
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    pText: {
        fontSize: 15,
        textAlign: 'justify',
        color: 'rgba(219,230,230,1)',
    },
    image: {
        width: 100,
        height: 100,
    },
    resultText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default Results;
