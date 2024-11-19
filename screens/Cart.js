import { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const Cart = ({ route }) => {
  const { cart, setCart } = route.params;
  const [showTotalPrice, setShowTotalPrice] = useState(false);

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

  const handleCheckout = () => {
    setShowTotalPrice(true);
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
        <Button title="Check out" onPress={handleCheckout} />
      )}
      {showTotalPrice && (
        <View>
          <Text style={styles.checkoutTitle}>Checkout</Text>
          <Text>Thank you for shopping with us!</Text>
          <Text>Total Price: ${calculateTotalPrice()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default Cart;