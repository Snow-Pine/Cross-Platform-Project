import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useMemo } from 'react';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import Home from './screens/Home';
import Books from './screens/Books';
import Review from './screens/Review';
import Cart from './screens/Cart';

const Stack = createNativeStackNavigator();

export default function App() {
  const prices = useMemo(() => Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => parseFloat(Math.random() * 60 + 10).toFixed(2))), []);
  const [allBooks, setAllBooks] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignIn' 
        screenOptions={{ 
          headerStyle: { backgroundColor: 'brown' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
        <Stack.Screen component={Home} name="Home" initialParams={{ setBooks: setAllBooks }} />
        <Stack.Screen component={Books} name="Books" initialParams={{ prices, allBooks, cart, setCart }} />
        <Stack.Screen component={Review} name="Review" />
        <Stack.Screen component={Cart} name="Cart" initialParams={{ cart, setCart }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}