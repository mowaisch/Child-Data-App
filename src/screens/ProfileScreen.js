/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as HomeContext } from '../context/HomeContext';

const ProfileScreen = ({ navigation }) => {
    const { state: { user_data } } = useContext(AuthContext);
    const { state, selectChild } = useContext(HomeContext);

    function calculateAge(dob) {
        var birthday = +new Date(dob);
        return ~~((Date.now() - birthday) / (31557600000));
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} >
            <StatusBar backgroundColor={'#C30332'} translucent={false} hidden={false} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#C30332' }}>
                <View style={{ paddingBottom: 50, backgroundColor: '#C30332' }} >
                    <View style={styles.oneLineStyles1}>
                        <Text style={styles.headingStyle}>Profile</Text>
                    </View>
                    <View style={styles.profileDetailStyle}>
                        <View style={styles.imageViewStyle}>
                            <Avatar.Image elevation={60} size={90} source={require('../assets/user.png')} />
                        </View>
                        <View style={styles.detailsStyle}>
                            <Text style={styles.detailsTextStyle}>{user_data ? user_data.name : 'loading...'}</Text>
                            <Text style={styles.detailsTextStyle1}>{user_data ? user_data.email : 'loading...'}</Text>
                        </View>
                        {/* <TouchableOpacity style={styles.buttonStyle}   >
                                <Text style={styles.textStyle}>Edit</Text>
                            </TouchableOpacity> */}
                    </View>
                </View>
                <View style={styles.optionsViewStyle}>
                    <FlatList
                        data={state.children_list}
                        numColumns={2}
                        style={{ alignSelf: 'center', width: '100%' }}
                        renderItem={({ item, }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    selectChild(item.id)
                                    navigation.navigate('ChildDetails')
                                }}
                                style={styles.childContainerStyle} 
                            >
                                <View style={styles.childInnerContainerStyle}>
                                    <Avatar.Image elevation={60} size={60} source={{ uri: item.data.img }} />
                                    <Text numberOfLines={1} style={styles.addChildTextStyle}>{item.data.name}</Text>
                                    {/* <Text style={styles.addChildTextStyle}>{calculateAge(item.data.date_of_birth)}</Text> */}
                                </View>
                            </TouchableOpacity>
                        }
                        ListFooterComponent={
                            <TouchableOpacity
                                style={styles.addChildContainerStyle}
                                onPress={() => navigation.navigate('CreateChild')}>
                                <View style={styles.addChildInnerContainerStyle}>
                                    <MaterialIcons style={{ color: '#C30332', }} size={23} name={'add-circle-outline'} />
                                    <Text style={styles.addChildTextStyle}>Add Child</Text>
                                    {state.children_list ?
                                        <Text style={styles.addChildRateTextStyle}>{state.children_list.length === 1 ? '$ 1.5  get 50% discount' : '$3.55'}</Text> : null}
                                </View>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    oneLineStyles1: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        backgroundColor: '#C30332',

    },
    profileDetailStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C30332'
    },
    imageViewStyle: {

    },
    detailsStyle: {
        marginLeft: 15,
        backgroundColor: '#C30332',
        width: '50%'
    },
    detailsTextStyle: {
        flexWrap: 'wrap',
        color: '#ffffff',
        fontSize: 18
    },
    detailsTextStyle1: {
        color: '#ffffff',
        fontSize: 14
    },
    headingStyle: {
        color: '#FFFFFF',
        fontSize: 27
    },
    textStyle: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5
    },
    buttonStyle: {
        width: 80,
        backgroundColor: '#C30332',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 10
    },
    optionsViewStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: '#ffffff',
        elevation: 20,
        shadowColor: 'blue',
        paddingTop: 15
    },
    childContainerStyle: {
        flex: 1,
        width: '90%',
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 5
    },
    childInnerContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    addChildContainerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 30
    },
    addChildInnerContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    addChildTextStyle: {
        marginTop: 5,
        fontSize: 15,
        color: '#C30332'
    },
    addChildRateTextStyle: {
        marginTop: 5,
        fontSize: 15,
        color: 'green'
    }

});
