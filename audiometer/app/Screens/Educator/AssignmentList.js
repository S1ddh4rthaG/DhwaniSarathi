import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AssignmentList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            title: 'Assignment 1 Large name',
            progress: '20%',
            users: [
                { id: 1, img: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 2, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 3, img: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
                { id: 4, img: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 5, img: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 6, img: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
            ],
            backgroundColor: '#ffdcb2',
            titleColor: '#ff8c00',
        },
        {
            id: 2,
            title: 'Assignment 2',
            progress: '40%',
            users: [
                { id: 7, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 8, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 9, img: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
            ],
            backgroundColor: '#bfdfdf',
            titleColor: '#008080',
        },
        {
            id: 3,
            title: 'Assignment 2',
            progress: '50%',
            users: [
                { id: 10, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 11, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 12, img: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 13, img: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 14, img: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
            ],
            backgroundColor: '#e2caf8',
            titleColor: '#8a2be2',
        },
        {
            id: 4,
            title: 'Assignment lorem ipsum',
            progress: '60%',
            users: [
                { id: 15, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 16, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 17, img: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
            ],
            backgroundColor: '#d8e4fa',
            titleColor: '#6495ed',
        },
        {
            id: 5,
            title: 'Assignment lorem ipsum',
            progress: '60%',
            users: [
                { id: 15, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 16, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 17, img: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 18, img: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 19, img: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 20, img: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 21, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 22, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 23, img: 'https://bootdey.com/img/Content/avatar/avatar7.png' },
            ],
            backgroundColor: '#ffccff',
            titleColor: '#ff00ff',
        },
        {
            id: 6,
            title: 'Assignment lorem ipsum',
            progress: '60%',
            users: [
                { id: 24, img: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 25, img: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 26, img: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
            ],
            backgroundColor: '#c7e3ff',
            titleColor: '#1e90ff',
        },
    ]);

    const renderAppointmentCard = ({ item }) => (
        <View style={[styles.card, { backgroundColor: 'white', borderTopWidth: 4, borderTopColor: '#0096FF' }]}>
            <Text style={[styles.cardTitle, { color: 'black' }]}>{item.title}</Text>
            <View style={styles.cardDates}>
                <Text style={styles.cardDate}>Progress {item.progress}</Text>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.attendeesContainer}>
                    {item.users.map((attendee) => (
                        <Image key={attendee.id} source={{ uri: attendee.img }} style={styles.attendeeImage} />
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'green', }]}>
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'orange', }]}>
                        <Text style={styles.buttonText}>Config</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const searchFilter = (item) => {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Assignments</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor='grey'
            />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={appointments.filter(searchFilter)}
                renderItem={renderAppointmentCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 60,
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10
    },
    listContainer: {
        paddingHorizontal: 5,
        opacity: 0.9,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0096FF',
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "white",
    },
    card: {
        flex: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,

        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    cardDates: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    cardDate: {
        color: 'black',
    },
    cardContent: {
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    attendeesContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    attendeeImage: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: -10,
        borderWidth: 0.5,
        marginTop: 3,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        marginTop: 15,
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 10,


    },
    buttonText: {
        color: 'white',
    },
});

export default AssignmentList;