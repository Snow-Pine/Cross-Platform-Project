import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ route, navigation }) => {
  const { setBooks } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLaunchFromAPI = async () => {
    try {
      const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=uak3NkFGVEYRiY8vMZe3QI09uAQBYefi');
      const result = await response.json();
      if (result) {
        setData(result);
        setBooks(result);
        setLoading(false);
      } else {
        console.log("No data received in response");
        setLoading(false);
      }
    } catch (error) {
      console.log(`Error while fetching data from API: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunchFromAPI();
  }, []);

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>Welcome to Brain Feed!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Books')}>
        <Text style={styles.buttonText}>Books</Text>
        <Icon name="book" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Review')}>
        <Text style={styles.buttonText}>Review</Text>
        <Icon name="comments" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.buttonText}>Cart</Text>
        <Icon name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.intro}>
        Where knowledge meets nourishment. At Brain Feed, we're not just a bookstore; we're the source of sustenance for your intellect. With a diverse selection of books spanning various genres, from insightful non-fiction to captivating fiction. We offer the perfect ingredients to fill your empty mind and enrich your brain. Our mission is to provide the nutrients your intellect craves, helping you grow and flourish through the power of books. Come, feed your brain and discover a world of boundless possibilities at Brain Feed.
      </Text>
      <Text style={styles.subtitle}>New Releases</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={data.results.lists[0].books}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.bookCard}>
              <Image source={{ uri: item.book_image }} style={styles.bookImage} />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>Author: {item.author}</Text>
              </View>
            </View>
          )}
        />
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
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default Home;