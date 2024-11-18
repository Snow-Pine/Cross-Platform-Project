import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import StudentListScreen from "./screens/StudentListScreen";
import StudentDetailScreen from "./screens/StudentDetailScreen";

// npm i @react-navigation/native @react-navigation/native-stack 
// npm i react-native-screens react-native-safe-area-context
// npm i firebase

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignIn' 
        screenOptions={ 
          { headerStyle: 
            {backgroundColor: 'aquamarine'},
            headerTintColor: '#000',
            headerTitleStyle: {fontWeight: 'bold'}
          }}
      >
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
        <Stack.Screen component={StudentListScreen} name="Student List" />
        <Stack.Screen component={AddStudentScreen} name="Add Student"  />
        <Stack.Screen component={StudentDetailScreen} name="Details"  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
