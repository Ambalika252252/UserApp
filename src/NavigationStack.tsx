import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import HomeScreen from './Screens/HomeScreen';
import UserListScreen from './Screens/UserListScreen';

const Stack = createStackNavigator();

const NavigationStack: React.FC = () => {
    return (
            <Stack.Navigator initialRouteName="SignIn"
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#4266B3' },
                    headerTitleAlign: 'center',
                }}>
                <Stack.Screen name="SignIn" component={SignIn} options={{
                    title: 'User Application',
                }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{
                    title: 'Sign Up',
                }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                    title: 'Home Page',
                }} />
                <Stack.Screen name="UserListScreen" component={UserListScreen} options={{
                    title: 'Users List ',
                }} />
            </Stack.Navigator>
   );
}

export default NavigationStack;
