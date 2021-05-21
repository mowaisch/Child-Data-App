import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { TextInput, Avatar } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Button, Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as HomeContext } from '../context/HomeContext';

const AddMomentScreen = ({ navigation }) => {
    const { state: { user_id } } = useContext(AuthContext);
    const { state, addMomentChild } = useContext(HomeContext);
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const chooseImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setImage(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const chooseVideo = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            setVideo(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    console.log(state.children_list);
    return (
        <View style={styles.topContainerStyle}>
            <Header leftIcon='back' title='Add Moment' navigation={navigation} />
            <ScrollView>
                <View style={{ alignSelf: "center", marginTop: 20, flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => chooseImage()}
                        style={styles.addContainerStyle}
                    >
                        <View style={styles.addInnerContainerStyle}>
                            <Icon
                                name='camera'
                                type='ionicon'
                                size={24} color="#707070"
                            />
                            <Text>Choose Photo</Text>
                            {image ? <Text style={{ color: 'green' }}>Selected</Text> : null}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => chooseVideo()}
                        style={styles.addContainerStyle}
                    >
                        <View style={styles.addInnerContainerStyle}>
                            <Icon
                                name='videocam'
                                type='ionicon'
                                size={24} color="#707070"
                            />
                            <Text>Choose Video</Text>
                            {video ? <Text style={{ color: 'green' }}>Selected</Text> : null}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Select Date</Text>
                    <DatePicker
                        mode='date'
                        date={date}
                        onDateChange={setDate}
                    />
                </View>
                <Button
                    title="Add Moment"
                    onPress={() => {
                        var milliseconds = date.getTime();
                        console.log(milliseconds);
                        //addChild(childImage);
                        if (image === '' || milliseconds === '') {
                            Alert.alert(
                                "Alert",
                                "Please select Image, Video and fill necessary values",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                            );
                        } else {
                            addMomentChild('-MYauJXuvWTilgff7JhS', 'First-Crawl', milliseconds, image)
                        }
                    }}
                    loading={state.uploadingProgress}
                    style={{ color: '#C30332' }}
                    containerStyle={{ elevation: 10, borderRadius: 15, marginHorizontal: 40, marginVertical: 20 }}
                    buttonStyle={{ backgroundColor: '#C30332' }}
                />
            </ScrollView>
        </View>
    );
}

export default AddMomentScreen;

const styles = StyleSheet.create({
    topContainerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    addContainerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 30
    },
    addInnerContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    inputStyle: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: '#fff'
    }
});