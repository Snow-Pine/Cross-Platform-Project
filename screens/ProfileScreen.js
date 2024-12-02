import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { user = {}, purchases = [] } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Overview</Text>
      <Text style={styles.userInfo}>Email: {user.email || 'N/A'}</Text>
      <Text style={styles.subtitle}>Purchases:</Text>
      <FlatList
        data={purchases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.purchaseCard}>
            <Text style={styles.purchaseTitle}>Title: {item.title}</Text>
            <Text style={styles.purchasePrice}>Price: ${item.price}</Text>
            <Text style={styles.purchaseQuantity}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'blanchedalmond',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userInfo: {
    fontSize: 18,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 100
  },
  purchaseCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  purchaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchasePrice: {
    fontSize: 14,
  },
  purchaseQuantity: {
    fontSize: 14,
  },
});

export default ProfileScreen;