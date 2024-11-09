import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const SummaryScreen = () => {
  const taskList = useSelector((state) => state.tasks.listOfTasks);
  const totalTasks = taskList ? taskList.length : 0;
  const completedTasks = taskList ? taskList.filter((task) => task.completed).length : 0;
  const completionPercentage = totalTasks ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Summary</Text>
      <Text style={styles.summaryText}>Total Tasks: {totalTasks}</Text>
      <Text style={styles.summaryText}>Completed Tasks: {completedTasks}</Text>
      <Text style={styles.summaryText}>Completion Percentage: {completionPercentage}%</Text>
    </View>
  );
};

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
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
});

export default SummaryScreen;
