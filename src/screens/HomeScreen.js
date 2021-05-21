import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.topContainerStyles}>
            <Header leftIcon='' title='Home' navigation={navigation} />
            <Text> HomeScreen </Text>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    topContainerStyles: {
        flex: 1
    }
});