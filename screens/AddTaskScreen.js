import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
//useDispatch() hook allows to send/dispatch any redux action
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';

const AddTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    //create object of task using user input
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    //save the task to the redux store
    dispatch(addTask(newTask));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button title="Add Task" onPress={handleAddTask} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default AddTaskScreen;
