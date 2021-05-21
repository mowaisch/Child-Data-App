import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { TextInput, Avatar } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { Button, Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import * as Progress from 'react-native-progress';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as HomeContext } from '../context/HomeContext';

const CreateChildScreen = ({ navigation }) => {
    const { state: { user_id } } = useContext(AuthContext);
    const { state, addChild } = useContext(HomeContext);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [childImage, setChildImage] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    console.log(birthDate);

    const chooseImage = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setChildImage(res);
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
            <Header leftIcon='back' title='Add Child' navigation={navigation} />
            <ScrollView>
                <View style={{ alignSelf: "center", marginTop: 20 }}>
                    <View style={styles.profileImage}>
                        <Avatar.Image elevation={60} size={140} source={childImage ? { uri: childImage.uri } : require('../assets/user.png')} />
                    </View>
                    <View style={styles.editPicStyle} >
                        <TouchableOpacity onPress={() => chooseImage()} >
                            <Icon
                                name='camera'
                                type='ionicon'
                                size={24} color="#707070"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TextInput
                    mode='outlined'
                    theme={{ colors: { primary: '#C30332', underlineColor: 'transparent', } }}
                    label="Name"
                    value={name}
                    style={styles.inputStyle}
                    onChangeText={text => setName(text)}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Select Date of Birth </Text>
                    <DatePicker
                        mode='date'
                        date={birthDate}
                        onDateChange={setBirthDate}
                    />
                </View>

                <Button
                    title="Add Child"
                    loading={state.uploadingProgress}
                    onPress={() => {
                        var milliseconds = birthDate.getTime();
                        console.log(milliseconds);
                        console.log(childImage)
                        //addChild(childImage);
                        if (childImage === '' || name === '' || milliseconds === '') {
                            Alert.alert(
                                "Alert",
                                "Please select Image and fill necessary values",
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
                            addChild(user_id, name, milliseconds, childImage, () => { navigation.goBack() });
                        }

                    }}
                    style={{ color: '#C30332' }}
                    containerStyle={{ elevation: 10, borderRadius: 15, marginHorizontal: 40, marginVertical: 20 }}
                    buttonStyle={{ backgroundColor: '#C30332' }}
                />
            </ScrollView>
        </View>
    );
}

export default CreateChildScreen;

const styles = StyleSheet.create({
    topContainerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profileImage: {
        width: 140,
        height: 140,
        backgroundColor: '#fff'
    },
    editPicStyle: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 45,
        height: 45,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
    },
    inputStyle: {
        marginVertical: 20,
        marginHorizontal: 30,
        backgroundColor: '#fff'
    }
});