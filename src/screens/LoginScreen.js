import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';


const LoginScreen = ({ navigation }) => {
    const { state, setRoute, signin } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    return (
        <View style={styles.topContainerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#007EAD"
            />
            <ImageBackground
                style={styles.backgroundImgStyle}
                source={require('../assets/login-background.jpg')}
                blurRadius={4}
                resizeMode='cover'
            >
                <View style={styles.contaianer1Style}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../assets/logo.png')}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        leftIcon={<MaterialIcons name="email" size={30} backgroundColor='#fff' color="#C30332" />}
                        style={styles.textInputStyle}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        secureTextEntry={hidden}
                        leftIcon={<MaterialIcons name="lock" size={30} backgroundColor='#fff' color="#C30332" />}
                        rightIcon={<Octicons onPress={() => setHidden(!hidden)} name={hidden ? 'eye' : 'eye-closed'} size={20} backgroundColor='#fff' color="#757575" />}
                        rightIconContainerStyle={{ backgroundColor: '#fff', opacity: 0.5, }}
                        style={styles.textInputStyle}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={styles.contaianer2Style}>
                        <Button
                            title="Login"
                            onPress={() => signin(email, password)}
                            loading={state.signInLoading}
                            style={{ color: '#C30332' }}
                            containerStyle={{ elevation: 10, borderRadius: 15 }}
                            buttonStyle={{ backgroundColor: '#C30332' }}
                        />
                    </View>
                    <Text style={{ color: '#007EAD', marginTop: 10, alignSelf: 'center' }}>Don't have account! <Text onPress={() => navigation.navigate('Signup')} style={{ color: '#C30332' }}>Signup</Text></Text>
                </View>
            </ImageBackground>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    topContainerStyle: {
        flex: 1,
    },
    backgroundImgStyle: {
        height: '100%',
        width: '100%',
    },
    logoStyle: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginBottom: 100,
    },
    contaianer1Style: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'center',
    },
    contaianer2Style: {
        marginHorizontal: 30
    },
    textInputStyle: {
        backgroundColor: '#fff',
        opacity: 0.5,
        color: '#C30332'
        ,
    }
});