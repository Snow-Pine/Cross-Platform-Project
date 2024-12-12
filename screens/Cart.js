import { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, addItem, removeItem } from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../config/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

const Cart = ({ route, navigation }) => {
  const { userEmail } = route.params;
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showTotalPrice, setShowTotalPrice] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(updateCart(cart));
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  const handleAdd = (index) => {
    const item = cart[index];
    dispatch(addItem(item));
  };

  const handleMinus = (index) => {
    const item = cart[index];
    dispatch(removeItem(item));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
        totalPrice += price * quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const handleCheckout = async () => {
    const validCartItems = cart.filter(item => item.title && item.price && item.quantity > 0);
    if (validCartItems.length === 0) {
      Alert.alert('Cart is empty', 'Please add items to your cart before checking out.');
      return;
    }
    setShowTotalPrice(true);
    try {
      const purchasesCollection = collection(db, 'purchases');
      const purchaseData = validCartItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        addedBy: userEmail,
        addedDate: new Date().toISOString()
      }));
      console.log('Purchase Data:', purchaseData); // Add this line for debugging
      await Promise.all(purchaseData.map(data => addDoc(purchasesCollection, data)));
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
          <Text style={styles.checkoutTitle}>Total Price: ${totalPrice}</Text>
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