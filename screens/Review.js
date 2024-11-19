import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

const Review = () => {
  const [title, setTitle] = useState('Becoming');
  const [inputTitle, setInputTitle] = useState('Becoming');
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleButtonClick = () => {
    setTitle(inputTitle);
  };

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?title=${title}&api-key=uak3NkFGVEYRiY8vMZe3QI09uAQBYefi`);
      const result = await response.json();
      if (result) {
        setReview(result.results);
        setLoading(false);
      } else {
        console.log("No data received in response");
        setLoading(false);
      }
    } catch (error) {
      console.error(`Error while fetching data from API: ${error}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, [title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <Text style={styles.subtitle}>Enter the book name:</Text>
      <TextInput
        style={styles.input}
        value={inputTitle}
        onChangeText={setInputTitle}
      />
      <Button title="Search Review" onPress={handleButtonClick} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={review}
          keyExtractor={(item) => item.book_title}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Title: {item.book_title}</Text>
              <Text style={styles.reviewAuthor}>Author: {item.book_author}</Text>
              <Text style={styles.reviewDate}>Publication Date: {item.publication_dt}</Text>
              <Text style={styles.reviewSummary}>Review: {item.summary}</Text>
              <Text style={styles.reviewByline}>Reviewer: {item.byline}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  reviewCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewAuthor: {
    fontSize: 14,
  },
  reviewDate: {
    fontSize: 14,
  },
  reviewSummary: {
    fontSize: 14,
  },
  reviewByline: {
    fontSize: 14,
  },
});

export default Review;