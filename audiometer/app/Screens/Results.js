import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const Results = () => {
    const { t, i18n } = useTranslation();

    const [clarifaiResults, setClarifaiResults] = React.useState([]);
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [beginTestDisabled, setBeginTestDisabled] = React.useState(true);


    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        // console.log("image captured");
        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const base64Image = result.assets[0].base64;
            makeClarifaiApiCall(base64Image);
        }

    };



    const makeClarifaiApiCall = async (base64Image) => {
        setLoading(true);

        // todo: move this to a config file
        const PAT = 'd33489b3a898415daa756c635748e670';

        const USER_ID = 'clarifai';
        const APP_ID = 'main';
        const MODEL_ID = 'apparel-detection';
        const MODEL_VERSION_ID = '1ed35c3d176f45d69d2aa7971e6ab9fe';

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "base64": base64Image
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };


        try {
            const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions);
            const result = await response.json();
            // console.log("result");
            // console.log(result);
            const regions = result.outputs[0].data.regions;
            // console.log("regions");
            // console.log(regions);
            setClarifaiResults(regions);
        } catch (error) {
            console.log('Error:', error);
        }
        finally {
            setLoading(false);
            setBeginTestDisabled(false);
        }
    };

    // console.log("clarifaiResults");
    // console.log(clarifaiResults);

    const hasEarring = (results) => {
        return results &&
            results.some(region => {
                const concepts = region.data.concepts;
                return concepts && concepts.length > 0 && concepts[0].value > 0.5;
            });
    };

    const handleRemoveJewelry = () => { };
    const handleBeginTest = () => { };



    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <View style={{ backgroundColor: 'black', justifyContent: 'center', flex: 1 }}>
                <Text style={styles.title}>{t('Test Results')}</Text>
                <View style={styles.container}>
                    <View style={styles.tableRow}>

                        <Button title="Upload Image" onPress={handleImageSelection} />
                    </View>
                    <View style={styles.tableRow}>

                        {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop: 10 }} />}
                        {loading && <ActivityIndicator size="large" color="white" />}
                        {!loading && hasEarring(clarifaiResults) ? (
                            <TouchableOpacity style={styles.redButton} onPress={handleRemoveJewelry}>
                                <Text style={styles.buttonText}>Remove Your Jewelry</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={beginTestDisabled ? styles.disabledButton : styles.greenButton} onPress={handleBeginTest} disabled={beginTestDisabled}>
                                <Text style={styles.buttonText}>Begin the Test</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {clarifaiResults && clarifaiResults.length > 0 && clarifaiResults.map((region, index) => (
                        <View key={index} style={styles.container}>
                            <Text style={styles.headerText}>Region {index + 1}</Text>
                            <View style={styles.resultDetails}>
                                <Text style={styles.resultText}>
                                    Concept: {region.data.concepts[0].name}
                                </Text>
                                <Text style={styles.resultText}>
                                    Confidence: {region.data.concepts[0].value}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
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
        flexDirection: 'column',
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
    resultContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 10,
    },
    resultDetails: {
        marginTop: 10,
    },
    resultText: {
        fontSize: 18,
        color: 'white',
        marginBottom: 5,
    },
    redButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    greenButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: 'grey',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },

});

export default Results;
