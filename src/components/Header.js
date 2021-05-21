import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ leftIcon, title, navigation }) => {
    return (
        <View style={styles.inLineStyle1}>
            {
                leftIcon == 'menu' ?
                    <TouchableOpacity   >
                        <Icon
                            name='menu'
                            type='ionicon'
                            color='#52575D'
                            size={30}
                        />
                    </TouchableOpacity>
                    : leftIcon == 'back' ?
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon
                                raised
                                name='chevron-back-outline'
                                type='ionicon'
                                color='#52575D'
                                size={18}
                            />
                        </TouchableOpacity>
                        :
                        <View></View>
            }

            <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#fff', paddingHorizontal: 5 }}>
                {/* <Image source={require("../assets/logo.jpeg")} style={{ height: 40, resizeMode: 'contain', width: 40, alignSelf: 'center' }} /> */}
                <Text numberOfLines={1} style={styles.headingStyle}>{title}</Text>
            </View>
            <View>

            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    inLineStyle1: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        elevation: 3,
    },
    headingStyle: {
        marginLeft: 3,
        fontSize: 20,
        backgroundColor: '#fff'
    },
});