import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

export default function EducatorHome() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                LOGO
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Welcome to Educator Home Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    }
});