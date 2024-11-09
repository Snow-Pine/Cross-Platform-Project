import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
//useSelector hook allows the access to the redux store state
import { useSelector, useDispatch } from 'react-redux';
import { toggleTaskCompletion } from '../redux/actions';

const HomeScreen = ({ navigation }) => {

  //access the listOfTasks from the redux store state
  const taskList = useSelector((state) => state.tasks.listOfTasks);
  //get the instance of dispatch
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      
      {
      (taskList && (taskList.length > 0)) ? (
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={item.completed ? styles.taskCompleted : styles.taskText}>
                {item.name}
              </Text>
              <View style={styles.buttonContainer}>
                <Button
                  title={item.completed ? 'Undo' : 'Complete'}
                  onPress={() => {
                  //dispatch the toggle action for current task
                  dispatch(toggleTaskCompletion(item.id))
                  }}
                />
                <Button
                  title="Edit"
                  onPress={() => {navigation.navigate('EditTask', { taskId: item.id })}}
                />
              </View>
            </View>
          )}
        />
        ) : (
          <Text>No tasks in the list yet</Text>
        )
      }
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.summaryButton} onPress={() => navigation.navigate('Summary')}>
        <Text style={styles.summaryButtonText}>Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
  },
  taskCompleted: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  summaryButton: {
    marginTop: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

