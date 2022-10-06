
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ResetPassword from './screens/ResetPassword';
import ToDo from './screens/ToDo';
// import ManageAccount from './screens/ManageAccount';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }} />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }} />
        {/* <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

