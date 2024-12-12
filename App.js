import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo } from 'react';
import { Pressable, Text } from 'react-native';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Home from './screens/Home';
import Books from './screens/Books';
import Review from './screens/Review';
import Cart from './screens/Cart';
import ProfileScreen from './screens/ProfileScreen';
import { Provider } from 'react-redux';
import store from './redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const prices = useMemo(() => Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => parseFloat(Math.random() * 60 + 10).toFixed(2))), []);
  const [allBooks, setAllBooks] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='SignIn' 
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: 'brown' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            
            headerRight: () => (
              <Pressable onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              })}>
                <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
              </Pressable>
            )
          })}
        >
          <Stack.Screen component={SignInScreen} name="SignIn" />
          <Stack.Screen component={SignUpScreen} name="SignUp" />
          <Stack.Screen component={Home} name="Home" initialParams={{ setBooks: setAllBooks }} />
          <Stack.Screen component={Books} name="Books" initialParams={{ prices, allBooks, cart, setCart }} />
          <Stack.Screen component={Review} name="Review" />
          <Stack.Screen component={Cart} name="Cart" initialParams={{ cart, setCart }} />
          <Stack.Screen component={ProfileScreen} name="Profile" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}