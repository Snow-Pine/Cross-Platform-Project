import { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Button, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({ route, navigation }) => {
  const { setBooks, setCart, setName, setNumberOfPeople, userEmail } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSection, setShowSection] = useState(false);
  const slideAnim = useRef(new Animated.Value(-200)).current; 

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

  const toggleMenu = () => {
    setShowSection(!showSection);
    Animated.timing(slideAnim, {
      toValue: showSection ? -200 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Brain Feed!</Text>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {showSection && (
        <Animated.View style={[styles.section, { transform: [{ translateX: slideAnim }] }]}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { user: { email: userEmail }, purchases: route.params.cart })}>
            <Text style={styles.profileText}><Icon name="user" size={24} color="brown" /> Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Books')}>
            <Text style={styles.booksText}><Icon name="book" size={24} color="brown" /> Books</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Review')}>
            <Text style={styles.reviewText}><Icon name="comments" size={24} color="brown" /> Review</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartText}><Icon name="shopping-cart" size={24} color="brown" /> Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {/* <Text style={styles.intro}>
      Brain Feed is a bookstore that offers a diverse selection of books to nourish the intellect and inspire the imagination.
      From thought-provoking non-fiction to captivating fiction, we provide the perfect resources to expand your mind and ignite your curiosity. Feed your brain and discover the power of knowledge at Brain Feed.
      </Text> */}
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
          data={data.results?.lists?.[0]?.books || []}
          keyExtractor={(item, index) => `${item.title}-${index}`}
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
    backgroundColor: 'blanchedalmond', //blcanchedalmond
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 100,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 70,
    marginTop: 130
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
  sectionToggle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'brown',
    borderRadius: 900,
  },
  section: {
    marginVertical: 10,
    position: 'absolute',
    right: 0,
    top: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  profileText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'brown',
    borderRadius: 900
  },
  booksText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'brown',
    borderRadius: 900
  },
  reviewText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'brown',
    borderRadius: 900
  },
  cartText: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'brown',
    borderRadius: 900
  },
});

export default Home;