import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, ImageBackground, StatusBar, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const { state, setRoute, signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [errorEmpty, setErrorEmpty] = useState(false);
    const [samePassword, setSamePassword] = useState(true);

    onSignupPress = (name, email, password) => {


        if (name != '' && email != '' && password != '' && confirmPassword != '') {
            setErrorEmpty(false);
            if (samePassword) {
                signup(name, email.toLowerCase(), password)
            }
        } else {
            setErrorEmpty(true)
        }
    }

    return (
        <View style={styles.topContainerStyle}>
            <StatusBar
                animated={true}
                backgroundColor="#8CC5D2"
            />
            <ImageBackground
                style={styles.backgroundImgStyle}
                source={require('../assets/signup-background.jpg')}
                blurRadius={6}
                resizeMode='cover'
            >
                <View style={styles.contaianer1Style}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../assets/logo.png')}
                    />
                    <Input
                        placeholder="Name"
                        value={name}
                        leftIcon={<MaterialIcons name="person" size={30} backgroundColor='#fff' color="#C30332" />}
                        style={styles.textInputStyle}
                        onChangeText={(text) => setName(text)}
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
                        onChangeText={text => setPassword(text)}
                    />
                    <Input
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        secureTextEntry={hidden}
                        errorMessage={errorEmpty}
                        leftIcon={<MaterialIcons name="lock" size={30} backgroundColor='#fff' color="#C30332" />}
                        rightIcon={<Octicons onPress={() => setHidden(!hidden)} name={hidden ? 'eye' : 'eye-closed'} size={20} backgroundColor='#fff' color="#757575" />}
                        rightIconContainerStyle={{ backgroundColor: '#fff', opacity: 0.5, }}
                        style={styles.textInputStyle}
                        onChangeText={text => {
                            setConfirmPassword(text);
                            if (password != text) {
                                setSamePassword(false);
                            } else {
                                setSamePassword(true);
                            }
                        }}
                    />
                    {errorEmpty ? <Text style={styles.errorTextSyle}>Please fill all the value</Text> : null}
                    {samePassword ? null : <Text style={styles.errorTextSyle}>Both Passwords are not same</Text>}
                    <View style={styles.contaianer2Style}>
                        <Button
                            title="Sign Up"
                            loading={state.signUpLoading}
                            onPress={() => onSignupPress(name, email, password)}
                            style={{ color: '#C30332' }}
                            containerStyle={{ elevation: 10, borderRadius: 15 }}
                            buttonStyle={{ backgroundColor: '#C30332' }}
                        />
                    </View>
                    <Text style={{ color: '#fff', marginTop: 10, alignSelf: 'center' }}>Already user! <Text onPress={() => navigation.navigate('Login')} style={{ color: '#C30332' }}>Sign in</Text></Text>
                </View>
            </ImageBackground>
        </View>
    );
}

export default SignUpScreen;

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
    },
    errorTextSyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },
});