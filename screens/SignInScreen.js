import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { auth } from '../config/firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInClicked = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, emailAddress, password);
      if (userCredentials) {
        Alert.alert(`Login Successful for ${emailAddress}`);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }
    } catch (err) {
      console.log(`Error while signing in user: ${err}`);
    }
  };

  const onSignUpClicked = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
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
      <TouchableOpacity style={styles.buttonStyle} onPress={onSignInClicked}>
        <Icon name="sign-in" size={20} color="#fff" />
        <Text style={styles.buttonTextStyle}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={onSignUpClicked}>
        <Icon name="user-plus" size={20} color="#fff" />
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={[styles.iconButton, styles.googleButton]} onPress={() => {/* Handle Google sign-in */}}>
          <Icon name="google" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.twitterButton]} onPress={() => {/* Handle Twitter sign-in */}}>
          <Icon name="twitter" size={30} color="skyblue" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.appleButton]} onPress={() => {/* Handle Apple sign-in */}}>
          <Icon name="apple" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.facebookButton]} onPress={() => {/* Handle Facebook sign-in */}}>
          <Icon name="facebook" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blanchedalmond',
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
    marginTop: 10, // Adjusted marginTop value
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
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown',
    padding: 10,
    margin: 10,
    borderRadius: 100,
  },
  signUpButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  }, 
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },
  emailText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 1,
    marginLeft: 10,
    marginBottom: 5,
  },
  orText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
  },
  googleButton: {
    borderColor: 'red',
    backgroundColor: '#ffcccc', 
  },
  twitterButton: {
    borderColor: 'skyblue',
    backgroundColor: '#ccf2ff', 
  },
  appleButton: {
    borderColor: 'black',
    backgroundColor: '#e6e6e6', 
  },
  facebookButton: {
    borderColor: 'blue',
    backgroundColor: '#cce0ff',
  },
});

export default SignInScreen;