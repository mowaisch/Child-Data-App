import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { View, Text, StyleSheet } from 'react-native';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import CompareScreen from './src/screens/CompareScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as HomeProvider } from './src/context/HomeContext';

import { Context as AuthContext } from './src/context/AuthContext';
import { Context as HomeContext } from './src/context/HomeContext';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CreateChildScreen from './src/screens/CreateChildScreen';
import ChildScreen from './src/screens/ChildScreen';
import AddMomentScreen from './src/screens/AddMomentScreen';


const AuthStack = createStackNavigator();

function authFlow() {
    return (
        <AuthStack.Navigator
            screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Signup" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
}

const Tab = createMaterialBottomTabNavigator();

const MainFlowTab = () => {


    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            barStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#C30332', overflow: 'hidden' }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Entypo style={{ color: color, }} size={23} name={'home'} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons style={{ color: color, }} size={23} name={'person'} />
                    ),
                }}
            />
            <Tab.Screen
                name="SearchTab"
                component={SearchStackScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Ionicons style={{ color: color, }} size={23} name={'ios-search'} />
                    ),
                }}
            />
            <Tab.Screen
                name="CompareTab"
                component={CompareStackScreen}
                options={{

                    tabBarLabel: 'Compare',
                    tabBarIcon: ({ color }) => (
                        <Ionicons style={{ color: color, }} size={23} name={'git-compare'} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
};

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        </HomeStack.Navigator>
    );

};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </ProfileStack.Navigator>
    );
};

const SearchStack = createStackNavigator();

const SearchStackScreen = ({ navigation }) => {
    return (
        <SearchStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <SearchStack.Screen name="SearchProfile" component={SearchScreen} />
        </SearchStack.Navigator>
    );
};

const CompareStack = createStackNavigator();

const CompareStackScreen = ({ navigation }) => {
    return (
        <CompareStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <CompareStack.Screen name="CompareScreen" component={CompareScreen} />
        </CompareStack.Navigator>
    );
};

const TopStack = createStackNavigator();

const TopStackScreen = ({ navigation }) => {

    const { state: { user_id }, getUserData } = useContext(AuthContext);
    const { getChildren } = useContext(HomeContext);
    useEffect(() => {
        if (user_id != '') {
            getUserData(user_id);
            getChildren(user_id);
        }
    }, [user_id]);
    return (
        <TopStack.Navigator screenOptions={{
            headerShown: false
        }}>
            <TopStack.Screen name="TabFlow" component={MainFlowTab} />
            <TopStack.Screen name="CreateChild" component={CreateChildScreen} />
            <TopStack.Screen name="ChildDetails" component={ChildScreen} />
            <TopStack.Screen name="AddMoment" component={AddMomentScreen} />
        </TopStack.Navigator>
    );

};

// const ChildStack = createStackNavigator();

// const ChildStackScreen = ({ navigation }) => {

//     return (
//         <ChildStack.Navigator screenOptions={{
//             headerShown: false
//         }}>
//             <ChildStack.Screen name="ChildDetails" component={ChildScreen} />
//             <ChildStack.Screen name="AddMoment" component={AddMomentScreen} />
//         </ChildStack.Navigator>
//     );

// };


const Stack = createStackNavigator();

const App = () => {
    const { state } = useContext(AuthContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {state.routeFlow === 'notSignedIn' ?
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="authFlow" component={authFlow} />
                    : state.routeFlow === 'SignedIn' ?
                        <Stack.Screen
                            options={{ headerShown: false }}
                            name="mainFlow" component={TopStackScreen} />
                        :
                        null
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default () => {
    return (
        <HomeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HomeProvider>
    );
};