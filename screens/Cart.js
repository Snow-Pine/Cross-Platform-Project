import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../config/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

const Cart = ({ route, navigation }) => {
  const { userEmail, cart: initialCart, setCart: updateCart} = route.params;
  const [cart, setCart] = useState(initialCart);
  const [showTotalPrice, setShowTotalPrice] = useState(false);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.log('Error saving cart:', error);
      }
    };
    saveCart();
    updateCart(cart);
  }, [cart]);

  const handleAdd = (index) => {
    const updatedCart = cart.map((item, idx) => {
      if (index === idx) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleMinus = (index) => {
    const updatedCart = cart.map((item, idx) => {
      if (index === idx && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        totalPrice += price * quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || cart.every(item => item.quantity === 0)) {
      Alert.alert('Cart is empty', 'Please add items to your cart before checking out.');
      return;
    }
    setShowTotalPrice(true);
    try {
      const purchasesCollection = collection(db, 'purchases');
      const purchaseData = cart.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        addedBy: userEmail,
        addedDate: new Date().toISOString()
      }));
      await Promise.all(purchaseData.map(data => addDoc(purchasesCollection, data)));
      await AsyncStorage.setItem('purchases', JSON.stringify(cart));
    } catch (error) {
      console.log('Error saving purchases:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          item.quantity > 0 && (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.title} - ${item.price} - Quantity: </Text>
              <Button title="-" onPress={() => handleMinus(index)} />
              <Text style={styles.cartItemText}>{item.quantity}</Text>
              <Button title="+" onPress={() => handleAdd(index)} />
            </View>
          )
        )}
      />
      {!showTotalPrice && (
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Icon name="arrow-right" size={24} color="white" />
          <Text style={styles.checkoutButtonText}>Check out</Text>
        </TouchableOpacity>
      )}
      {showTotalPrice && (
        <View>
          <Text style={styles.checkoutTitle}>Thank you for shopping with us!🌟</Text>
          <Text style={styles.checkoutTitle}>Total Price: ${calculateTotalPrice()}</Text>
        </View>
      )}
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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  cartItemText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  checkoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Cart;