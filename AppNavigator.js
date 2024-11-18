import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import SummaryScreen from './screens/SummaryScreen';

// Create a stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Task List' }}
        />
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen}        
          options={{ title: 'Add New Task' }}
        />
        <Stack.Screen 
          name="EditTask" 
          component={EditTaskScreen} 
          options={{ title: 'Edit Task' }}
        />
        <Stack.Screen 
          name="Summary" 
          component={SummaryScreen} 
          options={{ title: 'Task Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
