import React from 'react';
import AppNavigator from './AppNavigator';
// Provider allows access to redux store
import { Provider } from 'react-redux';
import { store } from './redux/store';

// npm install @react-navigation/native @react-navigation/stack
// npm install react-native-screens react-native-safe-area-context

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
