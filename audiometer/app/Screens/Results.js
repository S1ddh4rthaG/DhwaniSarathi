import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import './locales/i18n'; 
import {useTranslation} from 'react-i18next'; 
const Results = () => {
    const leftEar_result = "Bad";
    const rightEar_result = "Good";
    const {t,i18n} =useTranslation(); 
    // const [currentLanguage, setLanguage] = useState('en'); 
    // const changeLanguage= value=>{
    //     i18n.changeLanguage(value)
    //     .then(()=>setLanguage(value))
    //     .catch(err => console.log(err)); 
    // }
    return (
        <View style={{ backgroundColor: 'black', justifyContent: 'center', flex: 1, }}>
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

            </View >
        </View>
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
