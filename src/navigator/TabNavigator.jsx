import { useLayoutEffect } from 'react';

import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import
{
    Ionicons,
    Entypo,
    AntDesign,
} from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () =>
{
    const navigation = useNavigation();

    const handleExit = async () =>
    {
        await AsyncStorage.removeItem('authToken');

        const token = await AsyncStorage.getItem('authToken');

        !token && navigation.replace('LoginScreen');
    }

    useLayoutEffect(() =>
    {
        navigation.setOptions(
        {
            headerTitle: '',
            headerLeft: () =>
            (
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {'Ecommerce-App'}
                </Text>
            ),
            headerRight: () =>
            (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="exit-outline"
                        size={32}
                        color="black"
                        onPress={handleExit}
                    />
                </View>
            )
        });
    }, []);

    return (
        <Tab.Navigator
            screenOptions={
            {
                headerShown: false,
                tabBarStyle: { height: 75 }
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={
                {
                    tabBarLabel: 'Home',
                    tabBarLabelStyle:
                    {
                        fontSize: 15,
                        color: '#008E97',
                        marginBottom: 10
                    },
                    tabBarIcon: ({ focused }) => focused ?
                    (
                        <Entypo name="home" size={32} color="#008E97" />
                    ) :
                    (
                        <AntDesign name="home" size={32} color="black" />
                    )
                }}
            />

            <Tab.Screen
                name="ProfileScreen"
                component={HomeScreen}
                options={
                {
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle:
                    {
                        fontSize: 15,
                        color: '#008E97',
                        marginBottom: 10
                    },
                    tabBarIcon: ({ focused }) => focused ?
                    (
                        <Ionicons name="person" size={32} color="#008E97" />
                    ) :
                    (
                        <Ionicons name="person-outline" size={32} color="black" />
                    )
                }}
            />

            <Tab.Screen
                name="CartScreen"
                component={HomeScreen}
                options={
                {
                    tabBarLabel: 'Cart',
                    tabBarLabelStyle:
                    {
                        fontSize: 15,
                        color: '#008E97',
                        marginBottom: 10
                    },
                    tabBarIcon: ({ focused }) => focused ?
                    (
                        <AntDesign name="shoppingcart" size={32} color="#008E97" />
                    ) :
                    (
                        <AntDesign name="shoppingcart" size={32} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
