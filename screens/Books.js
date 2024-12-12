import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const Books = ({ route }) => {
  const { prices, allBooks, cart, setCart } = route.params;
  const [bookPrices, setBookPrices] = useState(prices.map(price => parseFloat(price).toFixed(2)));
  const [localCart, setLocalCart] = useState(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (prices.length === 0) {
      const generatedPrices = allBooks.results.lists.flatMap(list => list.books).map(() => parseFloat(Math.random() * 60 + 10).toFixed(2));
      setBookPrices(generatedPrices);
    }
  }, [allBooks, prices]);

  const handleAddToCart = (book, price) => {
    const updatedCart = [...localCart, { title: book.title, price: price, quantity: 1 }];
    setLocalCart(updatedCart);
    setCart(updatedCart);
    dispatch(addItem({ ...book, price }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books</Text>
      <FlatList
        data={allBooks.results.lists.flatMap(list => list.books)}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.bookCard}>
            <Image source={{ uri: item.book_image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              <Text style={styles.bookPrice}>Price: ${bookPrices[index]}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item, bookPrices[index])}
                disabled={localCart.some(cartItem => cartItem.title === item.title)}
              >
                <Text style={styles.addToCartButtonText}>
                  <Icon name="cart-plus" size={24} color="white" />
                  {localCart.some(cartItem => cartItem.title === item.title) ? "Added" : "Add to Cart"}
                </Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor : 'blanchedalmond',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  bookImage: {
    height: 120,
    width: 80,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
  },
  bookPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'brown',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    marginRight: 5,
  },
});

export default Books;