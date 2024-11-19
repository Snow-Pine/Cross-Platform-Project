import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button } from 'react-native';

const Books = ({ route }) => {
  const { prices, allBooks, cart, setCart } = route.params;
  const [bookPrices, setBookPrices] = useState([]);

  useEffect(() => {
    const generatedPrices = allBooks.results.lists.flatMap(list => list.books).map(() => parseFloat(Math.random() * 60 + 10).toFixed(2));
    setBookPrices(generatedPrices);
  }, [allBooks]);

  const addToCart = (book, price) => {
    setCart([...cart, { title: book.title, price: price, quantity: 1 }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books</Text>
      <FlatList
        data={allBooks.results.lists.flatMap(list => list.books)}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <View style={styles.bookCard}>
            <Image source={{ uri: item.book_image }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              <Text style={styles.bookPrice}>Price: ${bookPrices[index]}</Text>
              <Button
                title={cart.some(cartItem => cartItem.title === item.title) ? "Added" : "Add to Cart"}
                onPress={() => addToCart(item, bookPrices[index])}
                disabled={cart.some(cartItem => cartItem.title === item.title)}
              />
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
});

export default Books;