import { useState, useEffect } from 'react';

import
{
    Alert,
    SafeAreaView,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Pressable
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import useHost from '../hooks/useHost';

import axios from 'axios';

const LoginScreen = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const navigation = useNavigation();

    const myPromise = useHost();

    const appEnv = process.env.EXPO_PUBLIC_APP_ENV;

    const deployHost = process.env.EXPO_PUBLIC_DEPLOY_HOST;

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;

    const handleLogin = async () =>
    {
        try
        {
            setLogin(true);

            const usuario = { email, password }

            const { host } = await myPromise();

            const { data, status } = await axios.post(`${host}/login`, usuario);

            const { message, token } = data;

            if (status === 200)
            {
                AsyncStorage.setItem('authToken', token);

                Alert.alert('Mensaje', message,
                [
                    {
                        text: 'Aceptar',
                        onPress: () =>
                        {
                            setEmail('');
                            setPassword('');
                            setLogin(false);

                            navigation.navigate('TabNavigator');
                        },
                        style: 'default'
                    }
                ]);
            }
        }
        catch (e)
        {
            console.log(e);

            !e.response && Alert.alert('Error de inicio de sesión', 'Se produjo un error inesperado. Intenta iniciar sesión de nuevo.',
            [
                {
                    text: 'Aceptar',
                    onPress: () =>
                    {
                        setEmail('');
                        setPassword('');
                        setLogin(false);
                    },
                    style: 'default'
                }
            ]);

            if (e.response)
            {
                const { data, status } = e.response;

                const { message } = data;

                status === 500 ?
                    Alert.alert('Error de inicio de sesión', 'Se produjo un error inesperado. Intenta iniciar sesión de nuevo.',
                    [
                        {
                            text: 'Aceptar',
                            onPress: () =>
                            {
                                setEmail('');
                                setPassword('');
                                setLogin(false);
                            },
                            style: 'default'
                        }
                    ]) :
                    Alert.alert('Mensaje', message,
                    [
                        {
                            text: 'Aceptar',
                            onPress: () => setLogin(false),
                            style: 'default'
                        }
                    ]);
            }
        }
    }

    const loginStatus = async () =>
    {
        try
        {
            if (appEnv === undefined || !apiKey || !apiSecret)
            {
                return Alert.alert('Error de la aplicación', 'La aplicación no se pudo iniciar correctamente.', [{ text: 'Aceptar', style: 'default' }]);
            }

            const token = await AsyncStorage.getItem('authToken');

            token && navigation.replace('TabNavigator');
        }
        catch (e)
        {
            console.log(e);

            Alert.alert('Error de inicio de sesión', 'Se produjo un error inesperado. Intenta iniciar sesión de nuevo.', [{ text: 'Aceptar', style: 'default' }]);
        }
    }

    useEffect(() =>
    {
        loginStatus();
    }, []);

    return (
        <SafeAreaView
            style={
            {
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center'
            }}
        >
            <View>
                <Image
                    style={{ width: 300, height: 150 }}
                    source={require('../../assets/ecommerce.png')}
                />
            </View>
            
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={
                        {
                            fontSize: 17.5,
                            fontWeight: 'bold',
                            marginTop: 10,
                            color: "#041E42"
                        }}
                    >
                        {'Log in to Your Account'}
                    </Text>
                </View>

                <View style={{ marginTop: 75 }}>
                    <View
                        style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#D0D0D0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 25
                        }}
                    >
                        <MaterialIcons name="email" size={32} color="gray" style={{ marginLeft: 10 }} />

                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter Your Email"
                            style={
                            {
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 17.5 : 17.5
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View
                        style={
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            backgroundColor: '#D0D0D0',
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 25
                        }}
                    >
                        <AntDesign name="lock1" size={32} color="gray" style={{ marginLeft: 10 }} />

                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="******"
                            secureTextEntry={true}
                            style={
                            {
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 17.5 : 17.5
                            }}
                        />
                    </View>
                </View>

                <View
                    style={
                    {
                        marginTop: 12.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                />

                <View style={{ marginTop: 75 }} />

                <Pressable
                    onPress={() => !login && handleLogin()}
                    style={
                    {
                        width: 200,
                        backgroundColor: '#FEBE10',
                        borderRadius: 5,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: 15
                    }}
                >
                    <Text
                        style={
                        {
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 17.5,
                            fontWeight: 'bold'
                        }}
                    >
                        {'Login'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('RegisterScreen')}
                    style={{ marginTop: 15 }}
                >
                    <Text
                        style={
                        {
                            textAlign: 'center',
                            color: 'gray',
                            fontSize: 15
                        }}
                    >
                        {"Don't have an account? Sign Up"}
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen;
