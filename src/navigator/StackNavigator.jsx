import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// import axios from 'axios';

const Stack = createNativeStackNavigator();

const StackNavigator = () =>
{
    // axios.defaults.headers.common['API-Key'] = process.env.EXPO_PUBLIC_API_KEY;
    // axios.defaults.headers.common['API-Secret'] = process.env.EXPO_PUBLIC_API_SECRET;

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;
