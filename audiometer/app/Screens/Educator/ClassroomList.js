import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const ClassroomList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [Classrooms, setClassrooms] = useState([
        {
            id: 1,
            title: 'Classroom 1',

            attendees: [
                { id: 1, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 2, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 3, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar8.png' },
                { id: 4, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 5, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 6, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
            ],
            code: 'ID120',
            backgroundColor: '#ffdcb2',
            titleColor: '#ff8c00',
        },
        {
            id: 2,
            title: 'Classroom 2',

            attendees: [
                { id: 7, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 8, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 9, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
            ],
            code: 'ID121',
            backgroundColor: '#bfdfdf',
            titleColor: '#008080',
        },
        {
            id: 3,
            title: 'Classroom 2',

            attendees: [
                { id: 10, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 11, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 12, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar1.png' },
                { id: 13, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar3.png' },
                { id: 14, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar5.png' },
            ],
            code: 'ID122',
            backgroundColor: '#e2caf8',
            titleColor: '#8a2be2',
        },
        {
            id: 4,
            title: 'Classroom 2',

            attendees: [
                { id: 15, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar2.png' },
                { id: 16, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar4.png' },
                { id: 17, remoteImage: 'https://bootdey.com/img/Content/avatar/avatar6.png' },
            ],
            code: 'ID123',
            backgroundColor: '#d8e4fa',
            titleColor: '#6495ed',
        },
        // Add more Classrooms here
    ]);

    const renderClassroomCard = ({ item }) => (
        <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.cardTitle, { color: item.titleColor }]}>{item.title}</Text>
                <Text style={[styles.cardCode, { color: item.titleColor }]}>{item.code}</Text>
            </View>

            <View style={styles.cardContent}>
                <Text style={{ padding: 3 }}>Students : </Text>
                <View style={styles.attendeesContainer}>
                    {item.attendees.map((attendee) => (
                        <Image key={attendee.id} source={{ uri: attendee.remoteImage }} style={styles.attendeeImage} />
                    ))}
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.actionButton, { borderColor: item.titleColor, }]}>
                        <Text style={{ color: item.titleColor }}>View Assignments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { borderColor: item.titleColor, }]}>
                        <Text style={{ color: item.titleColor }}>Add Assignment</Text>
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
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={Classrooms.filter(searchFilter)}
                renderItem={renderClassroomCard}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {



    },
    listContainer: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        marginBottom: 10,
        paddingHorizontal: 10,
        margin: 10,
    },
    card: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,

    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    cardCode: {
        fontSize: 18,
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
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    attendeeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: -10,
        borderWidth: 0.5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
        justifyContent: 'space-evenly',
    },
    actionButton: {
        marginTop: 15,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,

        borderWidth: 1,
    },
    backgroundImage: {
        flex: 1,
        height: 50,
        width: 100 + "%",
        resizeMode: 'cover', // You can adjust the resizeMode as needed
        // Other background styles if required
    },
});

export default ClassroomList;

