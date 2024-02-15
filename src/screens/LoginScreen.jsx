import { useState } from 'react';

import
{
    SafeAreaView,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Pressable
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const LoginScreen = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

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
                    style={{ width: 150, height: 150 }}
                    source={{ uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png' }}
                />
            </View>
            
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={
                        {
                            fontSize: 15,
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
                                fontSize: email ? 15 : 15
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
                                fontSize: email ? 15 : 15
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
                >
                    <Text>{'Keep me logged in'}</Text>

                    <Text style={{ color: '#007FFF', fontWeight: 'bold' }}>{'Forgot password?'}</Text>
                </View>

                <View style={{ marginTop: 75 }} />

                <Pressable
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
                            fontSize: 15,
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
