import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
    return (
        <View style={styles.topContainerStyles}>
            <View style={styles.searchContainerStyle}>
                <Ionicons style={{ color: '#757575', }} size={23} name={'ios-search'} />
                <TextInput
                    placeholder='Name / Email'
                    placeholderTextColor='#757575'
                    style={styles.textInputStyle} />
            </View>
        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({
    topContainerStyles: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchContainerStyle: {
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textInputStyle: {
        color: '#C30332',
        flex: 1, 
    }
});