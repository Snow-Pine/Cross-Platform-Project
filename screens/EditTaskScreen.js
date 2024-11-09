import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../redux/actions';

const EditTaskScreen = ({ route, navigation }) => {
  const { taskId } = route.params;

  //get the exsitng values of task using id and useSelector() hook
  const task = useSelector((state) => state.tasks.listOfTasks.find((task) => task.id === taskId));
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState(task.name);

  const handleEditTask = () => {
    const updatedTask = { ...task, name: taskName };
    console.log(`updatedTask : ${JSON.stringify(updatedTask)}`);

    //update the redux state with updated object
    dispatch(editTask(taskId, updatedTask));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={taskName}
        onChangeText={setTaskName}
      />
      <Button title="Update Task" onPress={handleEditTask} color="#2196F3" />
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

export default EditTaskScreen;
