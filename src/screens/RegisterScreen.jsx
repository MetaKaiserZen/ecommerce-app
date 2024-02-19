import { useState } from 'react';

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

import
{
    Ionicons,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';

import useHost from '../hooks/useHost';

import axios from 'axios';

const RegisterScreen = () =>
{
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const navigation = useNavigation();

    const myPromise = useHost();

    const appEnv = process.env.EXPO_PUBLIC_APP_ENV;

    const deployHost = process.env.EXPO_PUBLIC_DEPLOY_HOST;

    const handleRegister = async () =>
    {
        try
        {
            setRegister(true);

            const usuario =
            {
                nombre,
                email,
                password
            }

            const { host } = await myPromise();

            const { data, status } = await axios.post(`${host}/register`,
            {
                host: appEnv === 'local' ? 'http://localhost:3000' : deployHost,
                ...usuario
            });

            const { message } = data;

            if (status === 201)
            {
                Alert.alert('Mensaje', message,
                [
                    {
                        text: 'Aceptar',
                        onPress: () =>
                        {
                            setNombre('');
                            setEmail('');
                            setPassword('');
                            setRegister(false);

                            navigation.navigate('LoginScreen');
                        },
                        style: 'default'
                    }
                ]);
            }
        }
        catch (e)
        {
            console.log(e);

            !e.response && Alert.alert('Error al enviar la solicitud', 'Se produjo un error inesperado. Vuelve a intentarlo.',
            [
                {
                    text: 'Aceptar',
                    onPress: () =>
                    {
                        setNombre('');
                        setEmail('');
                        setPassword('');
                        setRegister(false);
                    },
                    style: 'default'
                }
            ]);

            if (e.response)
            {
                const { data, status } = e.response;

                const { message } = data;

                status === 500 ?
                    Alert.alert('Error al enviar la solicitud', 'Se produjo un error inesperado. Vuelve a intentarlo.',
                    [
                        {
                            text: 'Aceptar',
                            onPress: () =>
                            {
                                setNombre('');
                                setEmail('');
                                setPassword('');
                                setRegister(false);
                            },
                            style: 'default'
                        }
                    ]) :
                    Alert.alert('Mensaje', message,
                    [
                        {
                            text: 'Aceptar',
                            onPress: () => setRegister(false),
                            style: 'default'
                        }
                    ]);
            }
        }
    }

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
                        {'Register Your Account'}
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
                        <Ionicons name="person" size={32} color="gray" style={{ marginLeft: 10 }} />

                        <TextInput
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Enter Your Name"
                            style={
                            {
                                color: 'gray',
                                marginVertical: 10,
                                width: 300,
                                fontSize: nombre ? 17.5 : 17.5
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
                                fontSize: email ? 17.5 : 17.5
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
                    onPress={() => !register && handleRegister()}
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
                        {'Register'}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
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
                        {'Already have an account? Sign In'}
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen;
