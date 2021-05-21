import React, { useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Context as HomeContext } from '../context/HomeContext';

const ChildScreen = ({ navigation }) => {
    const { state: { selected_child }, selectChild } = useContext(HomeContext);
    return (
        <View style={styles.topContainerStyles}>
            <Header leftIcon='back' title={selected_child[0].data.name} navigation={navigation} />
            <ScrollView>
                <View style={styles.container1Style}>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>Basic Info</Text>
                            <TouchableOpacity>
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date of birth : </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Photos/Videos</Text>
                    </View>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>First tooth coming out</Text>
                            <TouchableOpacity >
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date: </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Photos</Text>
                    </View>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>First Crawl</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('AddMoment')}
                            >
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date: </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Video</Text>
                    </View>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>First walk</Text>
                            <TouchableOpacity>
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date: </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Video</Text>
                    </View>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>First kiddle/daycare</Text>
                            <TouchableOpacity>
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date: </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Video</Text>
                    </View>
                    <View>
                        <View style={styles.container2Style}>
                            <Text style={styles.headingTextStyle}>First day at school</Text>
                            <TouchableOpacity>
                                <Text style={styles.editTextStyle}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container2Style}>
                            <Text>Date: </Text>
                            <Text>19 October 2020</Text>
                        </View>
                        <Text>Video</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.addMomentContainerStyle}>
                                <MaterialIcons style={{ color: '#C30332', }} size={23} name={'add-circle-outline'} />
                                <Text style={styles.addMomentTextStyle}>Add special moment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ChildScreen;

const styles = StyleSheet.create({
    topContainerStyles: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container1Style: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 10,
    },
    headingTextStyle: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    container2Style: {
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    editTextStyle: {
        color: 'blue',
    },
    addMomentContainerStyle: {
        marginHorizontal: 40,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        elevation: 3
    },
    addMomentTextStyle: {
        marginTop: 5,
        fontSize: 15,
        color: '#C30332'
    }
});