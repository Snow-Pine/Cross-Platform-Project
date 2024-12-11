import { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TouchableOpacity, Animated } from "react-native";
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { auth } from '../config/firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const bounceAnim = useRef(new Animated.Value(0)).current; // Initial value for bounce

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, bounceAnim]);

  const onSignUpClicked = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, emailAddress, password);
      if (userCredentials) {
        Alert.alert(`Sign Up Successful for ${emailAddress}`);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (err) {
      console.log(`Error while signing up user: ${err}`);
    }
  };

  const bounceInterpolate = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 75], // Adjust the bounce height as needed
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Image 
        source={require('../assets/logo.png')}
        style={[styles.logo, { transform: [{ translateY: bounceInterpolate }] }]}
      />
      <Text style={styles.welcomeText}>Create an Account!</Text>
      <Text style={styles.labelText}>Email</Text>
      <TextInput 
        style={styles.inputEmailStyle}
        placeholder="Enter Email Address"
        textContentType="emailAddress"
        autoCapitalize="none"
        returnKeyType="next"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <Text style={styles.labelText}>Password</Text>
      <TextInput 
        style={styles.inputPassStyle}
        placeholder="Enter Password"
        textContentType="password"
        autoCapitalize="none"
        returnKeyType="done"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={onSignUpClicked}>
        <Icon name="user-plus" size={20} color="#fff" />
        <Text style={styles.buttonTextStyle}>Sign Up</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blanchedalmond',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
  },
  inputPassStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    borderColor: 'brown',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 23
  },
  inputEmailStyle: {
    height: 50,
    margin: 10,
    padding: 5,
    borderColor: 'brown',
    borderWidth: 2,
    fontSize: 20,
    marginTop: 10, 
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown',
    padding: 10,
    margin: 10,
    borderRadius: 100,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 1,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default SignUpScreen;